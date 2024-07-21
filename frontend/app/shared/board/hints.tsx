import React, { useState } from 'react';

interface Hint {
  number: string;
  direction: 'down' | 'across';
  text: string;
}

interface HintsProps {
  hints: Hint[];
  currentHint: { number: string; direction: 'down' | 'across' } | null;
  onHintChange: (hintNumber: string, direction: 'down' | 'across', hintText: string) => void;
}

const Hints: React.FC<HintsProps> = ({ hints, currentHint, onHintChange }) => {
  const [hintText, setHintText] = useState('');

  const handleHintChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHintText(event.target.value);
    if (currentHint) {
      onHintChange(currentHint.number, currentHint.direction, event.target.value);
    }
  };

  const acrossHints = hints.filter((hint) => hint.direction === 'across');
  const downHints = hints.filter((hint) => hint.direction === 'down');

  return (
    <div>
      <div>
        <h3>Across Hints:</h3>
        <div overflow-y='scroll'>
        {acrossHints.map((hint) => (
          <div key={`${hint.number}-${hint.direction}`}>
             <p>{hint.number}. {hint.text}</p>
          </div>
        ))}
        </div> 
      </div>
      <div>
        <h3>Down Hints:</h3>
        {downHints.map((hint) => (
          <div key={`${hint.number}-${hint.direction}`}>
            <p>{hint.number}. {hint.text}</p>
          </div>
        ))}
      </div>
      {currentHint && (
        <div>
          <h3>Edit Hint:</h3>
          <p>
            {currentHint.number} {currentHint.direction}
          </p>
          <textarea value={hintText} onChange={handleHintChange} />
        </div>
      )}
    </div>
  );
};

export default Hints;