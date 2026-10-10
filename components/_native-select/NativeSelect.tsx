import * as React from "react";
import { cn } from "@/lib/cn";
import { CustomSelect } from "../ui/Select/CustomSelect";
import type { NativeSelectProps } from "./NativeSelect.types";

export function NativeSelect({
  size = "md",
  label,
  helperText,
  error,
  className,
  children,
  value,
  defaultValue,
  ...props
}: NativeSelectProps) {
  const options: { value: string; label: string; disabled?: boolean }[] = [];

  if (children && Array.isArray(children)) {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === "option") {
        const optProps = child.props as { value?: string; children?: React.ReactNode; disabled?: boolean };
        if (optProps.value !== undefined) {
          options.push({
            value: optProps.value,
            label: String(optProps.children ?? ""),
            disabled: optProps.disabled,
          });
        }
      }
    });
  }

  return (
    <CustomSelect
      options={options}
      label={label as string}
      error={error ? " " : undefined}
      helperText={helperText as string}
      size={size}
      value={
        value === undefined ? undefined : Array.isArray(value) ? value[0] : String(value)
      }
      defaultValue={
        defaultValue === undefined
          ? undefined
          : Array.isArray(defaultValue)
            ? defaultValue[0]
            : String(defaultValue)
      }
      className={cn(
        error && "border-destructive",
        className,
      )}
      {...props}
    />
  );
}
