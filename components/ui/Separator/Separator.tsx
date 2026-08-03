"use client";

import { cn } from "@/lib/cn";
import type { SeparatorProps } from "./Separator.types";

export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={!decorative ? orientation : undefined}
      className={cn(
        "shrink-0 bg-zinc-200 dark:bg-zinc-700",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
    />
  );
}
