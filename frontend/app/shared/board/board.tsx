import next from 'next';
import React, { useState, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import Hints from './hints';
import Square from './square';


interface BoardProps {
  boardWidth: number;
  boardHeight: number;
  editorMode: boolean;
  initialStructure: number[]
  initialSolution?: string;
  initialHints: Hint[]
  onBoardContentChange: (contents: string[]) => void;
  externalLetter: string;
}

interface Hint {
  number: string;
  direction: 'down' | 'across';
  text: string;
}


const Board = forwardRef<{ getBoardContents: () => string[] }, BoardProps>((props, ref) => {
  const { boardWidth, boardHeight, editorMode, initialStructure, initialSolution, initialHints, onBoardContentChange, externalLetter } = props;
  const [focusIndex, setFocusIndex] = useState(-1);
  const [focusDirection, setFocusDirection] = useState<'horizontal' | 'vertical'>('vertical');
  const squareRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  const [highlightedSquares, setHighlightedSquares] = useState<number[]>([]);
  const [squareNumbers, setSquareNumbers] = useState<(number | null)[]>([]);
  const [hints, setHints] = useState(initialHints);
  const [currentHint, setCurrentHint] = useState<{ number: string; direction: 'down' | 'across' } | null>(null);
  const [selectedHint, setSelectedHint] = useState<{ number: string; direction: 'down' | 'across' } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  
  // Initialize letters from solution if provided, otherwise empty
  const [letters, setLetters] = useState(() => {
    if (initialSolution && initialSolution.length === boardWidth * boardHeight) {
      return initialSolution.split('');
    }
    return Array(boardWidth * boardHeight).fill('');
  });
  
  // Track if refs are ready for calculation
  const [refsReady, setRefsReady] = useState(false);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Remove async focus - now handled synchronously in click handler for iOS Safari compatibility

  useEffect(() => {
    if (typeof focusIndex === 'number' && focusIndex >= 0 && focusIndex < letters.length) {
      if(externalLetter == 'KEYBOARDINPUT') {
        moveFocus();
        moveFocusBackward();
      }
      else {
        const updatedLetters = [...letters];
        updatedLetters[focusIndex] = externalLetter;
        setLetters(updatedLetters);
      }
    }
  }, [externalLetter]);
  

  useEffect(() => {
    squareRefs.current = Array.from(
      { length: boardWidth * boardHeight },
      (_, i) => squareRefs.current[i] || React.createRef<HTMLDivElement>()
    );
    // Mark refs as ready after a brief delay to ensure DOM is updated
    const timer = setTimeout(() => setRefsReady(true), 50);
    return () => clearTimeout(timer);
  }, [boardWidth, boardHeight]);

  useEffect(() => {
    // Only focus square divs on desktop - mobile uses persistent mobile input
    if (!isMobile && squareRefs.current[focusIndex] && squareRefs.current[focusIndex].current) {
      squareRefs.current[focusIndex].current?.focus();
    }
  }, [focusIndex, isMobile]);

  useEffect(() => {
    const updateHighlightedSquares = () => {
      const newHighlightedSquares: number[] = [];
      const currentRow = Math.floor(focusIndex / boardWidth);
      const currentCol = focusIndex % boardWidth;

      if(focusIndex >=0) {
        if (focusDirection === 'horizontal') {
          let start = currentCol;
          while (start > 0 && squareRefs.current[currentRow * boardWidth + start - 1].current?.getAttribute('data-letter') !== '.') {
            start--;
          }
          let end = currentCol;
          while (end < boardWidth - 1 && squareRefs.current[currentRow * boardWidth + end + 1].current?.getAttribute('data-letter') !== '.') {
            end++;
          }
          for (let col = start; col <= end; col++) {
            if (col !== currentCol) {
              newHighlightedSquares.push(currentRow * boardWidth + col);
            }
          }
        } else {
          let start = currentRow;
          while (start > 0 && squareRefs.current[(start - 1) * boardWidth + currentCol].current?.getAttribute('data-letter') !== '.') {
            start--;
          }
          let end = currentRow;
          while (end < boardHeight - 1 && squareRefs.current[(end + 1) * boardWidth + currentCol].current?.getAttribute('data-letter') !== '.') {
            end++;
          }
          for (let row = start; row <= end; row++) {
            if (row !== currentRow) {
              newHighlightedSquares.push(row * boardWidth + currentCol);
            }
          }
        }
      }
      setHighlightedSquares(newHighlightedSquares);
    };

    updateHighlightedSquares();
  }, [focusIndex, focusDirection, boardWidth, boardHeight]);

  useEffect(() => {
    onBoardContentChange(getBoardContents())
  }, [highlightedSquares]);

  // Calculate square numbers whenever board dimensions, letters, or refs change
  useEffect(() => {
    console.log("Square numbers useEffect triggered. refsReady:", refsReady, "letters:", letters);
    // Don't calculate until refs are ready
    if (!refsReady) {
      console.log("Refs not ready yet, skipping calculation");
      return;
    }
    
    const calculateSquareNumbers = () => {
      console.log("Calculating square numbers...");
      const squareNumbers: (number | null)[] = Array(boardWidth * boardHeight).fill(null);
      let currentNumber = 1;
    
      // Build a grid of what's black vs white
      const grid: boolean[] = []; // true = white, false = black
      const initialBlackSquares = new Set(initialStructure);
      
      for (let i = 0; i < boardWidth * boardHeight; i++) {
        if (editorMode) {
          // In editor mode: use letters state to determine if square is black or white
          // A square is white if it has a letter (not '.' and not empty)
          const currentLetter = letters[i];
          grid[i] = currentLetter !== '.' && currentLetter !== ''; // white if has a letter
        } else {
          // In solver mode: use initialStructure to determine black squares
          // A square is white if it's NOT in the initialStructure (black squares list)
          grid[i] = !initialBlackSquares.has(i);
        }
      }
    
      // Helper function to check if a square starts an across word
      const startsAcrossWord = (row: number, col: number): boolean => {
        const index = row * boardWidth + col;
        if (!grid[index]) return false; // Must be white
        
        // Must be at left edge or have black square to the left
        const hasLeftBlack = col === 0 || !grid[row * boardWidth + (col - 1)];
        if (!hasLeftBlack) return false;
        
        // Must have at least one more white square to the right
        return col < boardWidth - 1 && grid[row * boardWidth + (col + 1)];
      };
      
      // Helper function to check if a square starts a down word
      const startsDownWord = (row: number, col: number): boolean => {
        const index = row * boardWidth + col;
        if (!grid[index]) return false; // Must be white
        
        // Must be at top edge or have black square above
        const hasTopBlack = row === 0 || !grid[(row - 1) * boardWidth + col];
        if (!hasTopBlack) return false;
        
        // Must have at least one more white square below
        return row < boardHeight - 1 && grid[(row + 1) * boardWidth + col];
      };
    
      // Assign numbers in reading order (left-to-right, top-to-bottom)
      for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
          const index = row * boardWidth + col;
          
          // A square gets a number if it starts an across word OR a down word
          if (startsAcrossWord(row, col) || startsDownWord(row, col)) {
            squareNumbers[index] = currentNumber++;
          }
        }
      }
    
      return squareNumbers;
    };

    const updatedSquareNumbers = calculateSquareNumbers();
    console.log("Updated square numbers:", updatedSquareNumbers);
    setSquareNumbers(updatedSquareNumbers);
  }, [boardWidth, boardHeight, letters, refsReady, initialStructure]);

  useEffect(() => {
    const updateCurrentHint = () => {
      if(!editorMode) {
        return;
      }
      else if (focusIndex >= 0) {
        const currentRow = Math.floor(focusIndex / boardWidth);
        const currentCol = focusIndex % boardWidth;
        //console.log("Focus direction: " + focusDirection + ", current row: " + currentRow + ", current column: " + currentCol + ", focusIndex: " + focusIndex);
        if (focusDirection === 'horizontal') {
          let start = currentCol;
          while (start > 0 && squareRefs.current[currentRow * boardWidth + start - 1].current?.getAttribute('data-letter') !== '.') {
            start--;
          }
          const hintNumber = squareRefs.current[currentRow * boardWidth + start].current?.getAttribute('data-number') || '';
          setSelectedHint({ number: hintNumber, direction: 'across' });
          setCurrentHint({ number: hintNumber, direction: 'across' });
        } else {
          let start = currentRow;
          while (start > 0 && squareRefs.current[(start - 1) * boardWidth + currentCol].current?.getAttribute('data-letter') !== '.') {
            start--;
          }
          const hintNumber = squareRefs.current[start * boardWidth + currentCol].current?.getAttribute('data-number') || '';
          setSelectedHint({ number: hintNumber, direction: 'down' });
          setCurrentHint({ number: hintNumber, direction: 'down' });
        }
      } else {
        setCurrentHint(null);
      }
    };

    updateCurrentHint();
  }, [focusIndex, focusDirection, squareRefs]);

  const handleHintChange = (hintNumber: string, direction: 'down' | 'across', hintText: string) => {
    setHints((prevHints) => {
      const updatedHints = [...prevHints];
      const hintIndex = updatedHints.findIndex((hint) => hint.number === hintNumber && hint.direction === direction);
      if (hintIndex !== -1) {
        updatedHints[hintIndex].text = hintText;
      } else {
        updatedHints.push({ number: hintNumber, direction, text: hintText });
      }
      return updatedHints;
    });
  };


  const moveFocus = () => {
    console.log("BOARD MOVE FOCUS, direction:", focusDirection);
    const currentRow = Math.floor(focusIndex / boardWidth);
    const currentCol = focusIndex % boardWidth;
    let nextIndex = focusIndex;
    const blackSquares = new Set(initialStructure);
    
    if (focusDirection === 'horizontal') {
      // Move to next column in same row
      if (currentCol < boardWidth - 1) {
        nextIndex = currentRow * boardWidth + (currentCol + 1);
        
        // Check if next square is black
        if (blackSquares.has(nextIndex)) {
          console.log("Next square is black, not moving");
          return;
        }
        
        console.log("Moving horizontally to index:", nextIndex);
        setFocusIndex(nextIndex);
        
        // MOBILE FIX: Match deletion behavior exactly - immediate refocus after setFocusIndex
        if (isMobile && mobileInputRef.current) {
          setTimeout(() => {
            mobileInputRef.current?.focus();
          }, 0);
        }
      } else {
        console.log("At end of row, not moving");
      }
    } else if (focusDirection === 'vertical') {
      // Move to next row in same column
      if (currentRow < boardHeight - 1) {
        nextIndex = (currentRow + 1) * boardWidth + currentCol;
        
        // Check if next square is black
        if (blackSquares.has(nextIndex)) {
          console.log("Next square is black, not moving");
          return;
        }
        
        console.log("Moving vertically to index:", nextIndex);
        setFocusIndex(nextIndex);
        
        // MOBILE FIX: Match deletion behavior exactly - immediate refocus after setFocusIndex
        if (isMobile && mobileInputRef.current) {
          setTimeout(() => {
            mobileInputRef.current?.focus();
          }, 0);
        }
      } else {
        console.log("At bottom of column, not moving");
      }
    }
  };

  const moveFocusBackward = () => {
    console.log("BOARD MOVE FOCUS BACKWARD");
    let prevIndex = focusIndex;
    do {
      if (focusDirection === 'horizontal') {
        if (focusIndex > 0) {
          prevIndex = prevIndex - 1;
        }
      } else {
        if (focusIndex > 0) {
          // prevIndex = (prevIndex - boardWidth + boardWidth * boardHeight) % (boardWidth * boardHeight);
          // if (prevIndex > focusIndex) {
          //   prevIndex = Math.max(prevIndex - 1, 0);
          // }
          prevIndex = prevIndex - boardWidth;
          if(prevIndex < 0) {
            prevIndex = prevIndex + boardWidth * boardHeight - 1;
          }
        }
      }
    } while (!editorMode && squareRefs.current[prevIndex].current?.textContent === '.');
    setFocusIndex(prevIndex);
    
    // MOBILE FIX: Keep mobile input focused when moving backward
    if (isMobile && mobileInputRef.current) {
      // Use setTimeout to ensure focus happens after state update
      setTimeout(() => {
        mobileInputRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyPress = (key: String, index: number) => {
    console.log("handleKeyPress called with key:", key, "at index:", index);
    // Update the letters state when a key is pressed
    if (key.length === 1 && key.match(/[a-zA-Z\.]/)) {
      const updatedLetters = [...letters];
      updatedLetters[index] = key.toUpperCase();
      console.log("Updating letters state:", updatedLetters);
      setLetters(updatedLetters);
      moveFocus();
    } else if (key === 'Backspace') {
      const updatedLetters = [...letters];
      updatedLetters[index] = '';
      console.log("Clearing letter at index:", index);
      setLetters(updatedLetters);
    }
  };

  const handleMobileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (focusIndex < 0) return;
    
    const value = event.target.value.toUpperCase();
    if (value.length > 0) {
      const lastChar = value[value.length - 1];
      if (lastChar.match(/[A-Z]/)) {
        handleKeyPress(lastChar, focusIndex);
        // Clear input for next character
        event.target.value = '';
        
        // CRITICAL FIX: Immediately refocus mobile input after processing
        // This ensures keyboard stays up when advancing forward
        if (mobileInputRef.current) {
          mobileInputRef.current.focus();
        }
      }
    }
  };

  const handleMobileKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (focusIndex < 0) return;
    
    if (event.key === 'Backspace') {
      event.preventDefault();
      handleKeyPress('Backspace', focusIndex);
      moveFocusBackward();
    }
  };

  const handleArrowKey = (direction: 'up' | 'down' | 'left' | 'right') => {
    const currentRow = Math.floor(focusIndex / boardWidth);
    const currentCol = focusIndex % boardWidth;
    const blackSquares = new Set(initialStructure);
    let nextIndex = focusIndex;
    let moved = false;

    switch (direction) {
      case 'up':
        if (currentRow > 0) {
          nextIndex = (currentRow - 1) * boardWidth + currentCol;
          if (!blackSquares.has(nextIndex)) {
            setFocusIndex(nextIndex);
            setFocusDirection('vertical');
            moved = true;
          }
        }
        break;
      case 'down':
        if (currentRow < boardHeight - 1) {
          nextIndex = (currentRow + 1) * boardWidth + currentCol;
          if (!blackSquares.has(nextIndex)) {
            setFocusIndex(nextIndex);
            setFocusDirection('vertical');
            moved = true;
          }
        }
        break;
      case 'left':
        if (currentCol > 0) {
          nextIndex = currentRow * boardWidth + (currentCol - 1);
          if (!blackSquares.has(nextIndex)) {
            setFocusIndex(nextIndex);
            setFocusDirection('horizontal');
            moved = true;
          }
        }
        break;
      case 'right':
        if (currentCol < boardWidth - 1) {
          nextIndex = currentRow * boardWidth + (currentCol + 1);
          if (!blackSquares.has(nextIndex)) {
            setFocusIndex(nextIndex);
            setFocusDirection('horizontal');
            moved = true;
          }
        }
        break;
    }

    // MOBILE FIX: Keep mobile input focused when using arrow keys
    if (moved && isMobile && mobileInputRef.current) {
      setTimeout(() => {
        mobileInputRef.current?.focus();
      }, 0);
    }
  };

  const handleClick = (index: number) => {
    const row = Math.floor(index / boardWidth);
    const col = index % boardWidth;
    const blackSquares = new Set(initialStructure);
    
    // Check if this square is part of horizontal and/or vertical words
    const hasLeft = col > 0 && !blackSquares.has(row * boardWidth + (col - 1));
    const hasRight = col < boardWidth - 1 && !blackSquares.has(row * boardWidth + (col + 1));
    const hasUp = row > 0 && !blackSquares.has((row - 1) * boardWidth + col);
    const hasDown = row < boardHeight - 1 && !blackSquares.has((row + 1) * boardWidth + col);
    
    const isPartOfHorizontalWord = hasLeft || hasRight;
    const isPartOfVerticalWord = hasUp || hasDown;
    const isIntersection = isPartOfHorizontalWord && isPartOfVerticalWord;
    
    if (index === focusIndex) {
      // Clicking the same square - only toggle direction if at an intersection
      if (isIntersection) {
        const newDirection = focusDirection === 'horizontal' ? 'vertical' : 'horizontal';
        setFocusDirection(newDirection);
        
        // If current square is filled, move to next square in new direction
        const currentSquareRef = squareRefs.current[index]?.current;
        const currentLetter = currentSquareRef?.getAttribute('data-letter') || '';
        
        if (currentLetter && currentLetter !== '.' && currentLetter !== '') {
          // Square is filled, move to next square in new direction
          if (newDirection === 'horizontal') {
            // Move right if possible
            if (hasRight) {
              const nextIndex = row * boardWidth + (col + 1);
              setFocusIndex(nextIndex);
              // MOBILE FIX: Keep focus when moving after direction toggle
              if (isMobile && mobileInputRef.current) {
                setTimeout(() => {
                  mobileInputRef.current?.focus();
                }, 0);
              }
            }
          } else {
            // Move down if possible
            if (hasDown) {
              const nextIndex = (row + 1) * boardWidth + col;
              setFocusIndex(nextIndex);
              // MOBILE FIX: Keep focus when moving after direction toggle
              if (isMobile && mobileInputRef.current) {
                setTimeout(() => {
                  mobileInputRef.current?.focus();
                }, 0);
              }
            }
          }
        }
        // If square is empty, stay on current square - still need to refocus mobile input
        if (isMobile && mobileInputRef.current) {
          mobileInputRef.current.focus();
        }
      }
      // Otherwise, do nothing (can't toggle at non-intersection) - but still refocus for mobile
      else if (isMobile && mobileInputRef.current) {
        mobileInputRef.current.focus();
      }
    } else {
      // Clicking a new square - determine the appropriate direction
      setFocusIndex(index);
      
      // If only part of one word, set direction to that word
      if (isPartOfHorizontalWord && !isPartOfVerticalWord) {
        setFocusDirection('horizontal');
      } else if (isPartOfVerticalWord && !isPartOfHorizontalWord) {
        setFocusDirection('vertical');
      }
      // If part of both words (intersection), keep current direction
      // If part of neither (isolated square), keep current direction
    }

    // CRITICAL FIX: Focus mobile input directly in click handler for iOS Safari compatibility
    if (isMobile && mobileInputRef.current) {
      // Must happen synchronously within the touch event for iOS Safari to show keyboard
      mobileInputRef.current.focus();
    }
  };

  const handleSquareBlur = (index: number) => {
    if (index === focusIndex) {
      setFocusIndex(-1); // Set focus index to -1 to indicate no square is focused
    }
  };


  const getBoardContents = () => {
    const contents: string[] = [];
    for (let i = 0; i < squareRefs.current.length; i++) {
      if (squareRefs.current[i].current) {
        const dataLetter = squareRefs.current[i].current?.getAttribute('data-letter');
        if (typeof dataLetter === 'string') {
          contents.push(dataLetter);
        }
      }
    }
    return contents;
  };

  // Expose getBoardContents to parent components via ref
  useImperativeHandle(ref, () => ({
    getBoardContents
  }));


  const renderSquare = (i: number) => {
    console.log("INITIALSTRUCTURE:" + initialStructure)
    // Determine initial contents: black square (.) or letter from solution
    const initialContent = initialStructure.includes(i) ? '.' : (letters[i] || '');
    
    return (
      <Square
        key={i}
        ref={squareRefs.current[i]}
        onKeyPress={(key: String) => handleKeyPress(key, i)}
        onClick={() => handleClick(i)}
        onBlur={() => handleSquareBlur(i)}
        onBackspace={() => moveFocusBackward()}
        onArrowKey={handleArrowKey}
        isFocused={i === focusIndex}
        isHighlighted={highlightedSquares.includes(i)}
        editorMode={editorMode}
        number={squareNumbers[i]}
        initialContents={initialContent}
        externalLetter={letters[i]}
        isMobile={isMobile}
      />
    );
  };

  return (
    <div style={{
      display:'flex',
      flexDirection:'row',
      alignItems: 'flex-start',
      position: 'relative'
    }}>
      {/* Single persistent mobile input - iOS Safari optimized */}
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
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '30px',
            height: '30px',
            opacity: 0.01,
            fontSize: '16px', // Critical: 16px+ prevents zoom on iOS Safari
            border: 'none',
            outline: 'none',
            padding: 0,
            margin: 0,
            zIndex: 1000,
            transform: 'scale(0.1)', // Make visually tiny while keeping actual size
            transformOrigin: 'top left'
          }}
          readOnly={false}
        />
      )}
      <div
        className="crossword-board"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${boardWidth}, var(--square-size, 50px))`,
          gridGap: '0px',
        }}
      >
        {Array.from({ length: boardWidth * boardHeight }, (_, i) => renderSquare(i))}
      </div>
      <div style={{ marginLeft: '50px'}}/>
      {/*<Hints hints={hints} currentHint={selectedHint} onHintChange={handleHintChange} />*/}
    </div>
  );
});

Board.displayName = 'Board';

export default Board;