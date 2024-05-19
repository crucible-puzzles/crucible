'use client'

import React, { useState, useRef, useEffect } from 'react';
import Author from '../../../shared/components/author';
import Title from '../../../shared/components/title';

import Board from '../../shared/board/board';
import Link from 'next/link';

export default function Editor() {
  const editorMode = true;
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
          }}>CRUCIBLE</button>
        </Link>

          <div style={{
            alignItems: 'center',
            display:'flex', 
            justifyContent: 'center',
          }}>

            <div>
              <Title editorMode={editorMode} value={"Birthday puzzle"}/>
              <Author editorMode={editorMode} value={"Gabe"}/>
              <div style={{marginBottom: 30}}></div>
              <Board boardWidth={5} boardHeight={5} editorMode={editorMode} initialStructure={[]}/>
            </div>
          </div>
      </div>
  );
}
