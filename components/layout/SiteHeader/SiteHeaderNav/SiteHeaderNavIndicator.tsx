"use client";

import { cn } from "@/lib/cn";
import type { NavIndicatorStyle } from "../types/header.types";

interface SiteHeaderNavIndicatorProps {
  indicator: NavIndicatorStyle;
  className?: string;
}

export function SiteHeaderNavIndicator({
  indicator,
  className,
}: SiteHeaderNavIndicatorProps) {
  return (
    <span
      className={cn(
        "absolute bottom-0 h-0.5 rounded-full",
        "bg-zinc-200 transition-all duration-300 ease-out",
        "will-change-transform",
        className
      )}
      style={{
        left: indicator.left,
        width: indicator.width,
        opacity: indicator.opacity,
        transform: `scaleX(${indicator.opacity})`,
      }}
      aria-hidden="true"
    />
  );
}
