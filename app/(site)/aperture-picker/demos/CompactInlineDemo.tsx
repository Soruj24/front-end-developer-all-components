"use client";

import { useState } from "react";
import { Aperture, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { apertureData } from "./aperture-data";

export function CompactInlineDemo() {
  const [value, setValue] = useState(2);
  const data = apertureData[value];

  const stepperButton = cn(
    "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground",
    "transition-all duration-150 ease-out hover:bg-surface hover:text-foreground hover:shadow-xs active:scale-90",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-40"
  );

  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-border bg-surface px-3.5 py-2.5 shadow-card">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/60">
        <Aperture className="h-4 w-4 text-primary" aria-hidden="true" />
      </span>
      <span className="text-xs font-medium text-muted-foreground">Aperture</span>
      <div className="ml-auto flex items-center gap-1 rounded-lg bg-muted/70 p-1">
        <button
          type="button"
          aria-label="Decrease aperture"
          disabled={value === 0}
          onClick={() => setValue(Math.max(0, value - 1))}
          className={stepperButton}
        >
          <Minus className="h-3 w-3" aria-hidden="true" />
        </button>
        <span className="w-14 text-center text-sm font-bold tabular-nums">{data.fStop}</span>
        <button
          type="button"
          aria-label="Increase aperture"
          disabled={value === apertureData.length - 1}
          onClick={() => setValue(Math.min(apertureData.length - 1, value + 1))}
          className={stepperButton}
        >
          <Plus className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
