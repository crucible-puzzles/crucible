import React, { useState, useEffect, forwardRef, useRef } from 'react';

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
  externalLetter: string; // New prop for external control of letter
}

const Square = forwardRef<HTMLDivElement, SquareProps>(
  ({ onKeyPress, onClick, onBackspace, onBlur, onArrowKey, isFocused, isHighlighted, editorMode, number, initialContents, externalLetter }, ref) => {
    const [letter, setLetter] = useState(initialContents);
    const [content, setContent] = useState(initialContents);
    const [isMobile, setIsMobile] = useState(false);
    const mobileInputRef = useRef<HTMLInputElement>(null);

    // Detect if device is mobile
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Update letter when initialContents changes (for loading saved puzzles)
    useEffect(() => {
      setLetter(initialContents);
    }, [initialContents]);

    // Focus mobile input when square is focused
    useEffect(() => {
      if (isFocused && isMobile && mobileInputRef.current) {
        mobileInputRef.current.focus();
      }
    }, [isFocused, isMobile]);

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
      console.log('handleKeyPress called, editorMode:', editorMode, 'key:', key, 'letter:', letter);
      if (editorMode || (key !== '.' && letter !== '.')) {
        if (key.length === 1 && key.match(/[a-zA-Z\.]/)) {
          console.log('Valid letter, updating state and calling onKeyPress');
          // Don't update local state - let the Board handle it via externalLetter prop
          // setLetter(key.toUpperCase());
          onKeyPress(key);
        } else if (key === 'Backspace') {
          console.log('Backspace pressed');
          // Don't update local state - let the Board handle it
          // setLetter('');
          onBackspace(); // Notify Board to move focus backward
          onKeyPress(key);
        }
      } else {
        console.log('Condition failed, not processing key');
      }
    };

    const handleClick = (e: React.MouseEvent) => {
      if (editorMode || content !== '.') {
        onClick(); // Call onClick when the square is clicked
        // On mobile, focus the hidden input to trigger keyboard
        if (isMobile && mobileInputRef.current) {
          e.preventDefault();
          setTimeout(() => {
            if (mobileInputRef.current) {
              mobileInputRef.current.focus();
              mobileInputRef.current.click();
            }
          }, 100);
        }
      }
    };

    const handleInputClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (mobileInputRef.current) {
        mobileInputRef.current.focus();
      }
    };

    const handleInputTouch = (e: React.TouchEvent) => {
      e.stopPropagation();
      if (mobileInputRef.current) {
        mobileInputRef.current.focus();
      }
    };

    const handleMobileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.toUpperCase();
      console.log('Mobile input value:', value);
      if (value.length > 0) {
        const lastChar = value[value.length - 1];
        console.log('Last char:', lastChar);
        if (lastChar.match(/[A-Z]/)) {
          console.log('Calling handleKeyPress with:', lastChar);
          handleKeyPress(lastChar);
          console.log('After handleKeyPress, calling onKeyPress callback');
        }
        // Clear input for next character
        event.target.value = '';
      }
    };

    const handleMobileKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Backspace') {
        event.preventDefault();
        handleKeyPress('Backspace');
      }
    };

    const handleMobileBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // On mobile, prevent blur to keep keyboard open
      if (isMobile) {
        return;
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
        {/* Hidden input for mobile keyboard */}
        {isMobile && (
          <input
            ref={mobileInputRef}
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            spellCheck="false"
            onChange={handleMobileInput}
            onKeyDown={handleMobileKeyDown}
            onBlur={handleMobileBlur}
            onClick={handleInputClick}
            onTouchStart={handleInputTouch}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              border: 'none',
              background: 'transparent',
              fontSize: '16px', // Prevents zoom on iOS
              color: 'transparent',
              caretColor: 'transparent',
              zIndex: 10,
            }}
            readOnly={false}
          />
        )}
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