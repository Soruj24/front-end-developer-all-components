"use client";

import { cn } from "@/lib/cn";
import type { SeparatorProps, SeparatorVariant } from "./Separator.types";

const VARIANT_HORIZONTAL: Record<SeparatorVariant, string> = {
  solid: "h-px w-full bg-border",
  dashed: "h-px w-full border-t border-dashed border-border bg-transparent",
  dotted: "h-px w-full border-t border-dotted border-border bg-transparent",
  gradient: "h-px w-full bg-gradient-to-r from-transparent via-border to-transparent",
};

const VARIANT_VERTICAL: Record<SeparatorVariant, string> = {
  solid: "h-full w-px bg-border",
  dashed: "h-full w-px border-l border-dashed border-border bg-transparent",
  dotted: "h-full w-px border-l border-dotted border-border bg-transparent",
  gradient: "h-full w-px bg-gradient-to-b from-transparent via-border to-transparent",
};

export function Separator({
  orientation = "horizontal",
  decorative = true,
  variant = "solid",
  className,
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={!decorative ? orientation : undefined}
      className={cn(
        "shrink-0",
        orientation === "horizontal" ? VARIANT_HORIZONTAL[variant] : VARIANT_VERTICAL[variant],
        className,
      )}
    />
  );
}
