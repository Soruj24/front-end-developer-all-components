"use client";

import { METHOD_ALLOWS_BODY } from "./constants";
import { prettyJson } from "./utils";
import type { RequestTabPanelProps } from "./types";

export function AuthTab({ auth, setAuth }: RequestTabPanelProps) {
  return (
    <div className="flex max-w-xl flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Auth type
        </span>
        <select
          value={auth.type}
          onChange={(e) => setAuth((prev) => ({ ...prev, type: e.target.value as RequestTabPanelProps["auth"]["type"] }))}
          className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground outline-none transition-colors focus:border-primary"
        >
          <option value="none">No Auth</option>
          <option value="bearer">Bearer Token</option>
          <option value="basic">Basic Auth</option>
          <option value="apiKey">API Key</option>
        </select>
      </label>

      {auth.type === "bearer" && (
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Token
          </span>
          <input
            value={auth.token ?? ""}
            onChange={(e) => setAuth((prev) => ({ ...prev, token: e.target.value }))}
            placeholder="eyJhbGciOiJIUzI1NiIs..."
            className="h-8 rounded-md border border-border bg-background px-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-subtle focus:border-primary"
          />
        </label>
      )}

      {auth.type === "basic" && (
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Username
            </span>
            <input
              value={auth.username ?? ""}
              onChange={(e) => setAuth((prev) => ({ ...prev, username: e.target.value }))}
              placeholder="admin"
              className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground outline-none transition-colors placeholder:text-subtle focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Password
            </span>
            <input
              type="password"
              value={auth.password ?? ""}
              onChange={(e) => setAuth((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
              className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground outline-none transition-colors placeholder:text-subtle focus:border-primary"
            />
          </label>
        </div>
      )}

      {auth.type === "apiKey" && (
        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Key name
            </span>
            <input
              value={auth.keyName ?? ""}
              onChange={(e) => setAuth((prev) => ({ ...prev, keyName: e.target.value }))}
              placeholder="X-API-Key"
              className="h-8 rounded-md border border-border bg-background px-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-subtle focus:border-primary"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Key value
            </span>
            <input
              value={auth.keyValue ?? ""}
              onChange={(e) => setAuth((prev) => ({ ...prev, keyValue: e.target.value }))}
              placeholder="sk_live_..."
              className="h-8 rounded-md border border-border bg-background px-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-subtle focus:border-primary"
            />
          </label>
        </div>
      )}

      <p className="text-xs text-subtle">
        Authorization is injected into the request and shown in the Headers tab.
      </p>
    </div>
  );
}

export function BodyTab({ method, body, contentType, setBody, setContentType }: RequestTabPanelProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Body
          </span>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="h-7 rounded-md border border-border bg-background px-2 font-mono text-[11px] text-muted-foreground outline-none focus:border-primary"
          >
            <option value="application/json">application/json</option>
            <option value="application/x-www-form-urlencoded">x-www-form-urlencoded</option>
            <option value="text/plain">text/plain</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => {
            try {
              setBody(prettyJson(JSON.parse(body)));
            } catch {
              setBody(body);
            }
          }}
          className="rounded-md px-1.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary-soft"
        >
          Format JSON
        </button>
      </div>
      {METHOD_ALLOWS_BODY.has(method) ? (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          spellCheck={false}
          aria-label="Request body"
          placeholder={'{\n  "name": "Ada"\n}'}
          className="scrollbar-thin h-40 resize-none rounded-lg border border-border bg-background p-3 font-mono text-xs leading-relaxed text-foreground outline-none transition-colors placeholder:text-subtle focus:border-primary"
        />
      ) : (
        <p className="text-xs text-subtle">{method} requests do not support a body.</p>
      )}
    </div>
  );
}
