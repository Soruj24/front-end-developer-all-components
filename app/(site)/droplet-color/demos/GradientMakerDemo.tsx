"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/cn";

const COLOR_INPUT_CLASSES = cn(
  "h-9 w-9 cursor-pointer appearance-none rounded-lg border border-border bg-transparent p-0.5 shadow-xs",
  "transition-all duration-150 hover:border-input hover:shadow-sm",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0",
  "[&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0"
);

export function GradientMakerDemo() {
  const [colors, setColors] = useState(["#3b82f6", "#8b5cf6"]);
  const [angle, setAngle] = useState(135);

  const addColor = () => {
    if (colors.length < 4) setColors([...colors, "#ec4899"]);
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) setColors(colors.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-card">
      <h3 className="text-sm font-semibold tracking-tight">Gradient Maker</h3>
      <div
        className="mt-4 h-24 rounded-xl border border-border shadow-xs transition-[background] duration-300"
        style={{ background: `linear-gradient(${angle}deg, ${colors.join(", ")})` }}
      />
      <div className="mt-4 flex items-center gap-3">
        <label htmlFor="droplet-gradient-angle" className="text-xs font-medium text-muted-foreground">
          Angle
        </label>
        <input
          id="droplet-gradient-angle"
          type="range"
          min={0}
          max={360}
          step={1}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          aria-label="Gradient angle"
          style={{ background: "linear-gradient(to right, var(--muted), var(--primary))" }}
          className={cn(
            "h-2 flex-1 cursor-pointer appearance-none rounded-full outline-none",
            "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-surface [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        />
        <span className="w-10 text-right font-mono text-xs tabular-nums text-muted-foreground">{angle}°</span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        {colors.map((c, i) => (
          <div key={`${c}-${i}`} className="flex items-center gap-1">
            <input
              type="color"
              value={c}
              aria-label={`Gradient stop ${i + 1}`}
              onChange={(e) => {
                const newColors = [...colors];
                newColors[i] = e.target.value;
                setColors(newColors);
              }}
              className={COLOR_INPUT_CLASSES}
            />
            {colors.length > 2 && (
              <button
                type="button"
                onClick={() => removeColor(i)}
                aria-label={`Remove gradient stop ${i + 1}`}
                className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-all duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            )}
          </div>
        ))}
        {colors.length < 4 && (
          <button
            type="button"
            onClick={addColor}
            aria-label="Add gradient stop"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground transition-all duration-150 ease-out hover:border-input hover:bg-muted hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="mt-4 truncate rounded-lg border border-border bg-muted/50 px-3 py-2">
        <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
          linear-gradient({angle}deg, {colors.join(", ")})
        </p>
      </div>
    </div>
  );
}
