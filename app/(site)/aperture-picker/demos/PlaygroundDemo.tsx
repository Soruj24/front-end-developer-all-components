"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";
import { WheelPickerDemo } from "./WheelPickerDemo";
import { SliderPickerDemo } from "./SliderPickerDemo";
import { GridPickerDemo } from "./GridPickerDemo";

const MODES = [
  { id: "wheel", label: "Wheel", hint: "Radio group: use ← → ↑ ↓, Home and End to move the needle." },
  { id: "slider", label: "Slider", hint: "Native range input: drag, click a stop, or use arrow keys." },
  { id: "grid", label: "Grid", hint: "Card grid: Tab through cards, Enter or Space to select." },
] as const;

type ModeId = (typeof MODES)[number]["id"];

export function PlaygroundDemo() {
  const [mode, setMode] = useState<ModeId>("wheel");
  const [resetKey, setResetKey] = useState(0);
  const active = MODES.find((m) => m.id === mode)!;

  return (
    <div className="flex w-full max-w-lg flex-col gap-5 rounded-xl border border-border bg-surface p-4 shadow-card sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div role="radiogroup" aria-label="Picker mode" className="flex gap-1 rounded-lg bg-muted/70 p-1">
          {MODES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={mode === id}
              onClick={() => setMode(id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold",
                "transition-all duration-150 ease-out active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                mode === id ? "bg-surface text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:text-foreground"
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

      <div
        key={resetKey}
        className="flex min-h-[26rem] items-center justify-center rounded-lg border border-dashed border-border bg-background/60 p-4 sm:p-6"
      >
        {mode === "wheel" && <WheelPickerDemo />}
        {mode === "slider" && <SliderPickerDemo />}
        {mode === "grid" && <GridPickerDemo />}
      </div>

      <p className="text-center text-xs text-muted-foreground">{active.hint}</p>
    </div>
  );
}
