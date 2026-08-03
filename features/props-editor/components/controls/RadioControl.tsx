"use client";

import type { RadioField } from "../../types";
import type { ControlProps } from "./types";

/** Radio pill group. */
export function RadioControl({ field, value, onChange, onBegin, onEnd }: ControlProps) {
  const f = field as RadioField;
  return (
    <div
      className="flex flex-wrap gap-1.5"
      role="radiogroup"
      onFocus={onBegin}
      onBlur={onEnd}
    >
      {f.options.map((option) => {
        const active = String(value) === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`h-7 rounded-md px-2.5 text-xs font-medium transition-colors ${
              active
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted-foreground/15 hover:text-foreground"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
