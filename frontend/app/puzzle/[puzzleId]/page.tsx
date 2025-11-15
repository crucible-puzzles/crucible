'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Board from '../../shared/board/board';
import { API_ENDPOINTS } from '../../../lib/api';

export default function Solver() {
  const params = useParams();
  const puzzleId = params.puzzleId as string;
  const [puzzle, setPuzzle] = useState<any>(null);
  const [boardContents, setBoardContents] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const boardRef = React.useRef<any>(null);

  useEffect(() => {
    fetchPuzzle();
  }, [puzzleId]);

  const fetchPuzzle = async () => {
    try {
      // Try to fetch by share token first
      const response = await axios.get(API_ENDPOINTS.puzzleByToken(puzzleId));
      setPuzzle(response.data);
    } catch (err) {
      console.error('Error fetching puzzle:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!puzzle) return;
    
    try {
      // Get the current board contents directly from the board
      const currentBoardContents = boardRef.current?.getBoardContents() || boardContents;
      const solution = currentBoardContents.join('');
      
      console.log('=== PUZZLE VALIDATION ===');
      console.log('Board contents being validated:', currentBoardContents);
      console.log('Solution string:', solution);
      console.log('Solution length:', solution.length);
      console.log('Expected length:', puzzle.boardWidth * puzzle.boardHeight);
      
      const response = await axios.post(
        API_ENDPOINTS.validatePuzzle(puzzle.id),
        { solution }
      );
      
      console.log('Validation response:', response.data);
      
      if (response.data.isCorrect) {
        setPopupMessage('Congrats! You solved the puzzle!');
      } else {
        setPopupMessage('Not quite right. Keep trying!');
      }
      setShowPopup(true);
    } catch (error) {
      console.error('Error validating puzzle:', error);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="header">
          <div className="container">
            <div className="header-content">
              <Link href="/" className="logo">Crucible</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <p style={{ marginTop: '40px' }}>Loading puzzle...</p>
        </div>
      </div>
    );
  }

  if (!puzzle) {
    return (
      <div>
        <div className="header">
          <div className="container">
            <div className="header-content">
              <Link href="/" className="logo">Crucible</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <p style={{ marginTop: '40px' }}>Puzzle not found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="header-content">
            <Link href="/" className="logo">Crucible</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="puzzle-solve-container">
          <h1 className="puzzle-title">{puzzle.title}</h1>
          <p className="puzzle-author">
            by {puzzle.createdBy}
          </p>

          <div className="puzzle-content">
            <div className="board-wrapper">
              <Board
                ref={boardRef}
                boardWidth={puzzle.boardWidth}
                boardHeight={puzzle.boardHeight}
                editorMode={false}
                initialStructure={puzzle.structure}
                initialHints={puzzle.hints}
                onBoardContentChange={setBoardContents}
                externalLetter=""
              />
            </div>

            <div className="hints-container">
              <div className="hint-section">
                <div className="hint-title">Across</div>
                {puzzle.hints
                  .filter((h: any) => h.direction === 'across')
                  .map((hint: any) => (
                    <div key={`across-${hint.number}`} className="hint-item">
                      {hint.number}. {hint.hint}
                    </div>
                  ))}
              </div>

              <div className="hint-section">
                <div className="hint-title">Down</div>
                {puzzle.hints
                  .filter((h: any) => h.direction === 'down')
                  .map((hint: any) => (
                    <div key={`down-${hint.number}`} className="hint-item">
                      {hint.number}. {hint.hint}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="submit-button-container">
            <button onClick={handleSubmit} className="submit-button">Check Solution</button>
          </div>

          {showPopup && (
            <div className="popup-modal">
              <p className="popup-message">{popupMessage}</p>
              <button onClick={() => setShowPopup(false)} className="popup-button">OK</button>
            </div>
          )}

          {showPopup && (
            <div
              className="popup-overlay"
              onClick={() => setShowPopup(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}