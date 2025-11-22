import { SignJWT, jwtVerify, type JWTPayload as JoseJWTPayload } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'your-secret-key-change-this-in-production';
const COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface JWTPayload extends JoseJWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Creates a JWT token for admin user
 */
export async function signToken(payload: JWTPayload): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET);
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return token;
}

/**
 * Verifies and decodes a JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Creates a new session by signing a token and setting it in cookies
 */
export async function createSession(user: { id: string; email: string; name: string; role: string }): Promise<void> {
  const token = await signToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

/**
 * Gets the current session from cookies
 */
export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME);

  if (!token) {
    return null;
  }

  return await verifyToken(token.value);
}

/**
 * Destroys the current session by deleting the cookie
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

