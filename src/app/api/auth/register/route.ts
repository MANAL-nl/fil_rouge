import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password, username, age } = body;

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
      age: age ? parseInt(age) : undefined,
    },
  });

  return NextResponse.json(user);
}
