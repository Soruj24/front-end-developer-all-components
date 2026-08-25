"use client";

import { cn } from "@/lib/cn";
import { CustomSelect } from "@/components/ui/Select/CustomSelect";
import type { SelectField } from "../../types";
import type { ControlProps } from "./types";

/** Dropdown select control. */
export function SelectControl({ field, value, onChange, onBegin, onEnd }: ControlProps) {
  const f = field as SelectField;
  return (
    <CustomSelect
      options={f.options.map((o) => ({ value: o.value, label: o.label }))}
      value={String(value)}
      onValueChange={(val) => onChange(val)}
      size="sm"
    />
  );
}
