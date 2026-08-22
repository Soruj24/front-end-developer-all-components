"use client";

import { useState } from "react";
import { Aperture } from "lucide-react";
import { cn } from "@/lib/cn";
import { apertureData, formatEv } from "./aperture-data";

export function SliderPickerDemo() {
  const [value, setValue] = useState(2);
  const data = apertureData[value];
  const pct = (value / (apertureData.length - 1)) * 100;

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold tracking-tight text-foreground">Aperture</div>
          <div className="mt-0.5 text-xs text-muted-foreground">Controls depth of field</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold tracking-tight tabular-nums">{data.fStop}</div>
          <div className="text-[11px] font-medium tabular-nums text-primary">EV {formatEv(data.ev)}</div>
        </div>
      </div>

      <div className="mt-5">
        <input
          type="range"
          min={0}
          max={apertureData.length - 1}
          step={1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Aperture"
          aria-valuetext={`${data.fStop}, ${data.dof} depth of field`}
          style={{ background: `linear-gradient(to right, var(--primary) ${pct}%, var(--muted) ${pct}%)` }}
          className={cn(
            "h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none",
            "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary",
            "[&::-webkit-slider-thumb]:bg-surface [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform",
            "[&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-surface"
          )}
        />
        <div role="radiogroup" aria-label="Aperture stops" className="mt-2 flex justify-between">
          {apertureData.map((stop, i) => (
            <button
              key={stop.fStop}
              type="button"
              role="radio"
              aria-checked={i === value}
              onClick={() => setValue(i)}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-semibold tabular-nums",
                "transition-all duration-150 ease-out active:scale-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                i === value
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground/70 hover:bg-muted hover:text-foreground"
              )}
            >
              {stop.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface shadow-xs">
          <Aperture className="h-4 w-4 text-primary" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold text-foreground">{data.dof} Depth of Field</div>
          <div className="mt-0.5 truncate text-[11px] text-muted-foreground">Best for: {data.bestFor}</div>
        </div>
      </div>
    </div>
  );
}
