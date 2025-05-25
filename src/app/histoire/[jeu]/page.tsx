"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HistoireParJeu() {
  const { jeu } = useParams();
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const fetchPrompt = async () => {
      const res = await fetch("/api/prompts", {
        method: "POST",
        body: JSON.stringify({ type: "histoire", jeu }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setPrompt(data.prompt);
    };

    fetchPrompt();
  }, [jeu]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Histoire pour {jeu}</h1>
      <p>{prompt}</p>
    </div>
  );
}
