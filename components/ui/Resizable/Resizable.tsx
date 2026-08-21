"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { ResizableProps, ResizablePanelProps, ResizableHandleProps } from "./Resizable.types";

export function Resizable({ direction = "horizontal", children, className }: ResizableProps) {
  return (
    <div
      role="region"
      aria-label="Resizable panel group"
      className={cn(
        "flex overflow-hidden rounded-xl border border-border bg-card",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ResizablePanel({
  children,
  defaultSize = 50,
  minSize,
  collapsible = false,
  className,
}: ResizablePanelProps) {
  return (
    <div
      className={cn("overflow-auto", className)}
      style={{ flex: `0 0 ${defaultSize}%` }}
      data-min-size={minSize}
      data-collapsible={collapsible}
    >
      {children}
    </div>
  );
}

export function ResizableHandle({ className }: ResizableHandleProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-orientation="vertical"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      className={cn(
        "group relative flex w-2 items-center justify-center",
        "cursor-col-resize outline-none",
        "bg-border/50 transition-colors duration-150",
        "hover:bg-primary/20",
        isDragging && "bg-primary/30",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset",
        className,
      )}
    >
      <div
        className={cn(
          "flex h-8 w-1 flex-col items-center justify-center gap-1 rounded-full",
          "bg-muted-foreground/30 transition-all duration-150",
          "group-hover:bg-primary/50 group-hover:h-10",
          isDragging && "bg-primary/60 h-10",
        )}
      >
        <span className="block h-0.5 w-0.5 rounded-full bg-background/80" />
        <span className="block h-0.5 w-0.5 rounded-full bg-background/80" />
        <span className="block h-0.5 w-0.5 rounded-full bg-background/80" />
      </div>
    </div>
  );
}
