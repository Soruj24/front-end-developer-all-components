import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { SessionModel } from "./models";
import { connectDb } from "./connect";
import { db } from "./handle";
import { optionalEnv } from "@/lib/env";

export const SESSION_COOKIE = "cmp_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/** KDF parameters — scrypt is deliberately expensive to slow brute-forcing. */
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 } as const;
const SCRYPT_KEY_LENGTH = 32;
/** Stable salt so verification is deterministic across processes/restarts. */
const PASSWORD_SALT = "component-library-admin-v1";

function scryptHash(value: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCb(value, PASSWORD_SALT, SCRYPT_KEY_LENGTH, SCRYPT_OPTIONS, (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });
}

function sessionSecret(): string {
  const secret = optionalEnv("SESSION_SECRET");
  if (!secret) {
    throw new Error("Missing required environment variable: SESSION_SECRET");
  }
  return secret;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: Math.floor(SESSION_TTL_MS / 1000),
};

export function hashToken(token: string, secret: string): string {
  return createHmac("sha256", secret).update(token).digest("hex");
}

/**
 * Constant-time verification of the admin password against the environment
 * secret using the scrypt KDF. Unlike plain SHA-256/HMAC, scrypt is memory-hard
 * and slow, which together with the login rate limiter makes offline and online
 * brute-force attacks impractical.
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const expected = optionalEnv("ADMIN_PASSWORD");
  if (!expected) {
    if (process.env.NODE_ENV === "production") {
      console.error("[auth] ADMIN_PASSWORD is not set — admin login is disabled.");
    }
    return false;
  }
  if (!password) return false;
  const [a, b] = await Promise.all([scryptHash(password), scryptHash(expected)]);
  return timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    await connectDb();
    const tokenHash = hashToken(token, sessionSecret());
    const session = await db(SessionModel)
      .findOne({ tokenHash, expiresAt: { $gt: new Date() } })
      .lean();
    return Boolean(session);
  } catch {
    return false;
  }
}

export async function createSession(): Promise<string> {
  await connectDb();
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token, sessionSecret());
  await db(SessionModel).create({
    tokenHash,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + SESSION_TTL_MS),
  });
  return token;
}

export async function destroySession(): Promise<void> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (token) {
    try {
      await connectDb();
      const tokenHash = hashToken(token, sessionSecret());
      await db(SessionModel).findOneAndUpdate(
        { tokenHash },
        { $set: { expiresAt: new Date(0) } }
      );
    } catch {
      // Session cleanup is best-effort; the cookie is removed regardless.
    }
  }
}
