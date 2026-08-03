"use client";

import { cn } from "@/lib/cn";
import { ToggleProps } from "./Toggle.types";

const sizeClasses = {
  default: "h-10 px-3",
  sm: "h-9 px-2",
  lg: "h-11 px-4",
};

export default function Toggle({
  pressed = false,
  onPressedChange,
  disabled = false,
  size = "default",
  className,
  children,
}: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      data-state={pressed ? "on" : "off"}
      onClick={() => onPressedChange?.(!pressed)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
        "hover:bg-muted hover:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        pressed && "bg-accent text-accent-foreground",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
}
