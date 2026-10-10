export const apiExplorerSource: string = `"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";

export interface ApiKeyValue {
  key: string;
  value: string;
  enabled?: boolean;
  description?: string;
}

export type AuthType = "none" | "bearer" | "basic" | "apiKey";

export interface AuthConfig {
  type: AuthType;
  token?: string;
  username?: string;
  password?: string;
  keyName?: string;
  keyValue?: string;
}

export interface ApiEndpoint {
  id: string;
  method: HttpMethod;
  path: string;
  title: string;
  description?: string;
  group?: string;
  tags?: string[];
  requiresAuth?: boolean;
  delay?: number;
  params?: ApiKeyValue[];
  query?: ApiKeyValue[];
  headers?: ApiKeyValue[];
  requestBody?: unknown;
  response: {
    status: number;
    statusText?: string;
    headers?: Record<string, string>;
    body: unknown;
  };
}

export interface ApiExplorerProps {
  endpoints: ApiEndpoint[];
  baseUrl?: string;
  title?: string;
  className?: string;
  height?: number | string;
  defaultTheme?: "light" | "dark";
}

type Tab = "params" | "headers" | "auth" | "body";

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "bg-success-soft text-success",
  POST: "bg-primary/10 text-primary",
  PUT: "bg-warning-soft text-warning",
  PATCH: "bg-warning-soft text-warning",
  DELETE: "bg-danger-soft text-danger",
  HEAD: "bg-muted text-muted-foreground",
  OPTIONS: "bg-muted text-muted-foreground",
};

export function ApiExplorer({
  endpoints,
  baseUrl = "https://api.example.com/v1",
  title = "API Explorer",
  className,
  height = 680,
  defaultTheme = "dark",
}: ApiExplorerProps) {
  const [selectedId, setSelectedId] = useState(endpoints[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("params");
  const [auth, setAuth] = useState<AuthConfig>({ type: "none" });
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);
  const [result, setResult] = useState<{
    status: number;
    statusText: string;
    timeMs: number;
    json: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(
    () => endpoints.find((e) => e.id === selectedId) ?? endpoints[0],
    [endpoints, selectedId]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return endpoints;
    return endpoints.filter((e) =>
      (e.title + " " + e.method + " " + e.path).toLowerCase().includes(q)
    );
  }, [endpoints, query]);

  if (!selected) {
    return (
      <div
        className={cn("flex items-center justify-center rounded-xl border border-border bg-background p-10 text-sm text-muted-foreground", className)}
        style={{ height }}
      >
        No endpoints provided.
      </div>
    );
  }

  const filledPath = (selected.params ?? []).reduce(
    (acc, p) => acc.replace(":" + p.key, p.value || ":" + p.key),
    selected.path
  );
  const requestUrl = baseUrl.replace(/\\/$/, "") + filledPath;

  const send = () => {
    setSending(true);
    setError(null);
    const started = performance.now();
    const latency = selected.delay ?? 450;
    setTimeout(() => {
      try {
        const json = JSON.stringify(selected.response.body, null, 2);
        setResult({
          status: selected.response.status,
          statusText: selected.response.statusText ?? (selected.response.status < 400 ? "OK" : "Error"),
          timeMs: Math.round(performance.now() - started),
          json,
        });
      } catch {
        setError("Failed to serialize the mock response body.");
      } finally {
        setSending(false);
      }
    }, latency);
  };

  const curl =
    "curl -X " + selected.method + " '" + requestUrl + "'" +
    (auth.type === "bearer" && auth.token ? " -H 'Authorization: Bearer " + auth.token + "'" : "") +
    (body.trim() ? " -H 'Content-Type: application/json' -d '" + body.trim() + "'" : "");

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-card",
        theme === "dark" && "dark",
        className
      )}
      style={{ height }}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <p className="text-sm font-semibold">{title}</p>
        <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          {endpoints.length} endpoints
        </span>
        <span className="ml-auto hidden truncate font-mono text-[11px] text-muted-foreground sm:block">
          {baseUrl}
        </span>
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="rounded-md border border-border px-2 py-1 text-[11px] hover:bg-muted"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 lg:grid-cols-[280px_minmax(0,1fr)] lg:grid-rows-1">
        <div className="flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="p-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search endpoints…  ( / )"
              aria-label="Search endpoints"
              className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
            />
          </div>
          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto p-2 pt-0" role="listbox" aria-label="Endpoints">
            {visible.length === 0 && (
              <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                No endpoints match “{query}”.
              </p>
            )}
            {visible.map((e) => (
              <button
                key={e.id}
                type="button"
                role="option"
                aria-selected={e.id === selected.id}
                onClick={() => {
                  setSelectedId(e.id);
                  setResult(null);
                  setError(null);
                  setBody(
                    e.requestBody !== undefined ? JSON.stringify(e.requestBody, null, 2) : ""
                  );
                }}
                className={cn(
                  "mb-1 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left transition-colors",
                  e.id === selected.id ? "bg-muted" : "hover:bg-muted/60"
                )}
              >
                <span className={cn("rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold", METHOD_COLORS[e.method])}>
                  {e.method}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium">{e.title}</span>
                  <span className="block truncate font-mono text-[11px] text-muted-foreground">{e.path}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="flex items-center gap-2 border-b border-border p-2">
            <span className={cn("rounded-md px-2 py-1 font-mono text-xs font-bold", METHOD_COLORS[selected.method])}>
              {selected.method}
            </span>
            <code className="min-w-0 flex-1 truncate font-mono text-xs">{requestUrl}</code>
            <button
              type="button"
              disabled={sending}
              onClick={send}
              className="h-9 shrink-0 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send"}
            </button>
          </div>
          {selected.description && (
            <p className="border-b border-border px-3 py-1.5 text-xs text-muted-foreground">
              {selected.description}
            </p>
          )}

          <div className="flex gap-1 border-b border-border px-2 pt-1" role="tablist" aria-label="Request">
            {(["params", "headers", "auth", "body"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-t-lg px-3 py-1.5 text-xs font-medium capitalize",
                  tab === t ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="scrollbar-thin max-h-44 min-h-0 overflow-y-auto border-b border-border p-3">
            {tab === "params" && (
              (selected.params ?? []).length === 0 && (selected.query ?? []).length === 0 ? (
                <EmptyHint text="No path or query parameters for this endpoint." />
              ) : (
                <div className="flex flex-col gap-1.5">
                  {(selected.params ?? []).map((p) => (
                    <KeyRow key={"p-" + p.key} k={p.key} v={p.value} label="path" />
                  ))}
                  {(selected.query ?? []).map((p) => (
                    <KeyRow key={"q-" + p.key} k={p.key} v={p.value} label="query" />
                  ))}
                </div>
              )
            )}
            {tab === "headers" && (
              (selected.headers ?? []).length === 0 ? (
                <EmptyHint text="No default headers. Authorization headers are added from the Auth tab." />
              ) : (
                <div className="flex flex-col gap-1.5">
                  {(selected.headers ?? []).map((h) => (
                    <KeyRow key={h.key} k={h.key} v={h.value} label="header" />
                  ))}
                </div>
              )
            )}
            {tab === "auth" && (
              <div className="flex flex-col gap-2">
                <div className="flex gap-1.5">
                  {(["none", "bearer", "basic", "apiKey"] as AuthType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={auth.type === t}
                      onClick={() => setAuth({ type: t })}
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-[11px] font-medium",
                        auth.type === t ? "border-primary/40 bg-primary/10 text-primary" : "border-border text-muted-foreground"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {auth.type === "bearer" && (
                  <input
                    value={auth.token ?? ""}
                    onChange={(e) => setAuth({ ...auth, token: e.target.value })}
                    placeholder="Bearer token"
                    aria-label="Bearer token"
                    className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
                  />
                )}
                {auth.type === "basic" && (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={auth.username ?? ""}
                      onChange={(e) => setAuth({ ...auth, username: e.target.value })}
                      placeholder="Username"
                      aria-label="Basic auth username"
                      className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
                    />
                    <input
                      value={auth.password ?? ""}
                      onChange={(e) => setAuth({ ...auth, password: e.target.value })}
                      placeholder="Password"
                      type="password"
                      aria-label="Basic auth password"
                      className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
                    />
                  </div>
                )}
                {auth.type === "apiKey" && (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={auth.keyName ?? ""}
                      onChange={(e) => setAuth({ ...auth, keyName: e.target.value })}
                      placeholder="Key name"
                      aria-label="API key name"
                      className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
                    />
                    <input
                      value={auth.keyValue ?? ""}
                      onChange={(e) => setAuth({ ...auth, keyValue: e.target.value })}
                      placeholder="Key value"
                      aria-label="API key value"
                      className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
                    />
                  </div>
                )}
                {selected.requiresAuth && auth.type === "none" && (
                  <p className="text-xs text-warning">This endpoint requires authentication.</p>
                )}
              </div>
            )}
            {tab === "body" && (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={selected.method === "GET" ? "GET requests have no body." : "{ \\"key\\": \\"value\\" }"}
                aria-label="Request body"
                spellCheck={false}
                className="min-h-24 w-full rounded-lg border border-input bg-background p-2.5 font-mono text-xs outline-none placeholder:text-muted-foreground focus:border-ring"
              />
            )}
          </div>

          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Response
            </span>
            {result && (
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                  result.status < 300 ? "bg-success-soft text-success" : result.status < 500 ? "bg-warning-soft text-warning" : "bg-danger-soft text-danger"
                )}
              >
                {result.status} {result.statusText}
              </span>
            )}
            {result && (
              <span className="font-mono text-[10px] text-muted-foreground">{result.timeMs}ms</span>
            )}
            <span className="ml-auto hidden text-[10px] text-muted-foreground sm:block">
              Ctrl/Cmd + Enter to send
            </span>
          </div>
          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto bg-muted/30 p-3">
            {sending && (
              <div className="flex flex-col gap-2" aria-label="Loading response">
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            )}
            {!sending && error && (
              <p className="rounded-lg border border-danger/30 bg-danger-soft px-3 py-2 text-xs text-danger">
                {error}
              </p>
            )}
            {!sending && !error && !result && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Press Send to execute {selected.method} {selected.path}.
              </p>
            )}
            {!sending && result && (
              <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed">
                {result.json}
              </pre>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-border px-3 py-2">
            <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">
              {curl}
            </code>
            <button
              type="button"
              onClick={() => {
                try {
                  void navigator.clipboard.writeText(curl);
                } catch {
                  // clipboard unavailable
                }
              }}
              className="shrink-0 rounded-md border border-border px-2 py-1 text-[11px] hover:bg-muted"
            >
              Copy curl
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyRow({ k, v, label }: { k: string; v: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-14 shrink-0 uppercase tracking-wide text-muted-foreground">{label}</span>
      <code className="min-w-0 flex-1 truncate rounded-md border border-border bg-background px-2 py-1.5 font-mono">
        {k}: {v}
      </code>
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return <p className="py-4 text-center text-xs text-muted-foreground">{text}</p>;
}
`;
