"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { generateShades } from "./color-utils";

const COLOR_INPUT_CLASSES = cn(
  "h-8 w-10 cursor-pointer appearance-none rounded-lg border border-border bg-transparent p-0.5 shadow-xs",
  "transition-all duration-150 hover:border-input hover:shadow-sm",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0",
  "[&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0"
);

export function ColorPaletteDemo() {
  const [base, setBase] = useState("#3b82f6");
  const [copied, setCopied] = useState("");

  const shades = generateShades(base);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Color Palette</h3>
        <input
          type="color"
          value={base}
          aria-label="Base color"
          onChange={(e) => setBase(e.target.value)}
          className={COLOR_INPUT_CLASSES}
        />
      </div>
      <div className="mt-4 space-y-1">
        {shades.map((s) => (
          <button
            key={s.weight}
            type="button"
            onClick={() => copyColor(s.hex)}
            aria-label={`Copy shade ${s.weight} (${s.hex})`}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left",
              "transition-all duration-150 ease-out hover:bg-muted/60 active:scale-[0.99]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <span
              className="h-7 w-7 shrink-0 rounded-md border border-black/10 shadow-xs dark:border-white/15"
              style={{ backgroundColor: s.hex }}
            />
            <span className="w-9 text-xs font-semibold tabular-nums">{s.weight}</span>
            <span className="flex-1 font-mono text-xs uppercase tabular-nums text-muted-foreground">{s.hex}</span>
            {copied === s.hex && (
              <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[10px] font-medium text-success">
                <Check className="h-3 w-3" aria-hidden="true" />
                Copied
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
