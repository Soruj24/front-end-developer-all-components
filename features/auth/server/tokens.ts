import { createHmac, randomBytes } from "node:crypto";
import { optionalEnv } from "@/lib/env";

/** 24 hours for email verification links. */
export const VERIFY_TTL_MS = 24 * 60 * 60 * 1000;
/** 30 minutes for password reset links. */
export const RESET_TTL_MS = 30 * 60 * 1000;

function secret(): string {
  const value = optionalEnv("SESSION_SECRET") ?? optionalEnv("AUTH_SECRET");
  if (!value) {
    throw new Error("Missing required environment variable: SESSION_SECRET");
  }
  return value;
}

/** High-entropy opaque token sent to the user (never stored raw). */
export function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

/** One-way hash stored in the database for comparison on consume. */
export function hashToken(token: string): string {
  return createHmac("sha256", secret()).update(token).digest("hex");
}

export function isExpired(expiresAt: Date | null | undefined): boolean {
  return !expiresAt || expiresAt.getTime() <= Date.now();
}