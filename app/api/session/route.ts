import { adminAuth } from '@/app/_config/firebase-admin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { idToken, rememberMe } = await req.json();

  const THIRTY_DAYS_IN_MS = 60 * 60 * 24 * 14 * 1000;
  const FIVE_Hours_IN_MS = 60 * 60 * 5 * 1000;
  const expiresIn = rememberMe ? THIRTY_DAYS_IN_MS : FIVE_Hours_IN_MS;

  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: '__session',
    value: sessionCookie,
    maxAge: expiresIn / 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
