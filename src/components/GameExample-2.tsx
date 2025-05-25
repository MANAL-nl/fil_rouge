"use client";
import { useState } from 'react';

export default function GameExample2() {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore(prev => prev + 1);
  };

  return (
    <div className="p-4 bg-slate-700 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Jeu Simple</h2>
      <p>Score: {score}</p>
      <button 
        onClick={handleClick}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Clique-moi !
      </button>
    </div>
  );
}