'use client';

import { useState } from 'react';

interface GameInputProps {
  onGuess: (guess: number) => void;
}

const GameInput = ({ onGuess }: GameInputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const guess = parseInt(value);
    if (!isNaN(guess)) {
      onGuess(guess);
      setValue('');
    }
  };

  return (
    <div className="space-x-2">
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tebak angka (1-10)"
        className="border px-2 py-1 rounded"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default GameInput;
