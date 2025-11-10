-- Crucible Database Schema
-- Simple, efficient design for crossword puzzle storage and sharing

-- Users table: minimal account creation
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT username_length CHECK (LENGTH(username) >= 3),
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Puzzles table: stores crossword metadata and solution
CREATE TABLE IF NOT EXISTS puzzles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    board_width INTEGER NOT NULL CHECK (board_width BETWEEN 3 AND 25),
    board_height INTEGER NOT NULL CHECK (board_height BETWEEN 3 AND 25),
    solution TEXT NOT NULL, -- Flattened string representation (e.g., "CAT.DOG" where . = black square)
    share_token VARCHAR(32) UNIQUE NOT NULL, -- Unique token for sharing
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT solution_length CHECK (LENGTH(solution) = board_width * board_height)
);

-- Hints table: stores clues for across and down
CREATE TABLE IF NOT EXISTS hints (
    id SERIAL PRIMARY KEY,
    puzzle_id INTEGER NOT NULL REFERENCES puzzles(id) ON DELETE CASCADE,
    clue_number INTEGER NOT NULL CHECK (clue_number > 0),
    direction CHAR(1) NOT NULL CHECK (direction IN ('a', 'd')), -- 'a' for across, 'd' for down
    hint_text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_hint UNIQUE (puzzle_id, clue_number, direction)
);

-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(64) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_puzzles_author ON puzzles(author_id);
CREATE INDEX IF NOT EXISTS idx_puzzles_share_token ON puzzles(share_token);
CREATE INDEX IF NOT EXISTS idx_hints_puzzle ON hints(puzzle_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_user ON password_reset_tokens(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_puzzles_updated_at BEFORE UPDATE ON puzzles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();