from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, Boolean, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    
    # Relationships
    puzzles = relationship("Puzzle", back_populates="author", cascade="all, delete-orphan")
    password_reset_tokens = relationship("PasswordResetToken", back_populates="user", cascade="all, delete-orphan")
    
    __table_args__ = (
        CheckConstraint('LENGTH(username) >= 3', name='username_length'),
    )


class Puzzle(Base):
    __tablename__ = "puzzles"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    author_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    board_width = Column(Integer, nullable=False)
    board_height = Column(Integer, nullable=False)
    solution = Column(Text, nullable=False)
    share_token = Column(String(32), unique=True, nullable=False, index=True)
    is_public = Column(Boolean, default=False, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    author = relationship("User", back_populates="puzzles")
    hints = relationship("Hint", back_populates="puzzle", cascade="all, delete-orphan")
    
    __table_args__ = (
        CheckConstraint('board_width BETWEEN 3 AND 25', name='board_width_range'),
        CheckConstraint('board_height BETWEEN 3 AND 25', name='board_height_range'),
    )


class Hint(Base):
    __tablename__ = "hints"
    
    id = Column(Integer, primary_key=True, index=True)
    puzzle_id = Column(Integer, ForeignKey("puzzles.id", ondelete="CASCADE"), nullable=False)
    clue_number = Column(Integer, nullable=False)
    direction = Column(String(1), nullable=False)
    hint_text = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    
    # Relationships
    puzzle = relationship("Puzzle", back_populates="hints")
    
    __table_args__ = (
        CheckConstraint('clue_number > 0', name='clue_number_positive'),
        CheckConstraint("direction IN ('a', 'd')", name='direction_valid'),
    )


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    token = Column(String(64), unique=True, nullable=False, index=True)
    expires_at = Column(TIMESTAMP, nullable=False)
    used = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="password_reset_tokens")