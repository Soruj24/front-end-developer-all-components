"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ApiMode } from "./api-types";

interface ApiModeSwitchProps {
  mode: ApiMode;
  onModeChange: (mode: ApiMode) => void;
  baseUrl: string;
  onBaseUrlChange: (url: string) => void;
  defaultBaseUrl: string;
  resource: string;
}

/**
 * Mock / Real switch for API-driven doc examples. Real mode requires an
 * explicit endpoint — without one it shows a configuration hint instead of
 * silently serving mock data.
 */
export function ApiModeSwitch({
  mode,
  onModeChange,
  baseUrl,
  onBaseUrlChange,
  defaultBaseUrl,
  resource,
}: ApiModeSwitchProps) {
  const [editing, setEditing] = useState(false);
  const needsConfig = mode === "real" && !baseUrl.trim();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <div role="group" aria-label={`${resource} data source`} className="inline-flex rounded-lg border border-border bg-muted/40 p-0.5">
          {(["mock", "real"] as ApiMode[]).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => onModeChange(value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                mode === value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {value === "mock" ? "Mock API" : "Real API"}
            </button>
          ))}
        </div>
        <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
          {mode === "mock" ? "local · no network" : baseUrl.trim() || "no endpoint"}
        </span>
        {mode === "real" && (
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            aria-expanded={editing}
            className="text-xs font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {editing ? "Hide endpoint" : "Configure endpoint"}
          </button>
        )}
      </div>

      {mode === "real" && editing && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${resource}-base-url`} className="text-xs font-medium text-foreground">
            API base URL
          </label>
          <div className="flex gap-2">
            <input
              id={`${resource}-base-url`}
              type="url"
              inputMode="url"
              value={baseUrl}
              placeholder={defaultBaseUrl}
              onChange={(e) => onBaseUrlChange(e.target.value)}
              className="h-9 min-w-0 flex-1 rounded-md border border-border bg-background px-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="button"
              onClick={() => onBaseUrlChange(defaultBaseUrl)}
              className="shrink-0 rounded-md border border-border px-3 text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Use demo API
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Public demo: <code className="font-mono">{defaultBaseUrl}</code> (no key needed).
            For private APIs, keep tokens server-side — see the proxy note below.
          </p>
        </div>
      )}

      {needsConfig && (
        <p role="alert" className="rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-xs text-foreground">
          Enter an API base URL to load real {resource}. Nothing is fetched until you configure one —
          mock data is never shown as real results.
        </p>
      )}
    </div>
  );
}
