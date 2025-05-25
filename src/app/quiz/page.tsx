// fichier à créer : /app/quiz/page.tsx

"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Question = {
  question: string;
  options: string[];
  correctIndex: number;
};

const quizQuestions: Question[] = [
  {
    question: "Que doit faire Sébi la gazelle pour ne pas toucher les obstacles ?",
    options: ["Sauter très haut", "Dormir", "Se cacher"],
    correctIndex: 0,
  },
  {
    question: "Qui aime les calculs et les nombres ?",
    options: ["Sébi la gazelle", "James le hibou", "Le lapin"],
    correctIndex: 1,
  },
  {
    question: "Quel animal hulule la nuit ?",
    options: ["Le renard", "Le hibou", "Le lapin"],
    correctIndex: 1,
  },
  {
    question: "Que se passe-t-il si Sébi court très longtemps ?",
    options: ["Elle va plus vite", "Elle vole", "Elle s’endort"],
    correctIndex: 0,
  },
  {
    question: "Où aime courir Sébi ?",
    options: ["Dans la forêt magique", "Sur un nuage", "Dans la salle de classe"],
    correctIndex: 0,
  },
  {
    question: "Si Sébi saute 1 fois, puis encore 1 fois, combien de fois a-t-elle sauté ?",
    options: ["1", "2", "3"],
    correctIndex: 1,
  },
];

export default function QuizSebiJames() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(quizQuestions.length).fill(null));
  const [showScore, setShowScore] = useState(false);

  const handleOptionClick = (index: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = index;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const calculateScore = () => {
   return selectedAnswers.reduce((score: number, answer, idx) => {
  if (answer === quizQuestions[idx].correctIndex) return score + 1;
  return score;
}, 0);

  };

  return (
    <div className="p-4 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz : Sébi & James</h1>

      <Card className="bg-blue-50 border-2 border-blue-300 shadow-lg rounded-2xl p-6">
        {!showScore ? (
          <>
            <div className="mb-4 text-lg font-semibold">
              Question {currentQuestion + 1} / {quizQuestions.length}
            </div>
            <p className="mb-6">{quizQuestions[currentQuestion].question}</p>
            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestion] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full text-left px-4 py-2 rounded-lg border ${
                      isSelected ? "bg-blue-400 text-white border-blue-600" : "bg-white border-gray-300"
                    } hover:bg-blue-300 hover:text-white transition`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === null}
              className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
            >
              {currentQuestion < quizQuestions.length - 1 ? "Question suivante" : "Voir le score"}
            </button>
          </>
        ) : (
          <div className="text-center text-xl font-bold">
            🎉 Ton score est {calculateScore()} / {quizQuestions.length} !
          </div>
        )}
      </Card>
    </div>
  );
}
