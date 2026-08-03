"use client";

import type { NumberField } from "../../types";
import type { ControlProps } from "./types";

function clamp(value: number, min?: number, max?: number): number {
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
}

/** Number input with optional unit suffix. */
export function NumberControl({ field, value, onChange, onBegin, onEnd }: ControlProps) {
  const f = field as NumberField;
  return (
    <div className="flex h-8 items-stretch overflow-hidden rounded-md border border-input bg-background focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
      <input
        type="number"
        className="h-full w-full min-w-0 bg-transparent px-2 text-sm text-foreground focus:outline-none"
        value={String(value)}
        min={f.min}
        max={f.max}
        step={f.step}
        onFocus={onBegin}
        onBlur={onEnd}
        onChange={(event) => {
          const parsed = Number(event.target.value);
          onChange(Number.isFinite(parsed) ? clamp(parsed, f.min, f.max) : 0);
        }}
      />
      {f.unit && (
        <span className="flex items-center border-l border-input bg-muted/40 px-2 text-xs text-muted-foreground">
          {f.unit}
        </span>
      )}
    </div>
  );
}
