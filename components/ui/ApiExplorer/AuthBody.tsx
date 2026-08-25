"use client";

import { InlineSelect } from "@/components/ui/InlineSelect";
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
        <InlineSelect
          options={[
            { value: "none", label: "No Auth" },
            { value: "bearer", label: "Bearer Token" },
            { value: "basic", label: "Basic Auth" },
            { value: "apiKey", label: "API Key" },
          ]}
          value={auth.type}
          onChange={(val) => setAuth((prev) => ({ ...prev, type: val as RequestTabPanelProps["auth"]["type"] }))}
          size="sm"
        />
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
            className="h-8 rounded-md border border-border bg-background px-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
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
              className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
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
              className="h-8 rounded-md border border-border bg-background px-2 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
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
              className="h-8 rounded-md border border-border bg-background px-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
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
              className="h-8 rounded-md border border-border bg-background px-2 font-mono text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </label>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
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
          <InlineSelect
            options={[
              { value: "application/json", label: "application/json" },
              { value: "application/x-www-form-urlencoded", label: "x-www-form-urlencoded" },
              { value: "text/plain", label: "text/plain" },
            ]}
            value={contentType}
            onChange={(val) => setContentType(val)}
            size="xs"
          />
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
          className="rounded-md px-1.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10"
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
          className="scrollbar-thin h-40 resize-none rounded-lg border border-border bg-background p-3 font-mono text-xs leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
        />
      ) : (
        <p className="text-xs text-muted-foreground">{method} requests do not support a body.</p>
      )}
    </div>
  );
}
