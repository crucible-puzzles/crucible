import secrets
import hashlib
import logging
import bcrypt
from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy.orm import Session
from .models import User, PasswordResetToken

logger = logging.getLogger(__name__)

def hash_password(password: str) -> str:
    """Hash a password using bcrypt"""
    logger.debug(f"hash_password called with password type: {type(password)}")
    logger.debug(f"hash_password password repr: {repr(password)}")
    logger.debug(f"hash_password password length: {len(password)}")
    
    # Bcrypt has a 72-byte limit. Encode to UTF-8 and truncate if necessary
    password_bytes = password.encode('utf-8')[:72]
    logger.debug(f"password_bytes length: {len(password_bytes)}")
    
    # Generate salt and hash the password
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password_bytes, salt)
    
    # Return as string (decode from bytes)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    # Apply same truncation as hash_password for consistency
    password_bytes = plain_password.encode('utf-8')[:72]
    hashed_bytes = hashed_password.encode('utf-8')
    
    return bcrypt.checkpw(password_bytes, hashed_bytes)

def generate_token(length: int = 32) -> str:
    """Generate a secure random token"""
    return secrets.token_urlsafe(length)

def generate_share_token() -> str:
    """Generate a unique share token for puzzles"""
    return secrets.token_urlsafe(16)

def create_user(db: Session, username: str, email: str, password: str) -> User:
    """Create a new user with hashed password"""
    hashed_password = hash_password(password)
    user = User(
        username=username,
        email=email,
        password_hash=hashed_password
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
    """Authenticate a user by username and password"""
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Get user by email"""
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    """Get user by username"""
    return db.query(User).filter(User.username == username).first()

def create_password_reset_token(db: Session, user_id: int) -> str:
    """Create a password reset token for a user"""
    token = generate_token(32)
    expires_at = datetime.utcnow() + timedelta(hours=24)
    
    reset_token = PasswordResetToken(
        user_id=user_id,
        token=token,
        expires_at=expires_at
    )
    db.add(reset_token)
    db.commit()
    return token

def verify_reset_token(db: Session, token: str) -> Optional[User]:
    """Verify a password reset token and return the associated user"""
    reset_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == token,
        PasswordResetToken.used == False,
        PasswordResetToken.expires_at > datetime.utcnow()
    ).first()
    
    if not reset_token:
        return None
    
    return db.query(User).filter(User.id == reset_token.user_id).first()

def use_reset_token(db: Session, token: str) -> bool:
    """Mark a reset token as used"""
    reset_token = db.query(PasswordResetToken).filter(
        PasswordResetToken.token == token
    ).first()
    
    if reset_token:
        reset_token.used = True
        db.commit()
        return True
    return False

def reset_password(db: Session, user: User, new_password: str):
    """Reset a user's password"""
    user.password_hash = hash_password(new_password)
    db.commit()

def create_session_token(user: User) -> str:
    """Create a simple session token (in production, use JWT)"""
    # For simplicity, we'll use a hash of user id + timestamp + secret
    data = f"{user.id}:{user.username}:{datetime.utcnow().isoformat()}"
    return hashlib.sha256(data.encode()).hexdigest()