"use client";

import type { TextField } from "../../types";
import { INPUT_CLASS } from "./styles";
import type { ControlProps } from "./types";

/** Single-line text input. */
export function TextControl({ field, value, onChange, onBegin, onEnd }: ControlProps) {
  const f = field as TextField;
  return (
    <input
      type="text"
      className={INPUT_CLASS}
      value={String(value)}
      placeholder={f.placeholder}
      onFocus={onBegin}
      onBlur={onEnd}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
