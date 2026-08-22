"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { apertureData, dofIndex, DOF_LEVELS, formatEv } from "./aperture-data";

export interface AperturePickerProps {
  defaultValue?: number;
}

const stopAngle = (i: number) => (i / (apertureData.length - 1)) * 270 - 135;

export function AperturePicker({ defaultValue = 2 }: AperturePickerProps) {
  const [value, setValue] = useState(defaultValue);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const stopRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const data = apertureData[value];
  const angle = stopAngle(value);

  const selectStop = (index: number) => {
    setValue(index);
    stopRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = apertureData.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next = Math.min(last, index + 1);
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = Math.max(0, index - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    selectStop(next);
  };

  return (
    <div className="flex w-fit max-w-full flex-col items-center gap-7">
      <div role="radiogroup" aria-label="Aperture" className="relative h-60 w-60">
        <div aria-hidden="true" className="absolute inset-0 rounded-full border border-border bg-surface shadow-sm" />
        <div aria-hidden="true" className="absolute inset-[9%] rounded-full border border-dashed border-border/70" />
        <div aria-hidden="true" className="absolute inset-[26%] rounded-full bg-background" />
        {apertureData.map((stop, i) => {
          const rad = (stopAngle(i) * Math.PI) / 180;
          const selected = i === value;
          return (
            <button
              key={stop.fStop}
              ref={(el) => {
                stopRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectStop(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              style={{ left: `${50 + 40 * Math.cos(rad)}%`, top: `${50 + 40 * Math.sin(rad)}%` }}
              className={cn(
                "absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center",
                "rounded-full border text-xs font-semibold tabular-nums shadow-xs",
                "transition-all duration-200 ease-out active:scale-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                selected
                  ? "scale-110 border-primary/30 bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-surface text-muted-foreground hover:border-input hover:text-foreground hover:shadow-sm"
              )}
            >
              {stop.label}
            </button>
          );
        })}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[36%] w-[3px] rounded-full bg-gradient-to-t from-primary via-primary to-primary/25 shadow-xs transition-transform duration-500 ease-spring"
          style={{
            transform: `translateX(-50%) translateY(-100%) rotate(${angle}deg)`,
            transformOrigin: "bottom center",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-20 flex h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Aperture</span>
        <span className="text-3xl font-bold tracking-tight tabular-nums">{data.fStop}</span>
        <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {data.dof} depth of field
        </span>
      </div>

      <button
        type="button"
        onClick={() => setDetailsOpen((open) => !open)}
        aria-expanded={detailsOpen}
        aria-controls="aperture-details"
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-all duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Exposure details
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-300 ease-out",
            detailsOpen && "rotate-180"
          )}
        />
      </button>

      <div
        id="aperture-details"
        className={cn(
          "grid transition-all duration-300 ease-out",
          detailsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex min-w-64 flex-col gap-2.5 rounded-xl border border-border bg-surface p-3 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Exposure value</span>
              <span className="font-semibold tabular-nums">{formatEv(data.ev)} EV</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="shrink-0 text-muted-foreground">Depth of field</span>
              <span className="flex items-end gap-1">
                {DOF_LEVELS.map((level, i) => (
                  <span
                    key={level}
                    style={{ height: `${8 + i * 2}px` }}
                    className={cn(
                      "w-1.5 rounded-full transition-colors duration-300",
                      i <= dofIndex(data.dof) ? "bg-primary" : "bg-border"
                    )}
                  />
                ))}
                <span className="ml-1.5 font-semibold">{data.dof}</span>
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="shrink-0 text-muted-foreground">Best for</span>
              <span className="text-right font-semibold">{data.bestFor}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
