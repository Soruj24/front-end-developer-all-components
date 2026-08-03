import * as React from "react";
import { cn } from "@/lib/cn";
import type { TextareaProps } from "./Textarea.types";
import { TEXTAREA_STYLES } from "./Textarea.constants";

export function Textarea({ variant = "default", size = "md", error, label, helperText, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && <label className="mb-1 block text-sm font-medium">{label}</label>}
      <textarea
        className={cn(
          TEXTAREA_STYLES.base,
          TEXTAREA_STYLES[size],
          TEXTAREA_STYLES[variant],
          error && TEXTAREA_STYLES.error,
          className,
        )}
        {...props}
      />
      {helperText && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
    </div>
  );
}
