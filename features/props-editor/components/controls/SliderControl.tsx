"use client";

import type { SliderField } from "../../types";
import type { ControlProps } from "./types";

/** Range slider with a live value readout. */
export function SliderControl({ field, value, onChange, onBegin, onEnd }: ControlProps) {
  const f = field as SliderField;
  const numeric = Number(value);
  const suffix = f.unit ?? "";
  const display = Number.isFinite(numeric) ? `${numeric}${suffix}` : "—";

  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-foreground"
        min={f.min}
        max={f.max}
        step={f.step}
        value={numeric}
        onFocus={onBegin}
        onBlur={onEnd}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="w-12 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
        {display}
      </span>
    </div>
  );
}
