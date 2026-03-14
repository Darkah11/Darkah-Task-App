// src/lib/server/sessionHandler.ts

import { cookies } from "next/headers";
import { User } from "../_types/User";
import { adminAuth } from "../_config/firebase-admin";



export async function verifyUserSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value || "";

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie,
      true
    );
    return decodedClaims as User;
  } catch (error) {
    return null;
  }
}
