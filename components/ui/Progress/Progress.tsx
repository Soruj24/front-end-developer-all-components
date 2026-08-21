"use client";

import { cn } from "@/lib/cn";
import type { ProgressProps, ProgressVariant, ProgressSize } from "./Progress.types";

const VARIANT_MAP: Record<ProgressVariant, string> = {
  default: "bg-foreground",
  success: "bg-emerald-500 dark:bg-emerald-400",
  warning: "bg-amber-500 dark:bg-amber-400",
  danger: "bg-red-500 dark:bg-red-400",
  info: "bg-primary",
};

const SIZE_MAP: Record<ProgressSize, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
};

export function Progress({
  value = 0,
  max = 100,
  label,
  showValue = false,
  variant = "default",
  size = "md",
  indeterminate = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-sm font-medium text-foreground">
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span className="text-sm tabular-nums text-muted-foreground">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-label={label || "Progress"}
        className={cn(
          "w-full overflow-hidden rounded-full bg-muted",
          SIZE_MAP[size],
        )}
      >
        {indeterminate ? (
          <div
            className={cn(
              "h-full w-1/3 rounded-full",
              VARIANT_MAP[variant],
              "animate-[indeterminate_1.5s_ease-in-out_infinite]",
            )}
          />
        ) : (
          <div
            className={cn(
              "h-full rounded-full",
              VARIANT_MAP[variant],
              "transition-all duration-500 ease-out",
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
      <style>{`
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
