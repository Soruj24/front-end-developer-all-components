import * as React from "react";
import { cn } from "@/lib/cn";
import { CustomSelect } from "../ui/Select/CustomSelect";
import type { SelectProps } from "./Select.types";

export function Select({
  variant = "default",
  size = "md",
  label,
  placeholder,
  options,
  error,
  helperText,
  className,
  value,
  defaultValue,
  ...props
}: SelectProps) {
  const normalizedValue =
    value === undefined ? undefined : Array.isArray(value) ? value[0] : String(value);
  const normalizedDefaultValue =
    defaultValue === undefined
      ? undefined
      : Array.isArray(defaultValue)
        ? defaultValue[0]
        : String(defaultValue);
  return (
    <CustomSelect
      options={options.map((o) => ({
        value: o.value,
        label: o.label,
        disabled: o.disabled,
      }))}
      placeholder={placeholder}
      label={label as string}
      error={error ? " " : undefined}
      helperText={helperText as string}
      size={size}
      value={normalizedValue}
      defaultValue={normalizedDefaultValue}
      className={cn(
        variant === "outline" && "border-2",
        className,
      )}
      {...props}
    />
  );
}
