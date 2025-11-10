import React, { useState, useEffect, forwardRef } from 'react';

interface SquareProps {
  onKeyPress: (key: String) => void;
  onClick: () => void;
  onTabToggle: () => void;
  onBackspace: () => void;
  onBlur: () => void;
  onArrowKey: (direction: 'up' | 'down' | 'left' | 'right') => void;
  isFocused: boolean;
  isHighlighted: boolean;
  editorMode: boolean;
  number: number | null;
  initialContents: string;
  externalLetter: string;
}

const EditorSquare = forwardRef<HTMLDivElement, SquareProps>(
  ({ onKeyPress, onClick, onTabToggle, onBackspace, onBlur, onArrowKey, isFocused, isHighlighted, editorMode, number, initialContents, externalLetter }, ref) => {
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
      
      // Handle Tab key to toggle direction
      if (key === 'Tab') {
        event.preventDefault();
        onTabToggle();
        return;
      }
      
      // Handle arrow keys for navigation - always allow in editor mode
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
      console.log("EditorSquare handleKeyPress called with key:", key, "initialContents:", initialContents);
      if (editorMode || (key !== '.' && letter !== '.')) {
        if (key.length === 1 && key.match(/[a-zA-Z\.]/)) {
          setLetter(key.toUpperCase());
          console.log("EditorSquare calling onKeyPress callback");
          onKeyPress(key);
        } else if (key === 'Backspace') {
          setLetter('');
          onBackspace();
          console.log("EditorSquare calling onKeyPress callback for Backspace");
          onKeyPress(key);
        }
      }
    };

    const handleClick = () => {
      // In editor mode, allow clicking on all squares including black ones
      onClick();
    };

    const handleBlur = () => {
      console.log("EDITOR SQUARE BLURRED!");
      onBlur();
    };

    // Determine background color
    // Black squares (content === '.') turn grey when focused
    const getBackgroundColor = () => {
      if (content === '.') {
        return isFocused ? '#808080' : 'black';
      }
      return isFocused ? '#4A90E2' : isHighlighted ? '#E8F4FF' : 'white';
    };

    return (
      <div
        ref={ref}
        data-letter={letter}
        data-number={number !== undefined && number !== null ? number.toString() : ''}
        tabIndex={0}
        onKeyDown={handlePCKeyPress}
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
          backgroundColor: getBackgroundColor()
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

EditorSquare.displayName = 'EditorSquare';

export default EditorSquare;