"use client";

import { useState } from "react";
import { COLOR_SWATCHES } from "../../constants";
import type { ColorField } from "../../types";
import { INPUT_CLASS } from "./styles";
import type { ControlProps } from "./types";

/** Color picker: native input + preset swatches. */
export function ColorControl({ field, value, onChange, onBegin, onEnd }: ControlProps) {
  const f = field as ColorField;
  const [draft, setDraft] = useState<string | null>(null);
  const current = draft ?? String(value);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <label
          className="relative h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-md border border-input"
          style={{ backgroundColor: current }}
        >
          <input
            type="color"
            value={current}
            className="absolute inset-0 cursor-pointer opacity-0"
            onFocus={onBegin}
            onBlur={() => {
              setDraft(null);
              onEnd?.();
            }}
            onChange={(event) => {
              setDraft(event.target.value);
              onChange(event.target.value);
            }}
          />
        </label>
        <input
          type="text"
          className={INPUT_CLASS}
          value={current}
          spellCheck={false}
          onFocus={onBegin}
          onBlur={onEnd}
          onChange={(event) => {
            setDraft(event.target.value);
            onChange(event.target.value);
          }}
        />
      </div>
      {(!f.swatches || f.swatches.length > 0) && (
        <div className="flex flex-wrap gap-1">
          {(f.swatches && f.swatches.length > 0 ? f.swatches : COLOR_SWATCHES).map((color) => (
            <button
              key={color}
              type="button"
              aria-label={color}
              onClick={() => onChange(color)}
              className="h-5 w-5 rounded border border-input transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
