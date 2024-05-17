'use client'

import React, { useState, useRef, useEffect } from 'react';
import Author from '../../../shared/components/author';
import Title from '../../../shared/components/title';
import Board from '../../shared/board/board';
import Link from 'next/link';
import axios from 'axios';
import * as consts from '../../config';
import { makeServer } from '../../mocks/server';

interface Puzzle {
  title: string;
  createdBy: string;
  boardHeight: number;
  boardWidth: number;
  structure: any[];
}

export default function Puzzle() {
  makeServer();
  const editorMode = false;
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await axios.get(`${consts.GET_PUZZLE}/1`); // Replace '1' with the actual puzzleId
        setPuzzle(response.data);
        console.log(response.data);
        console.log("PUZZLE: " + puzzle)
      } catch (error) {
        console.error('Error fetching puzzle:', error);
      }
    };

    fetchPuzzle();
  }, []);

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
            boardWidth={puzzle.boardWidth}
            boardHeight={puzzle.boardHeight}
            editorMode={editorMode}
            initialStructure={puzzle.structure}
          />
        </div>
      </div>
    </div>
  );
}