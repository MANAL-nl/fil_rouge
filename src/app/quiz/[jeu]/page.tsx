"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuizParJeu() {
  const { jeu } = useParams(); // Récupère "sebi" ou "james" depuis l'URL
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch("/api/prompts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: "quiz", jeu }),
        });

        const data = await res.json();
        if (res.ok) {
          setPrompt(data.prompt);
        } else {
          setError(data.error || "Erreur lors de la génération du quiz.");
        }
      } catch (err) {
        setError("Erreur de connexion avec le serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [jeu]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz pour {jeu}</h1>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <p>{prompt}</p>}
    </div>
  );
}
