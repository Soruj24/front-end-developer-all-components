"use client";

import { cn } from "@/lib/cn";
import type { ProgressProps } from "./Progress.types";

export function Progress({
  value = 0,
  max = 100,
  label,
  showValue = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full space-y-1", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>}
          {showValue && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className="h-full rounded-full bg-zinc-900 transition-all duration-300 ease-in-out dark:bg-zinc-50"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
