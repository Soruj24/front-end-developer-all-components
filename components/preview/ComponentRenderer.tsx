"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ComponentRendererProps {
  children: ReactNode;
  className?: string;
}

/**
 * Shrink-safe mount for a previewed component.
 *
 * Establishes a definite width (`w-full`) with `min-w-0` so the demo can never
 * refuse to shrink below its content's min-content size. Fluid children re-flow
 * against the device frame; a child that still overflows is a bug in that
 * component, not in the preview.
 */
export function ComponentRenderer({ children, className }: ComponentRendererProps) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
