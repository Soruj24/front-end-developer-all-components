"use client";

import { cn } from "@/lib/cn";
import type { MarkerProps } from "./Marker.types";

export function Marker({ children, active = false, variant = "yellow", className }: MarkerProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 font-medium transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
        active
          ? cn(
              variant === "yellow" && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
              variant === "green" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
              variant === "blue" && "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
              variant === "pink" && "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
              variant === "red" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
              variant === "purple" && "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
            )
          : "bg-muted text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
