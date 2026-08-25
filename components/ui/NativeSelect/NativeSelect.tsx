"use client";

import { cn } from "@/lib/cn";
import { CustomSelect } from "../Select/CustomSelect";
import type { NativeSelectProps } from "./NativeSelect.types";

export function NativeSelect({
  value,
  onValueChange,
  options,
  placeholder,
  disabled = false,
  className,
}: NativeSelectProps) {
  return (
    <CustomSelect
      options={options.map((o) => ({ value: o.value, label: o.label, disabled: o.disabled }))}
      value={value}
      onValueChange={onValueChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  );
}
