import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 401 });
  }

  const valid = await compare(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const token = signToken({ userId: user.id });

  const cookieOptions = {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  };

  const res = NextResponse.json({ message: "Connexion réussie" });
  res.cookies.set('token', token, cookieOptions);

  return res;
}
