"use client";

import { useState } from "react";
import { Eye, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { apertureData, formatEv } from "./aperture-data";

export function ExposureInfoDemo() {
  const [value, setValue] = useState(2);
  const data = apertureData[value];
  const shutterSpeed = "1/125";
  const iso = 400;

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-4 shadow-card sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold tracking-tight">Exposure Settings</span>
        <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success-soft px-2.5 py-0.5 text-[11px] font-medium text-success">
          <Eye className="h-3 w-3" aria-hidden="true" />
          Proper
        </span>
      </div>

      <div className="mb-4 flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/50 p-3">
        {[
          { label: "Aperture", value: data.fStop },
          { label: "Shutter", value: shutterSpeed },
          { label: "ISO", value: String(iso) },
        ].map(({ label, value: v }, i) => (
          <div key={label} className="flex flex-1 items-center justify-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-xs text-border">×</span>}
            <div className="text-center">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
              <div className="text-base font-bold tabular-nums">{v}</div>
            </div>
          </div>
        ))}
      </div>

      <div role="radiogroup" aria-label="Aperture" className="flex gap-1.5">
        {apertureData.map((stop, i) => (
          <button
            key={stop.fStop}
            type="button"
            role="radio"
            aria-checked={i === value}
            onClick={() => setValue(i)}
            className={cn(
              "flex-1 rounded-lg py-2 text-xs font-bold tabular-nums",
              "transition-all duration-150 ease-out active:scale-[0.95]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              i === value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-surface text-muted-foreground hover:border-input hover:text-foreground hover:shadow-xs"
            )}
          >
            {stop.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Sun className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        <span className="tabular-nums">EV Compensation: {formatEv(data.ev)}</span>
        <span className="ml-auto font-medium">{data.dof}</span>
      </div>
    </div>
  );
}
