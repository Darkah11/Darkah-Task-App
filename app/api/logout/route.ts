import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: '__session',
    value: '',
    maxAge: -1, // Expire the cookie immediately
  });
  return response;
}
