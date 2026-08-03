"use client";

import { cn } from "@/lib/cn";
import type { MarkerProps } from "./Marker.types";

export function Marker({ children, active = false, className }: MarkerProps) {
  return (
    <span
      className={cn(
        "rounded px-0.5 transition-colors duration-200",
        active
          ? "bg-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-100"
          : "bg-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
