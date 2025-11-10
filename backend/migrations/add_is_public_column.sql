-- Migration: Add is_public column to puzzles table
-- This migration adds a boolean column to track whether puzzles are public or private

ALTER TABLE puzzles 
ADD COLUMN is_public BOOLEAN NOT NULL DEFAULT FALSE;

-- Create an index on is_public for faster queries
CREATE INDEX idx_puzzles_is_public ON puzzles(is_public);

-- Optional: Update existing puzzles to be public if desired
-- UPDATE puzzles SET is_public = TRUE WHERE id IN (SELECT id FROM puzzles);