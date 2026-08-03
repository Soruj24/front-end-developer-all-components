import * as React from "react";
import { cn } from "@/lib/cn";
import type { SelectProps } from "./Select.types";
import { SELECT_STYLES } from "./Select.constants";

export function Select({ variant = "default", size = "md", label, placeholder, options, error, helperText, className, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 block text-sm font-medium">{label}</label>}
      <select
        className={cn(
          SELECT_STYLES.base,
          SELECT_STYLES[size],
          SELECT_STYLES[variant],
          error && SELECT_STYLES.error,
          className,
        )}
        {...props}
      >
        {placeholder && <option value="" disabled hidden>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
}
