import { promptTemplates } from "./templates";

export function generatePrompt(type: "histoire" | "quiz", jeu: string) {
const prompt = (promptTemplates[type] as Record<string, string>)?.[jeu];
  if (!prompt) throw new Error("Prompt introuvable pour ce type ou jeu.");
  return prompt;
}
