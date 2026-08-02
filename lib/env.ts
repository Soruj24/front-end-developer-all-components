const PRODUCTION = process.env.NODE_ENV === "production";

/**
 * Centralized, lazy environment access.
 *
 * Secrets are read at request time (never at module scope) so they resolve from
 * the runtime environment instead of being inlined during `next build`. In
 * production a missing required secret throws instead of degrading silently.
 */
export function requireEnv(name: string, devFallback?: string): string {
  const value = process.env[name];
  if (value && value.trim()) return value;
  if (!PRODUCTION && devFallback !== undefined) return devFallback;
  throw new Error(`Missing required environment variable: ${name}`);
}

export function optionalEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() ? value : undefined;
}
