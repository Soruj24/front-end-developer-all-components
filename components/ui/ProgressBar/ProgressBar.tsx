"use client";

import { cn } from "@/lib/cn";
import type { ProgressBarProps, ProgressBarVariant, ProgressBarSize } from "./ProgressBar.types";

const VARIANT_MAP: Record<ProgressBarVariant, string> = {
  default: "bg-foreground",
  success: "bg-emerald-500 dark:bg-emerald-400",
  warning: "bg-amber-500 dark:bg-amber-400",
  error: "bg-red-500 dark:bg-red-400",
};

const SIZE_MAP: Record<ProgressBarSize, { bar: string; label: string }> = {
  sm: { bar: "h-1.5", label: "text-xs" },
  md: { bar: "h-2.5", label: "text-sm" },
  lg: { bar: "h-4", label: "text-base" },
};

export function ProgressBar({
  value,
  variant = "default",
  size = "md",
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={`Progress: ${Math.round(clamped)}%`}
        className={cn(
          "flex-1 overflow-hidden rounded-full bg-muted",
          SIZE_MAP[size].bar,
        )}
      >
        <div
          className={cn(
            "h-full rounded-full",
            VARIANT_MAP[variant],
            "transition-all duration-500 ease-out",
            animated && "animate-pulse",
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span
          className={cn(
            "shrink-0 tabular-nums font-medium text-muted-foreground",
            SIZE_MAP[size].label,
          )}
        >
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}
