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

export function PreviewFrame({
  device,
  children,
  className,
}: PreviewFrameProps) {
  return (
    <div
      className={cn(
        "mx-auto flex min-h-[12rem] w-full min-w-0 flex-col transition-[max-width] duration-300 ease-out",
        className,
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
