import next from 'next';
import React, { useState, useEffect, useRef } from 'react';
import Hints from './hints';
import Square from './square';


interface BoardProps {
  boardWidth: number;
  boardHeight: number;
  editorMode: boolean;
  initialStructure: number[]
  initialHints: Hint[]
  onBoardContentChange: (contents: string[]) => void;
  externalLetter: string;
}

interface Hint {
  number: string;
  direction: 'down' | 'across';
  text: string;
}


function Board({ boardWidth, boardHeight, editorMode, initialStructure, initialHints, onBoardContentChange, externalLetter }: BoardProps) {
  const [focusIndex, setFocusIndex] = useState(-1);
  const [focusDirection, setFocusDirection] = useState<'horizontal' | 'vertical'>('vertical');
  const squareRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
  const [highlightedSquares, setHighlightedSquares] = useState<number[]>([]);
  const [squareNumbers, setSquareNumbers] = useState<(number | null)[]>([]);
  const [hints, setHints] = useState(initialHints);
  const [currentHint, setCurrentHint] = useState<{ number: string; direction: 'down' | 'across' } | null>(null);
  const [selectedHint, setSelectedHint] = useState<{ number: string; direction: 'down' | 'across' } | null>(null);
  const [letters, setLetters] = useState(Array(boardWidth * boardHeight).fill(''));

  useEffect(() => {
    if (typeof focusIndex === 'number' && focusIndex >= 0 && focusIndex < letters.length) {
      console.log("HERE IS THE LETTER RECEIVED FROM TEH CUSTOM KEYBOARD!" + externalLetter)
        const updatedLetters = [...letters];
        updatedLetters[focusIndex] = externalLetter;
        setLetters(updatedLetters);
    }
  }, [externalLetter]);
  

  useEffect(() => {
    squareRefs.current = Array.from(
      { length: boardWidth * boardHeight },
      (_, i) => squareRefs.current[i] || React.createRef<HTMLDivElement>()
    );
  }, [boardWidth, boardHeight]);

  useEffect(() => {
    if (squareRefs.current[focusIndex] && squareRefs.current[focusIndex].current) {
      squareRefs.current[focusIndex].current?.focus();
    }
  }, [focusIndex]);

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
    const updatedSquareNumbers = calculateSquareNumbers();
    setSquareNumbers(updatedSquareNumbers);
  }, [boardWidth, boardHeight, highlightedSquares]);

  useEffect(() => {
    onBoardContentChange(getBoardContents())
  }, [highlightedSquares]);

  useEffect(() => {
    const updateCurrentHint = () => {
      // if(!editorMode) {
      //   return;
      // }
       if (focusIndex >= 0) {
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
    console.log("BOARD MOVE FOCUS");
    let nextIndex = focusIndex;
    let shouldChangeFocus = true;
    do {
      if (focusIndex === boardWidth * boardHeight - 1) {
        break;
      }
      if (focusDirection === 'horizontal') {
        nextIndex = (nextIndex + 1) % (boardWidth * boardHeight);
        if (nextIndex < focusIndex) {
          shouldChangeFocus = false;
          // we're at the end of the board, do nothing
        }
      } 
      else if (focusDirection === 'vertical') {
        nextIndex = nextIndex + boardWidth;
        if (nextIndex >= boardWidth * boardHeight) {
          nextIndex = (nextIndex % boardWidth) + 1;
        }
        if (focusIndex % boardWidth !== 0 && nextIndex % boardWidth === 0) {
          shouldChangeFocus = false;
        }
      }
    } while (squareRefs.current[nextIndex].current?.textContent === '.');
    if (shouldChangeFocus) {
      console.log("NEXT INDEX: " + nextIndex)
      setFocusIndex(nextIndex);
    }
  };

  const moveFocusBackward = () => {
    if(focusIndex == 1) 
    {
      return;
    }
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
  };

  const handleKeyPress = (key: String, index: number) => {
    if (key.length === 1 && key.match(/[a-zA-Z\.]/)) {
      moveFocus();
    }
  };

  const handleClick = (index: number) => {
    if (index === focusIndex) {
      setFocusDirection(focusDirection === 'horizontal' ? 'vertical' : 'horizontal');
    } else {
      setFocusIndex(index);
    }
  };

  const handleSquareBlur = (index: number) => {
    if (index === focusIndex) {
      setFocusIndex(-1); // Set focus index to -1 to indicate no square is focused
    }
  };

  const calculateSquareNumbers = () => {
    const squareNumbers: (number | null)[] = Array(boardWidth * boardHeight).fill(null);
    let currentNumber = 1;
  
    for (let i = 0; i < boardWidth * boardHeight; i++) {
      if (squareRefs?.current[i]?.current?.getAttribute('data-letter') !== '.') {
        // if (
        //   (i % boardWidth === 0 || squareRefs?.current[i - 1]?.current?.textContent === '.') ||
        //   (Math.floor(i / boardWidth) === 0 || squareRefs?.current[i - boardWidth]?.current?.textContent === '.')
        // ) 
        if (i < boardWidth || i % boardWidth == 0 || squareRefs?.current[i-1]?.current?.getAttribute('data-letter') == '.' || squareRefs?.current[i-boardWidth]?.current?.getAttribute('data-letter') == '.'){
          squareNumbers[i] = currentNumber;
          currentNumber++;
        }
      }
    }
  
    return squareNumbers;
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


  const renderSquare = (i: number) => {
    console.log("INITIALSTRUCTURE:" + initialStructure)
    return (
      <Square
        key={i}
        ref={squareRefs.current[i]}
        onKeyPress={(key: String) => handleKeyPress(key, i)}
        onClick={() => handleClick(i)}
        onBlur={() => handleSquareBlur(i)}
        onBackspace={() => moveFocusBackward()}
        isFocused={i === focusIndex}
        isHighlighted={highlightedSquares.includes(i)}
        editorMode={editorMode}
        number={squareNumbers[i]}
        initialContents={initialStructure.includes(i) ? '.' : ''}
        externalLetter={letters[i]}
      />
    );
  };

  return (
    <div style={{
      display:'flex', 
      flexDirection:'column',
      alignItems: 'flex-start'
    }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${boardWidth}, 50px)`,
          gridGap: '0px',
        }}
      >
        {Array.from({ length: boardWidth * boardHeight }, (_, i) => renderSquare(i))}
      </div>
      <div style={{ marginLeft: '50px'}}/>
      {<Hints hints={hints} currentHint={selectedHint} onHintChange={handleHintChange} />}
    </div>
  );
}

export default Board;