import { NextResponse } from "next/server";
import { optionalEnv } from "@/lib/env";

/**
 * Allowlisted server-side proxy for private APIs.
 *
 * - Only GET requests to hostnames in API_PROXY_ALLOWLIST are forwarded.
 * - Query strings are allowlisted per-key to avoid token smuggling.
 * - An optional server token (API_PROXY_TOKEN) is injected upstream; the
 *   browser never sees it. Never accept tokens from the client here.
 */
const ALLOWED_QUERY_KEYS = new Set([
  "page",
  "pageSize",
  "limit",
  "_limit",
  "search",
  "q",
  "sortKey",
  "sortDir",
  "id",
]);

function allowlist(): string[] {
  const raw = optionalEnv("API_PROXY_ALLOWLIST") ?? "";
  return raw.split(",").map((h) => h.trim().toLowerCase()).filter(Boolean);
}

export async function GET(request: Request): Promise<NextResponse> {
  const incoming = new URL(request.url);
  const target = incoming.searchParams.get("url");
  if (!target) {
    return NextResponse.json({ error: "Missing ?url= parameter." }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return NextResponse.json({ error: "Invalid ?url= parameter." }, { status: 400 });
  }
  if (parsed.protocol !== "https:") {
    return NextResponse.json({ error: "Only https:// targets are allowed." }, { status: 400 });
  }
  if (!allowlist().includes(parsed.hostname.toLowerCase())) {
    return NextResponse.json(
      { error: `Host "${parsed.hostname}" is not allowlisted.` },
      { status: 403 },
    );
  }

  const forwarded = new URL(parsed.toString());
  const query = new URLSearchParams();
  parsed.searchParams.forEach((value, key) => {
    if (ALLOWED_QUERY_KEYS.has(key)) query.set(key, value);
  });
  forwarded.search = query.toString();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    const token = optionalEnv("API_PROXY_TOKEN");
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(forwarded.toString(), { headers, signal: controller.signal });
    const text = await res.text();
    let body: unknown = text;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      /* forward non-JSON as text */
    }
    return NextResponse.json(body, { status: res.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upstream request failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
