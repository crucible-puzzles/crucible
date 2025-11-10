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
        <div style={{ marginTop: '40px' }}>
          <h1 style={{ fontSize: '14pt', marginBottom: '5px' }}>{puzzle.title}</h1>
          <p style={{ fontSize: '9pt', color: '#828282', marginBottom: '20px' }}>
            by {puzzle.createdBy}
          </p>

          <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
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

            <div className="hints-container" style={{ flex: 1 }}>
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

          <div style={{ marginTop: '20px' }}>
            <button onClick={handleSubmit}>Check Solution</button>
          </div>

          {showPopup && (
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                padding: '20px',
                border: '2px solid #828282',
                zIndex: 1000,
              }}
            >
              <p style={{ marginBottom: '15px' }}>{popupMessage}</p>
              <button onClick={() => setShowPopup(false)}>OK</button>
            </div>
          )}

          {showPopup && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999,
              }}
              onClick={() => setShowPopup(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}