"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { cn } from "@/lib/cn";
import { apertureData, formatEv } from "./aperture-data";

const blurValues = [12, 6, 3, 1.5, 0.5, 0.2, 0.1, 0, 0];

export function DepthOfFieldPreviewDemo() {
  const [selected, setSelected] = useState(2);
  const blur = blurValues[selected];
  const data = apertureData[selected];

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-5">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 shadow-card dark:from-sky-950 dark:via-blue-950 dark:to-indigo-950">
        <div
          className="absolute inset-0 flex items-center justify-center transition-[filter] duration-300 ease-out"
          style={{ filter: `blur(${blur}px)` }}
        >
          <Camera className="h-16 w-16 text-foreground/60" aria-hidden="true" />
        </div>
        <div className="absolute bottom-3 left-3 rounded-full border border-border bg-background/80 px-2.5 py-1 text-[11px] font-semibold tabular-nums shadow-xs backdrop-blur">
          {data.fStop} · {data.dof}
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label="Aperture"
        className="flex w-full max-w-md gap-1.5 overflow-x-auto p-1 scrollbar-thin"
      >
        {apertureData.map((stop, i) => (
          <button
            key={stop.fStop}
            type="button"
            role="radio"
            aria-checked={i === selected}
            onClick={() => setSelected(i)}
            className={cn(
              "flex h-8 min-w-8 flex-1 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold tabular-nums",
              "transition-all duration-150 ease-out active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              i === selected
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-border bg-surface text-muted-foreground hover:border-input hover:text-foreground hover:shadow-xs"
            )}
          >
            {stop.label}
          </button>
        ))}
      </div>

      <dl className="grid w-full grid-cols-3 gap-2 text-center">
        {[
          { label: "Blur", value: `${blur}px` },
          { label: "DoF", value: data.dof.split(" ")[0] },
          { label: "EV", value: formatEv(data.ev) },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-lg border border-border bg-surface px-2 py-2 shadow-xs">
            <dt className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
            <dd className="mt-0.5 text-sm font-bold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
