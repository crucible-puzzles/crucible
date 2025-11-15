import React, { useState, useEffect, forwardRef } from 'react';

interface SquareProps {
  onKeyPress: (key: String) => void;
  onClick: () => void;
  onBackspace: () => void;
  onBlur: () => void;
  onArrowKey: (direction: 'up' | 'down' | 'left' | 'right') => void;
  isFocused: boolean;
  isHighlighted: boolean;
  editorMode: boolean;
  number: number | null;
  initialContents: string;
  externalLetter: string;
  isMobile: boolean;
}

const Square = forwardRef<HTMLDivElement, SquareProps>(
  ({ onKeyPress, onClick, onBackspace, onBlur, onArrowKey, isFocused, isHighlighted, editorMode, number, initialContents, externalLetter, isMobile }, ref) => {
    const [letter, setLetter] = useState(initialContents);
    const [content, setContent] = useState(initialContents);

    // Update letter when initialContents changes (for loading saved puzzles)
    useEffect(() => {
      setLetter(initialContents);
    }, [initialContents]);

    useEffect(() => {
      setContent(letter)
    }, [letter]);

    useEffect(() => {
      if(isFocused) {
        handleKeyPress(externalLetter)
      }
    }, [externalLetter]);

    const handlePCKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const key = event.key;
      
      // Handle Tab key to toggle direction (only at intersections)
      if (key === 'Tab') {
        event.preventDefault(); // Prevent default tab behavior
        onClick(); // This will toggle direction if at intersection
        return;
      }
      
      // Handle arrow keys for navigation
      if (key === 'ArrowUp') {
        event.preventDefault();
        onArrowKey('up');
        return;
      }
      if (key === 'ArrowDown') {
        event.preventDefault();
        onArrowKey('down');
        return;
      }
      if (key === 'ArrowLeft') {
        event.preventDefault();
        onArrowKey('left');
        return;
      }
      if (key === 'ArrowRight') {
        event.preventDefault();
        onArrowKey('right');
        return;
      }
      
      handleKeyPress(key)
    };

    const handleKeyPress = (key: String) => {
      if (editorMode || (key !== '.' && letter !== '.')) {
        if (key.length === 1 && key.match(/[a-zA-Z\.]/)) {
          setLetter(key.toUpperCase());
          onKeyPress(key);
        } else if (key === 'Backspace') {
          setLetter('');
          onBackspace();
          onKeyPress(key);
        }
      }
    };

    const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
      if (editorMode || content !== '.') {
        onClick();
      }
    };

    const handleBlur = () => {
      if (!isMobile) {
        onBlur();
      }
    };

    return (
      <div
        ref={ref}
        data-letter={letter}
        data-number={number !== undefined && number !== null ? number.toString() : ''}
        tabIndex={isMobile ? -1 : 0}
        onKeyDown={!isMobile ? handlePCKeyPress : undefined}
        onClick={handleClick}
        onTouchEnd={isMobile ? handleClick : undefined}
        className="crossword-square-cell"
        style={{
          width: 'var(--square-size, 50px)',
          height: 'var(--square-size, 50px)',
          border: '1px solid black',
          position: 'relative',
          fontSize: 'var(--square-font-size, 24px)',
          fontFamily: 'Kadwa',
          fontWeight: 400,
          fontStyle: 'normal',
          userSelect: 'none',
          outline: 'none',
          backgroundColor: isFocused ? '#4A90E2' : isHighlighted ? '#E8F4FF' : content === '.' ? 'black' : 'white'
        }}
      >
        {number !== null && (
          <div
            className="square-number"
            style={{
              position: 'absolute',
              top: '2px',
              left: '2px',
              fontSize: 'var(--square-number-size, 12px)',
              lineHeight: 'var(--square-number-size, 12px)',
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