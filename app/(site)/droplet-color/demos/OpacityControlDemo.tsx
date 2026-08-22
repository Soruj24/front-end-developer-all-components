"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { CHECKER_BACKGROUND } from "./color-utils";

export function OpacityControlDemo() {
  const [color, setColor] = useState("#3b82f6");
  const [opacity, setOpacity] = useState(100);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-20 w-44 overflow-hidden rounded-xl border border-border shadow-card">
        <div className="absolute inset-0" style={{ backgroundImage: CHECKER_BACKGROUND }} />
        <div
          className="absolute inset-0 transition-opacity duration-200"
          style={{ backgroundColor: color, opacity: opacity / 100 }}
        />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <input
          type="color"
          value={color}
          aria-label="Color"
          onChange={(e) => setColor(e.target.value)}
          className={cn(
            "h-8 w-10 cursor-pointer appearance-none rounded-lg border border-border bg-transparent p-0.5 shadow-xs",
            "transition-all duration-150 hover:border-input hover:shadow-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0",
            "[&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0"
          )}
        />
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={opacity}
          aria-label="Opacity"
          onChange={(e) => setOpacity(Number(e.target.value))}
          style={{ background: `linear-gradient(to right, var(--primary) ${opacity}%, var(--muted) ${opacity}%)` }}
          className={cn(
            "h-2 w-36 cursor-pointer appearance-none rounded-full outline-none",
            "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-surface [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        />
        <span className="w-11 text-right font-mono text-xs tabular-nums text-muted-foreground">{opacity}%</span>
      </div>
      <div className="rounded-full border border-border bg-muted/50 px-3.5 py-1">
        <p className="font-mono text-[11px] uppercase tabular-nums text-muted-foreground">
          {color} · {opacity}%
        </p>
      </div>
    </div>
  );
}
