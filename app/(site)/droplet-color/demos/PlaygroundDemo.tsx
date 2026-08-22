"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { DropletColor } from "./DropletColor";
import { hexToRgb } from "./color-utils";

const COMPACT_PRESETS = ["#ef4444", "#22c55e", "#3b82f6", "#eab308"];

export function PlaygroundDemo() {
  const [value, setValue] = useState("#3b82f6");
  const [compact, setCompact] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const { r, g, b } = hexToRgb(value);

  return (
    <div className="flex w-full max-w-lg flex-col gap-5 rounded-xl border border-border bg-surface p-4 shadow-card sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div role="radiogroup" aria-label="Preset layout" className="flex gap-1 rounded-lg bg-muted/70 p-1">
          {[
            { id: false, label: "8 swatches" },
            { id: true, label: "4 swatches" },
          ].map(({ id, label }) => (
            <button
              key={label}
              type="button"
              role="radio"
              aria-checked={compact === id}
              onClick={() => setCompact(id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold",
                "transition-all duration-150 ease-out active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                compact === id
                  ? "bg-surface text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setResetKey((k) => k + 1)}
          aria-label="Reset playground"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-all duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex min-h-64 flex-col items-center justify-center gap-6 rounded-lg border border-dashed border-border bg-background/60 p-4 sm:p-6">
        <DropletColor key={resetKey} value={value} onChange={setValue} presets={compact ? COMPACT_PRESETS : undefined} />
        <dl className="grid w-full max-w-xs grid-cols-2 gap-2 text-center">
          <div className="rounded-lg border border-border px-2 py-2 shadow-xs">
            <dt className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">HEX</dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold uppercase tabular-nums">{value}</dd>
          </div>
          <div className="rounded-lg border border-border px-2 py-2 shadow-xs">
            <dt className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">RGB</dt>
            <dd className="mt-0.5 font-mono text-sm font-semibold tabular-nums">{r}, {g}, {b}</dd>
          </div>
        </dl>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Radio group: use ← → ↑ ↓, Home and End to move between preset swatches.
      </p>
    </div>
  );
}
