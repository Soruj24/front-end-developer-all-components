"use client";

import { useState } from "react";
import { Check, Palette } from "lucide-react";
import { PRESET_COLORS } from "./palette";

export function ColorPaletteDemo() {
  const [selected, setSelected] = useState("#3b82f6");

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div role="radiogroup" aria-label="Color palette" className="flex flex-wrap items-center gap-2">
        {PRESET_COLORS.map((c) => {
          const isSelected = selected === c;
          return (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Color ${c}`}
              onClick={() => setSelected(c)}
              style={{ backgroundColor: c }}
              className={`relative h-8 w-8 rounded-lg border border-black/10 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/20 ${
                isSelected ? "-translate-y-0.5 ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""
              }`}
            >
              {isSelected && <Check aria-hidden="true" className="absolute inset-0 m-auto h-4 w-4 text-white mix-blend-difference" />}
            </button>
          );
        })}
      </div>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Palette className="h-3.5 w-3.5" aria-hidden="true" />
        Selected color:
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[11px] font-medium text-foreground">{selected}</code>
      </p>
    </div>
  );
}
