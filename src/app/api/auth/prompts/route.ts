import { NextResponse } from "next/server";
import { generatePrompt } from "@/lib/prompts/generatePrompt";

export async function POST(req: Request) {
  const { type, jeu } = await req.json();

  try {
    const prompt = generatePrompt(type, jeu);
    return NextResponse.json({ prompt });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la génération." }, { status: 400 });
  }
}
