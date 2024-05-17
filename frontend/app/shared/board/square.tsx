import React, { useState, useEffect, forwardRef } from 'react';

interface SquareProps {
  onKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onClick: () => void;
  onBackspace: () => void;
  onBlur: () => void;
  isFocused: boolean;
  isHighlighted: boolean;
  editorMode: boolean;
  number: number | null;
}

const Square = forwardRef<HTMLDivElement, SquareProps>(
  ({ onKeyPress, onClick, onBackspace, onBlur, isFocused, isHighlighted, editorMode, number }, ref) => {
    const [letter, setLetter] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
      setContent(letter)
    }, [letter]);


    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
      console.log("SQUARE KEY PRESS");
      const key = event.key;
      console.log("KEY PRESSED UH YUH: " + key);
      console.log("CURRENT CONTENT: " + content);
      if (editorMode || (key !== '.' && letter !== '.')) {
        if (key.length === 1 && key.match(/[a-zA-Z\.]/)) {
          setLetter(key.toUpperCase());
        } else if (key === 'Backspace') {
          setLetter('');
          onBackspace(); // Notify Board to move focus backward
        }
        onKeyPress(event);
      }
    };

    const handleClick = () => {
      if (editorMode || content !== '.') {
        console.log("SQUARE CLICKED YAY");
        onClick(); // Call onClick when the square is clicked
      }
    };

    const handleBlur = () => {
      console.log("SQUARE BLURRED!");
      onBlur();
    };

    return (
      <div
        ref={ref}
        data-letter={letter} 
        data-number={number !== undefined && number !== null ? number.toString() : ''}
        tabIndex={0}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
        onClick={handleClick}
        style={{
          width: '50px',
          height: '50px',
          border: '1px solid black',
          position: 'relative',
          fontSize: '24px',
          fontFamily: 'Kadwa', 
          fontWeight: 400, 
          fontStyle: 'normal', 
          userSelect: 'none',
          outline: 'none',
          backgroundColor: isFocused ? 'lightblue' : isHighlighted ? 'lightgrey' : content === '.' ? 'black' : 'white'
        }}
      >
        {number !== null && (
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: '2px',
              fontSize: '12px',
              lineHeight: '12px',
              fontFamily: 'Kadwa',
              fontWeight: 400
            }}
          >
            {number}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            fontFamily: 'Kadwa',
            fontWeight: 400
          }}
        >
          {content}
        </div>
      </div>
    );
  }
);

export default Square;