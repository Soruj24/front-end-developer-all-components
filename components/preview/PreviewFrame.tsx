"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { DevicePreset } from "./devices";
import { ComponentRenderer } from "./ComponentRenderer";

interface PreviewFrameProps {
  device: DevicePreset;
  children: ReactNode;
  className?: string;
}

/**
 * Device-responsive preview frame.
 *
 * The frame is `w-full` and capped at the selected device width via `max-width`
 * (`max-width` — not `width` — so the frame also shrinks when the browser is
 * narrower than the device). `min-w-0` is carried down the chain so every child
 * re-flows against the device width instead of overflowing it.
 *
 * The frame never scrolls: overflowing a device frame is treated as a bug in
 * the rendered component, and intentional scroll cases (tables, long
 * pagination bars) live inside the components themselves.
 */
export function PreviewFrame({ device, children, className }: PreviewFrameProps) {
  return (
    <div
      className={cn(
        "mx-auto flex min-h-[12rem] w-full min-w-0 flex-col transition-[max-width] duration-300 ease-out",
        className
      )}
      style={{ maxWidth: device.width ?? "100%" }}
      aria-label={`${device.label} preview (${device.width ? `${device.width}px` : "full width"})`}
    >
      <div className="flex min-h-full w-full min-w-0 flex-col items-center justify-center rounded-xl border border-border/70 bg-background p-4 shadow-card sm:p-6">
        <ComponentRenderer>{children}</ComponentRenderer>
      </div>
    </div>
  );
}
