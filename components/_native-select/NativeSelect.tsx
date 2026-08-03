import * as React from "react";
import { cn } from "@/lib/cn";
import type { NativeSelectProps } from "./NativeSelect.types";
import { NATIVE_SELECT_STYLES } from "./NativeSelect.constants";

export function NativeSelect({ size = "md", label, helperText, error, className, children, ...props }: NativeSelectProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 block text-sm font-medium">{label}</label>}
      <select
        className={cn(
          NATIVE_SELECT_STYLES.base,
          NATIVE_SELECT_STYLES[size],
          "border-gray-300 dark:border-gray-600",
          error && "border-red-500 focus:ring-red-500",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {helperText && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
}
