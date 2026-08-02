"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PreviewCanvasProps {
  children: ReactNode;
  className?: string;
  minHeight?: string;
}

/**
 * Dotted backdrop that hosts the device frame.
 * Grows with content; clips at the section edge so the page never overflows.
 */
export function PreviewCanvas({
  children,
  className,
  minHeight = "min-h-[16rem]",
}: PreviewCanvasProps) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden bg-muted/40 p-4 sm:p-6",
        minHeight,
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 flex w-full min-w-0 items-center justify-center">
        {children}
      </div>
    </div>
  );
}
