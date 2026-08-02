import { headers } from "next/headers";

/** Absolute URL builder from the incoming request host/proto. */
export async function appUrl(path = "/"): Promise<string> {
  const h = await headers();
  const host =
    h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "production" ? "https" : "http");
  return `${proto}://${host}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Best-effort client IP for actions, honoring reverse-proxy headers. */
export async function actionClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim() || "unknown";
  return h.get("x-real-ip") ?? "unknown";
}

export async function actionUserAgent(): Promise<string | undefined> {
  const h = await headers();
  return h.get("user-agent") ?? undefined;
}