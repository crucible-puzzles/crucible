import React, { useState, useEffect, forwardRef } from 'react';

interface SquareProps {
  onKeyPress: (key: String) => void;
  onClick: () => void;
  onBackspace: () => void;
  onBlur: () => void;
  isFocused: boolean;
  isHighlighted: boolean;
  editorMode: boolean;
  number: number | null;
  initialContents: string;
}

const Square = forwardRef<HTMLDivElement, SquareProps>(
  ({ onKeyPress, onClick, onBackspace, onBlur, isFocused, isHighlighted, editorMode, number, initialContents }, ref) => {
    const [letter, setLetter] = useState(initialContents);
    const [content, setContent] = useState(initialContents);

    useEffect(() => {
      setContent(letter)
    }, [letter]);


    const handlePCKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const key = event.key;
      handleKeyPress(key)
    };

    const handleKeyPress = (key: String) => {
      console.log("CONTENTS FOR SQUARE" + initialContents)
      if (editorMode || (key !== '.' && letter !== '.')) {
        if (key.length === 1 && key.match(/[a-zA-Z\.]/)) {
          setLetter(key.toUpperCase());
        } else if (key === 'Backspace') {
          setLetter('');
          onBackspace(); // Notify Board to move focus backward
        }
        onKeyPress(key);
      }
    };

    const handleClick = () => {
      if (editorMode || content !== '.') {
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
        onKeyDown={handlePCKeyPress}
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
              fontWeight: 400,
              userSelect: 'none',
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