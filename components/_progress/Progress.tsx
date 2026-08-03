import * as React from "react";
import { cn } from "@/lib/cn";
import type { ProgressProps } from "./Progress.types";
import { PROGRESS_STYLES } from "./Progress.constants";

export function Progress({ value = 0, max = 100, variant = "default", size = "md", label, animated = true, className }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="w-full">
      {label && <div className="mb-1 flex justify-between text-sm">{label}</div>}
      <div className={cn(PROGRESS_STYLES.base, PROGRESS_STYLES[size], PROGRESS_STYLES.bg, className)}>
        <div
          className={cn("h-full transition-all", PROGRESS_STYLES[variant])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
