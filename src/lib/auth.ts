import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { type NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET || 'votre-secret-super-securise';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function createToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

export function getAuthToken(cookieStore: ReadonlyRequestCookies): string | null {
  const cookie = cookieStore.get('token'); 
  return cookie?.value ?? null;
}

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
    path: '/',
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.delete('token');
}