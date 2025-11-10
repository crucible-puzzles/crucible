from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.sql import text
from typing import List, Optional
import logging

from .database import get_db, engine, Base
from .config import settings
from .models import User, Puzzle, Hint
from .schemas import (
    UserCreate, UserLogin, UserResponse, AuthResponse,
    PuzzleCreate, PuzzleUpdate, PuzzleResponse, PuzzleListItem,
    PuzzleValidation, ValidationResponse, HintResponse,
    PasswordResetRequest, PasswordReset
)
from . import auth

# Configure logging
logging.basicConfig(
    filename='crucible.log',
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Crucible API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# AUTHENTICATION ENDPOINTS
# ============================================================================

@app.post("/api/v1/auth/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    logger.info(f"Registration attempt for username: {user_data.username}")
    logger.debug(f"Password type: {type(user_data.password)}")
    logger.debug(f"Password repr: {repr(user_data.password)}")
    logger.debug(f"Password length: {len(user_data.password)}")
    
    # Check if username exists
    if auth.get_user_by_username(db, user_data.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Check if email exists
    if auth.get_user_by_email(db, user_data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user = auth.create_user(db, user_data.username, user_data.email, user_data.password)
    token = auth.create_session_token(user)
    
    logger.info(f"User registered successfully: {user.username}")
    return AuthResponse(
        user=UserResponse.from_orm(user),
        token=token
    )

@app.post("/api/v1/auth/login", response_model=AuthResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user"""
    logger.info(f"Login attempt for username: {credentials.username}")
    
    user = auth.authenticate_user(db, credentials.username, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    
    token = auth.create_session_token(user)
    logger.info(f"User logged in successfully: {user.username}")
    
    return AuthResponse(
        user=UserResponse.from_orm(user),
        token=token
    )

@app.post("/api/v1/auth/password-reset-request")
def request_password_reset(request: PasswordResetRequest, db: Session = Depends(get_db)):
    """Request a password reset token"""
    user = auth.get_user_by_email(db, request.email)
    if not user:
        # Don't reveal if email exists
        return {"message": "If the email exists, a reset link will be sent"}
    
    token = auth.create_password_reset_token(db, user.id)
    logger.info(f"Password reset requested for user: {user.username}")
    
    # In production, send email with token
    # For now, just return success
    return {"message": "If the email exists, a reset link will be sent", "token": token}

@app.post("/api/v1/auth/password-reset")
def reset_password(reset_data: PasswordReset, db: Session = Depends(get_db)):
    """Reset password using token"""
    user = auth.verify_reset_token(db, reset_data.token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    auth.reset_password(db, user, reset_data.new_password)
    auth.use_reset_token(db, reset_data.token)
    
    logger.info(f"Password reset successfully for user: {user.username}")
    return {"message": "Password reset successfully"}

# ============================================================================
# PUZZLE ENDPOINTS
# ============================================================================

@app.post("/api/v1/puzzles", response_model=PuzzleResponse, status_code=status.HTTP_201_CREATED)
def create_puzzle(puzzle_data: PuzzleCreate, user_id: int, db: Session = Depends(get_db)):
    """Create a new puzzle (requires authentication)"""
    logger.info(f"Creating puzzle: {puzzle_data.title} for user {user_id}")
    
    # Verify user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    
    # Generate unique share token
    share_token = auth.generate_share_token()
    while db.query(Puzzle).filter(Puzzle.share_token == share_token).first():
        share_token = auth.generate_share_token()
    
    # Create puzzle
    puzzle = Puzzle(
        title=puzzle_data.title,
        author_id=user_id,
        board_width=puzzle_data.board_width,
        board_height=puzzle_data.board_height,
        solution=puzzle_data.solution,
        share_token=share_token
    )
    db.add(puzzle)
    db.flush()
    
    # Create hints
    for hint_data in puzzle_data.hints:
        hint = Hint(
            puzzle_id=puzzle.id,
            clue_number=hint_data.clue_number,
            direction=hint_data.direction,
            hint_text=hint_data.hint_text
        )
        db.add(hint)
    
    db.commit()
    db.refresh(puzzle)
    
    logger.info(f"Puzzle created successfully: {puzzle.id}")
    return format_puzzle_response(puzzle, user.username)

@app.get("/api/v1/puzzles/{puzzle_id}", response_model=PuzzleResponse)
def get_puzzle(puzzle_id: int, db: Session = Depends(get_db)):
    """Get puzzle by ID"""
    logger.info(f"Fetching puzzle: {puzzle_id}")
    
    puzzle = db.query(Puzzle).filter(Puzzle.id == puzzle_id).first()
    if not puzzle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Puzzle not found")
    
    return format_puzzle_response(puzzle, puzzle.author.username)

@app.get("/api/v1/puzzles/share/{share_token}", response_model=PuzzleResponse)
def get_puzzle_by_token(share_token: str, db: Session = Depends(get_db)):
    """Get puzzle by share token"""
    logger.info(f"Fetching puzzle by share token: {share_token}")
    
    puzzle = db.query(Puzzle).filter(Puzzle.share_token == share_token).first()
    if not puzzle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Puzzle not found")
    
    return format_puzzle_response(puzzle, puzzle.author.username)

@app.get("/api/v1/users/{user_id}/puzzles", response_model=List[PuzzleListItem])
def get_user_puzzles(user_id: int, db: Session = Depends(get_db)):
    """Get all puzzles created by a user"""
    logger.info(f"Fetching puzzles for user: {user_id}")
    
    puzzles = db.query(Puzzle).filter(Puzzle.author_id == user_id).all()
    
    return [
        PuzzleListItem(
            id=p.id,
            title=p.title,
            createdOn=p.created_at,
            createdBy=p.author.username,
            boardWidth=p.board_width,
            boardHeight=p.board_height,
            shareToken=p.share_token,
            isPublic=p.is_public
        )
        for p in puzzles
    ]

@app.get("/api/v1/puzzles/public/all", response_model=List[PuzzleListItem])
def get_public_puzzles(search: Optional[str] = None, db: Session = Depends(get_db)):
    """Get all public puzzles with optional search by title or author"""
    logger.info(f"Fetching public puzzles with search: {search}")
    
    query = db.query(Puzzle).filter(Puzzle.is_public == True)
    
    if search:
        search_pattern = f"%{search}%"
        query = query.join(User).filter(
            (Puzzle.title.ilike(search_pattern)) |
            (User.username.ilike(search_pattern))
        )
    
    puzzles = query.order_by(Puzzle.created_at.desc()).all()
    
    return [
        PuzzleListItem(
            id=p.id,
            title=p.title,
            createdOn=p.created_at,
            createdBy=p.author.username,
            boardWidth=p.board_width,
            boardHeight=p.board_height,
            shareToken=p.share_token,
            isPublic=p.is_public
        )
        for p in puzzles
    ]

@app.put("/api/v1/puzzles/{puzzle_id}", response_model=PuzzleResponse)
def update_puzzle(puzzle_id: int, puzzle_data: PuzzleUpdate, user_id: int, db: Session = Depends(get_db)):
    """Update a puzzle (only by owner)"""
    logger.info(f"Updating puzzle: {puzzle_id}")
    
    puzzle = db.query(Puzzle).filter(Puzzle.id == puzzle_id).first()
    if not puzzle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Puzzle not found")
    
    if puzzle.author_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    # Update fields
    if puzzle_data.title:
        puzzle.title = puzzle_data.title
    if puzzle_data.solution:
        puzzle.solution = puzzle_data.solution
    
    # Update hints if provided
    if puzzle_data.hints:
        # Delete existing hints
        db.query(Hint).filter(Hint.puzzle_id == puzzle_id).delete()
        
        # Add new hints
        for hint_data in puzzle_data.hints:
            hint = Hint(
                puzzle_id=puzzle.id,
                clue_number=hint_data.clue_number,
                direction=hint_data.direction,
                hint_text=hint_data.hint_text
            )
            db.add(hint)
    
    db.commit()
    db.refresh(puzzle)
    
    logger.info(f"Puzzle updated successfully: {puzzle_id}")
    return format_puzzle_response(puzzle, puzzle.author.username)

@app.patch("/api/v1/puzzles/{puzzle_id}/privacy", status_code=status.HTTP_200_OK)
def toggle_puzzle_privacy(puzzle_id: int, is_public: bool, user_id: int, db: Session = Depends(get_db)):
    """Toggle puzzle privacy (only by owner)"""
    logger.info(f"Toggling privacy for puzzle: {puzzle_id} to {is_public}")
    
    puzzle = db.query(Puzzle).filter(Puzzle.id == puzzle_id).first()
    if not puzzle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Puzzle not found")
    
    if puzzle.author_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    puzzle.is_public = is_public
    db.commit()
    
    logger.info(f"Puzzle privacy updated successfully: {puzzle_id}")
    return {"message": "Privacy updated successfully", "is_public": is_public}

@app.delete("/api/v1/puzzles/{puzzle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_puzzle(puzzle_id: int, user_id: int, db: Session = Depends(get_db)):
    """Delete a puzzle (only by owner)"""
    logger.info(f"Deleting puzzle: {puzzle_id}")
    
    puzzle = db.query(Puzzle).filter(Puzzle.id == puzzle_id).first()
    if not puzzle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Puzzle not found")
    
    if puzzle.author_id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    db.delete(puzzle)
    db.commit()
    
    logger.info(f"Puzzle deleted successfully: {puzzle_id}")

@app.post("/api/v1/puzzles/{puzzle_id}/validate", response_model=ValidationResponse)
def validate_puzzle(puzzle_id: int, validation: PuzzleValidation, db: Session = Depends(get_db)):
    """Validate a puzzle solution"""
    logger.info(f"Validating puzzle: {puzzle_id}")
    
    puzzle = db.query(Puzzle).filter(Puzzle.id == puzzle_id).first()
    if not puzzle:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Puzzle not found")
    
    if len(validation.solution) != len(puzzle.solution):
        return ValidationResponse(isCorrect=False, invalidIndices=[])
    
    if validation.solution == puzzle.solution:
        logger.info(f"Puzzle {puzzle_id} solved correctly")
        return ValidationResponse(isCorrect=True)
    
    # Find incorrect indices
    invalid_indices = [
        i for i, (a, b) in enumerate(zip(validation.solution, puzzle.solution))
        if a != b
    ]
    
    logger.info(f"Puzzle {puzzle_id} validation failed at {len(invalid_indices)} positions")
    return ValidationResponse(isCorrect=False, invalidIndices=invalid_indices)

# ============================================================================
# UTILITY ENDPOINTS
# ============================================================================

@app.get("/")
def read_root():
    return {"message": "Crucible API", "version": "1.0.0"}

@app.get("/health")
def check_health(db: Session = Depends(get_db)):
    """Health check endpoint"""
    try:
        result = db.execute(text("SELECT 1")).fetchone()
        if result is None or result[0] != 1:
            raise HTTPException(status_code=500, detail="Database check failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")
    
    return {"status": "ok", "message": "Application and database are healthy"}

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def format_puzzle_response(puzzle: Puzzle, author_name: str) -> PuzzleResponse:
    """Format puzzle data for response"""
    # Calculate structure (indices of black squares)
    structure = [i for i, char in enumerate(puzzle.solution) if char == '.']
    
    # Format hints
    hints = [
        HintResponse(
            number=str(h.clue_number),
            direction='down' if h.direction == 'd' else 'across',
            hint=h.hint_text
        )
        for h in puzzle.hints
    ]
    
    return PuzzleResponse(
        id=puzzle.id,
        title=puzzle.title,
        createdOn=puzzle.created_at,
        createdBy=author_name,
        boardWidth=puzzle.board_width,
        boardHeight=puzzle.board_height,
        structure=structure,
        solution=puzzle.solution,
        hints=hints,
        shareToken=puzzle.share_token
    )
