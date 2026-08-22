"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const CONTROLS = [
  { key: "background", label: "Background" },
  { key: "foreground", label: "Foreground" },
  { key: "card", label: "Card" },
  { key: "muted", label: "Muted" },
  { key: "primary", label: "Primary" },
  { key: "accent", label: "Accent" },
] as const;

type ThemeKey = (typeof CONTROLS)[number]["key"];

type Theme = Record<ThemeKey, string>;

const COLOR_INPUT_CLASSES = cn(
  "h-7 w-9 cursor-pointer appearance-none rounded-md border border-border bg-transparent p-0.5",
  "transition-shadow duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border-0",
  "[&::-moz-color-swatch]:rounded-sm [&::-moz-color-swatch]:border-0"
);

export function ThemeBuilderDemo() {
  const [theme, setTheme] = useState<Theme>({
    background: "#ffffff",
    foreground: "#09090b",
    card: "#ffffff",
    muted: "#f4f4f5",
    primary: "#18181b",
    accent: "#f4f4f5",
  });

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-5 shadow-card">
      <h3 className="text-sm font-semibold tracking-tight">Theme Builder</h3>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {CONTROLS.map((c) => (
          <div key={c.key} className="flex flex-col items-center gap-1.5">
            <div
              className="h-10 w-full rounded-lg border border-border shadow-xs transition-colors duration-300"
              style={{ backgroundColor: theme[c.key] }}
            />
            <span className="text-[10px] font-medium text-muted-foreground">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2.5">
        {CONTROLS.map((c) => (
          <div key={c.key} className="flex items-center gap-2.5">
            <label htmlFor={`droplet-theme-${c.key}`} className="w-16 text-[11px] font-medium text-muted-foreground">
              {c.label}
            </label>
            <input
              id={`droplet-theme-${c.key}`}
              type="color"
              value={theme[c.key]}
              onChange={(e) => setTheme({ ...theme, [c.key]: e.target.value })}
              className={COLOR_INPUT_CLASSES}
            />
            <span className="font-mono text-[11px] uppercase tabular-nums text-muted-foreground">{theme[c.key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
