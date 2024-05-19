'use client'

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Author from '../../../shared/components/author';
import Title from '../../../shared/components/title';
import Board from '../../shared/board/board';
import Link from 'next/link';
import axios from 'axios';
import * as consts from '../../config';
import { makeServer } from '@/app/mocks/server';


export default function Puzzle() {
  makeServer();
  const editorMode = false;
  const [puzzle, setPuzzle] = useState<any | null>(null);
  const [boardContents, setBoardContents] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const puzzleId = searchParams.get('puzzleId');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await axios.get(`${consts.GET_PUZZLE}/${puzzleId}`); // Replace '1' with the actual puzzleId
        setPuzzle(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching puzzle:', error);
      }
    };

    fetchPuzzle();
  }, []);

  useEffect(() => {
    console.log("PUZZLE: " + JSON.stringify(puzzle))
  }, [puzzle])

  useEffect(() => {
    console.log("BOARD CONTENTS: " + JSON.stringify(boardContents))
  }, [boardContents])

  const handleSubmit = async () => {
    console.log("SUBMITTING...");
    try {
      const response = await axios.post(`${consts.VALIDATE_PUZZLE}/${puzzleId}`, { solution: boardContents });
      if (response.data.isCorrect) {
        setPopupMessage('Congrats! You solved the puzzle!');
      } else {
        setPopupMessage('Oof, incorrect. Try again.');
      }
      setShowPopup(true);
    } catch (error) {
      console.error('Error submitting puzzle:', error);
    }
  };

  if (!puzzle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/">
        <button style={{
          fontFamily: 'Kadwa',
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: 20,
          marginBottom: 10,
          marginLeft: 30,
          marginTop: 10
        }}>HOME</button>
      </Link>
      <div style={{
        alignItems: 'center',
        display:'flex',
        justifyContent: 'center',
      }}>
        <div>
          <Title editorMode={editorMode} value={puzzle.title} />
          <Author editorMode={editorMode} value={puzzle.createdBy} />
          <div style={{marginBottom: 30}}></div>
          <Board
            boardWidth={puzzle?.boardWidth}
            boardHeight={puzzle?.boardHeight}
            editorMode={editorMode}
            initialStructure={puzzle?.initialStructure}
            initialHints={puzzle?.hints}
            onBoardContentChange={setBoardContents}
          />
          <button onClick={handleSubmit}>Submit</button>
    {showPopup && (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '2rem',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}
      >
        <h2>{popupMessage}</h2>
        <button
          onClick={() => setShowPopup(false)}
          style={{
            marginTop: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          OK
        </button>
      </div>
    )}
        </div>
      </div>
    </div>
  );
}