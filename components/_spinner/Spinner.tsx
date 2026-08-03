import * as React from "react";
import { cn } from "@/lib/cn";
import type { SpinnerProps } from "./Spinner.types";
import { SPINNER_STYLES } from "./Spinner.constants";

export function Spinner({ variant = "default", size = "md", label, className, ...props }: SpinnerProps) {
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div
        className={cn(
          SPINNER_STYLES.base,
          SPINNER_STYLES[size],
          SPINNER_STYLES[variant],
          "border-t-current",
          className,
        )}
        {...props}
      />
      {label && <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>}
    </div>
  );
}
