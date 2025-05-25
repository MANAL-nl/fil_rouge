// fichier à créer : /app/jeu/course-sebi/conseils.tsx

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ConseilsCourseSebi = () => {
  const conseils = [
    "Regarde bien devant toi : Essaie de toujours regarder un peu devant Sébi pour anticiper les obstacles.",
    "Utilise tes deux mains : Une main pour sauter, l’autre pour accélérer, comme un vrai pilote !",
    "Joue un peu chaque jour : Plus tu joues, plus tu vas devenir rapide, comme un vrai champion.",
    "Si tu rates un saut, pas grave : Sébi aime réessayer et s’amuser encore !",
  ];

  return (
    <div className="p-4 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Conseils pour bien jouer à “La course de Sébi”</h1>
      <Card className="bg-green-50 border-2 border-green-300 shadow-lg rounded-2xl">
        <CardContent className="text-lg leading-relaxed space-y-4 p-6">
          {conseils.map((conseil, index) => (
            <p key={index} className="text-gray-800">{conseil}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConseilsCourseSebi;
