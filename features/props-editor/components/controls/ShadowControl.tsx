"use client";

import { SHADOW_PRESETS, getShadowPreset } from "../../constants";
import type { ShadowField } from "../../types";
import type { ControlProps } from "./types";

/** Shadow preset picker with live swatch previews. */
export function ShadowControl({ field, value, onChange, onBegin, onEnd }: ControlProps) {
  const f = field as ShadowField;
  const current = String(value);

  return (
    <div
      className="grid grid-cols-2 gap-1.5"
      role="radiogroup"
      onFocus={onBegin}
      onBlur={onEnd}
    >
      {SHADOW_PRESETS.map((preset) => {
        if (f.presets && !f.presets.includes(preset.id)) return null;
        const active = preset.id === current;
        return (
          <button
            key={preset.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(preset.id)}
            className={`rounded-md border p-1.5 text-left transition-colors ${
              active
                ? "border-ring bg-muted"
                : "border-input bg-background hover:border-ring/50"
            }`}
          >
            <div
              className="h-6 rounded bg-background"
              style={{ boxShadow: getShadowPreset(preset.id).css }}
            />
            <span className="mt-1 block text-[11px] capitalize text-muted-foreground">
              {preset.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
