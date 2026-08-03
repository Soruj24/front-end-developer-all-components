"use client";

import { Switch } from "@/components/ui";
import type { ControlProps } from "./types";

/** Toggle switch for boolean fields. */
export function BooleanControl({ value, onChange, onBegin, onEnd }: ControlProps) {
  return (
    <Switch
      checked={Boolean(value)}
      onFocus={onBegin}
      onBlur={onEnd}
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}
