"use client";

import type { SelectField } from "../../types";
import { INPUT_CLASS } from "./styles";
import type { ControlProps } from "./types";

/** Dropdown select control. */
export function SelectControl({ field, value, onChange, onBegin, onEnd }: ControlProps) {
  const f = field as SelectField;
  return (
    <select
      className={INPUT_CLASS}
      value={String(value)}
      onFocus={onBegin}
      onBlur={onEnd}
      onChange={(event) => onChange(event.target.value)}
    >
      {f.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
