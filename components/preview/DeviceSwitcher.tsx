"use client";

import { cn } from "@/lib/cn";
import { DEVICES } from "./devices";
import type { DeviceId } from "./devices";

interface DeviceSwitcherProps {
  device: DeviceId;
  onDeviceChange: (device: DeviceId) => void;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Segmented control for selecting the preview device width.
 * The same control drives the toolbar, the fullscreen overlay, the
 * playground, and the registry detail chrome.
 */
export function DeviceSwitcher({
  device,
  onDeviceChange,
  className,
  size = "md",
}: DeviceSwitcherProps) {
  return (
    <div
      className={cn(
        "flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-border bg-muted p-0.5 scrollbar-thin",
        className
      )}
    >
      {DEVICES.map((preset) => (
        <button
          key={preset.id}
          type="button"
          onClick={() => onDeviceChange(preset.id)}
          title={`${preset.label}${preset.width ? ` (${preset.width}px)` : ""}`}
          aria-label={`${preset.label} preview${preset.width ? ` ${preset.width}px` : ""}`}
          aria-pressed={device === preset.id}
          className={cn(
            "inline-flex items-center rounded-full font-medium transition-colors",
            size === "md" ? "h-7 px-2.5 text-[11px]" : "h-6 px-2 text-[10px]",
            device === preset.id
              ? "bg-background text-foreground shadow-sm ring-1 ring-border"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {preset.shortLabel}
        </button>
      ))}
    </div>
  );
}
