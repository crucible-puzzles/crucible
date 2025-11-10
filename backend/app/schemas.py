from pydantic import BaseModel, EmailStr, Field, validator
from typing import List, Optional
from datetime import datetime

# User schemas
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Puzzle schemas
class HintCreate(BaseModel):
    clue_number: int = Field(..., gt=0)
    direction: str = Field(..., pattern='^[ad]$')
    hint_text: str = Field(..., max_length=255)

class HintResponse(BaseModel):
    number: str
    direction: str
    hint: str

class PuzzleCreate(BaseModel):
    title: str = Field(..., max_length=150)
    board_width: int = Field(..., ge=3, le=25)
    board_height: int = Field(..., ge=3, le=25)
    solution: str
    hints: List[HintCreate]
    
    @validator('solution')
    def validate_solution(cls, v, values):
        if 'board_width' in values and 'board_height' in values:
            expected_length = values['board_width'] * values['board_height']
            if len(v) != expected_length:
                raise ValueError(f'Solution length must be {expected_length}')
        return v

class PuzzleUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=150)
    solution: Optional[str] = None
    hints: Optional[List[HintCreate]] = None
    is_public: Optional[bool] = None

class PuzzleResponse(BaseModel):
    id: int
    title: str
    createdOn: datetime
    createdBy: str
    boardWidth: int
    boardHeight: int
    structure: List[int]
    solution: Optional[str] = None
    hints: List[HintResponse]
    shareToken: Optional[str] = None

class PuzzleListItem(BaseModel):
    id: int
    title: str
    createdOn: datetime
    createdBy: str
    boardWidth: int
    boardHeight: int
    shareToken: str
    isPublic: bool

# Validation schemas
class PuzzleValidation(BaseModel):
    solution: str

class ValidationResponse(BaseModel):
    isCorrect: bool
    invalidIndices: Optional[List[int]] = None

# Password reset schemas
class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordReset(BaseModel):
    token: str
    new_password: str = Field(..., min_length=6)

# Auth response
class AuthResponse(BaseModel):
    user: UserResponse
    token: str