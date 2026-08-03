"use client";

import type { WidthHeightValue } from "../../types";
import { INPUT_CLASS } from "./styles";
import type { ControlProps } from "./types";

const UNITS = ["px", "rem", "%"] as const;

function toSize(value: unknown, fallback: WidthHeightValue): WidthHeightValue {
  return typeof value === "object" && value !== null
    ? (value as WidthHeightValue)
    : fallback;
}

/** Width/height: auto toggle + value + unit selector. */
export function WidthHeightControl({ value, onChange, onBegin, onEnd }: ControlProps) {
  const size = toSize(value, { auto: true, value: 320, unit: "px" });

  return (
    <div
      className="flex items-center gap-2"
      onFocus={onBegin}
      onBlur={onEnd}
    >
      <label className="flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground">
        <input
          type="checkbox"
          className="accent-foreground"
          checked={size.auto}
          onChange={(event) => onChange({ ...size, auto: event.target.checked })}
        />
        Auto
      </label>
      <input
        type="number"
        className={INPUT_CLASS}
        disabled={size.auto}
        value={size.value}
        onChange={(event) =>
          onChange({ ...size, value: Number(event.target.value) || 0 })
        }
      />
      <select
        className={INPUT_CLASS}
        disabled={size.auto}
        value={size.unit}
        onChange={(event) =>
          onChange({ ...size, unit: event.target.value as WidthHeightValue["unit"] })
        }
      >
        {UNITS.map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </select>
    </div>
  );
}
