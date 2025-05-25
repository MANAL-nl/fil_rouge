import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const HistoireSebiJames = () => {
  const histoire = [
    "Un jour, Sébi la gazelle sauta par-dessus 10 montagnes !",
    "James le hibou sortit sa calculette magique : “Tu as sauté 53 fois, Sébi !”",
    "Mais Sébi rigolait trop pour s’arrêter : elle sautait même sur les nuages !",
    "James comptait, comptait, et ses lunettes tremblaient.",
    "Ils finirent tous les deux en riant sur une étoile sucrée !"
  ];

  return (
    <div className="p-4 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">L'histoire de Sébi et James</h1>
      <Card className="bg-yellow-50 border-2 border-yellow-300 shadow-xl rounded-2xl">
        <CardContent className="text-lg leading-relaxed space-y-4 p-6">
          {histoire.map((ligne, index) => (
            <p key={index} className="text-balance text-gray-800">{ligne}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoireSebiJames;
