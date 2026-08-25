import type { ApiEndpoint, ApiKeyValue, AuthConfig } from "./types";

export interface EndpointState {
  path: ApiKeyValue[];
  query: ApiKeyValue[];
  headers: ApiKeyValue[];
  body: string;
}

export function statusClass(status: number): string {
  if (status >= 500) return "bg-danger-soft text-danger";
  if (status >= 400) return "bg-warning-soft text-warning";
  if (status >= 300) return "bg-primary/10 text-primary";
  if (status >= 200) return "bg-success-soft text-success";
  return "bg-muted text-muted-foreground";
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function prettyJson(value: unknown): string {
  if (value === undefined) return "";
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function highlightJson(json: string): string {
  const re =
    /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
  const tokens: string[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(json))) {
    if (match.index > last) tokens.push(escapeHtml(json.slice(last, match.index)));
    const [, str, colon, literal, num] = match;
    let cls = "tok-punct";
    if (str && colon) cls = "tok-key";
    else if (str) cls = "tok-string";
    else if (literal) cls = "tok-keyword";
    else if (num) cls = "tok-number";
    tokens.push(`<span class="${cls}">${escapeHtml(match[0])}</span>`);
    last = match.index + match[0].length;
  }
  if (last < json.length) tokens.push(escapeHtml(json.slice(last)));
  return tokens.join("");
}

function base64Encode(value: string): string {
  try {
    return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (_, h) => String.fromCharCode(parseInt(h, 16))));
  } catch {
    return btoa(value);
  }
}

export function authHeaderPairs(auth: AuthConfig): [string, string][] {
  if (auth.type === "bearer" && auth.token) {
    return [["Authorization", `Bearer ${auth.token}`]];
  }
  if (auth.type === "basic" && auth.username) {
    return [["Authorization", `Basic ${base64Encode(`${auth.username}:${auth.password ?? ""}`)}`]];
  }
  if (auth.type === "apiKey" && auth.keyValue) {
    return [[auth.keyName || "X-API-Key", auth.keyValue]];
  }
  return [];
}

export function extractPathTokens(path: string): string[] {
  const tokens: string[] = [];
  const re = /:([A-Za-z_][\w-]*)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(path))) tokens.push(match[1]);
  return tokens;
}

export function initEndpointState(endpoint: ApiEndpoint): EndpointState {
  const path = extractPathTokens(endpoint.path).map((key) => {
    const existing = endpoint.params?.find((p) => p.key === key);
    return {
      key,
      value: existing?.value ?? "",
      enabled: true,
      description: existing?.description,
    };
  });
  const query = (endpoint.query ?? []).map((q) => ({ ...q, enabled: q.enabled ?? true }));
  const headers = (endpoint.headers ?? []).map((h) => ({ ...h, enabled: h.enabled ?? true }));
  return {
    path,
    query,
    headers,
    body: endpoint.requestBody !== undefined ? prettyJson(endpoint.requestBody) : "",
  };
}
