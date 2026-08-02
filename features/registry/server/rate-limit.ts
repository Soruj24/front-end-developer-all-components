export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the current window resets (0 when the attempt is allowed). */
  retryAfterSec: number;
  /** Attempts remaining in the current window. */
  remaining: number;
}

export const LOGIN_LIMIT = { windowSec: 60, max: 5 } as const;

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

/**
 * Fixed-window in-memory rate limiter.
 *
 * Process-local by design: when the app is scaled horizontally this must be
 * swapped for a shared store (Redis). It is still meaningful protection for a
 * single-instance deployment and a cheap first line of defense.
 */
export function consumeRateLimit(
  key: string,
  options: { windowSec: number; max: number } = LOGIN_LIMIT
): RateLimitResult {
  const now = Date.now();
  const windowMs = options.windowSec * 1000;
  const bucket = buckets.get(key);

  if (buckets.size > MAX_BUCKETS) {
    for (const [bucketKey, b] of buckets) {
      if (now >= b.resetAt) buckets.delete(bucketKey);
    }
  }

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0, remaining: options.max - 1 };
  }

  if (bucket.count >= options.max) {
    const retryAfterSec = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
    return { allowed: false, retryAfterSec, remaining: 0 };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSec: 0, remaining: options.max - bucket.count };
}

/** Best-effort client IP extraction, honoring the common reverse-proxy headers. */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}
