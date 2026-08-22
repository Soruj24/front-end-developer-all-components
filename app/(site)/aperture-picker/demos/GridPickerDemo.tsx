"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { apertureData } from "./aperture-data";

export function GridPickerDemo() {
  const [selected, setSelected] = useState(2);

  return (
    <div role="radiogroup" aria-label="Aperture" className="grid w-full max-w-md grid-cols-3 gap-3">
      {apertureData.map((stop, i) => {
        const circleSize = 34 - i * 2.5;
        const selectedCard = i === selected;
        return (
          <button
            key={stop.fStop}
            type="button"
            role="radio"
            aria-checked={selectedCard}
            onClick={() => setSelected(i)}
            className={cn(
              "flex flex-col items-center gap-2.5 rounded-xl border p-4",
              "transition-all duration-200 ease-out active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              selectedCard
                ? "border-primary/30 bg-primary/5 shadow-sm"
                : "border-border bg-surface shadow-xs hover:border-input hover:shadow-sm"
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center">
              <div
                style={{ width: circleSize, height: circleSize }}
                className={cn(
                  "rounded-full border-2 transition-colors duration-200",
                  selectedCard ? "border-primary bg-primary/10" : "border-muted-foreground/30"
                )}
              />
            </div>
            <div className="text-center">
              <div className={cn("text-xs font-bold tabular-nums", !selectedCard && "text-muted-foreground")}>
                {stop.fStop}
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground/80">{stop.dof}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
