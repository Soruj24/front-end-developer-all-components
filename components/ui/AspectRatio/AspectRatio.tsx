"use client";

import { cn } from "@/lib/cn";
import type { AspectRatioProps } from "./AspectRatio.types";

export function AspectRatio({
  ratio = 1,
  className,
  children,
}: AspectRatioProps) {
  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: ratio }}
    >
      {children}
    </div>
  );
}
