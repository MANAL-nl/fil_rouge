import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, gameId, score } = await req.json();

  const result = await prisma.score.create({
    data: {
      userId,
      gameId,
      value: score,
    },
  });

  return NextResponse.json(result);
}
