"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ResizableProps } from "./Resizable.types";

export function Resizable({ direction = "horizontal", children, className }: ResizableProps) {
  return (
    <div
      className={cn(
        "flex overflow-hidden",
        direction === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ResizablePanel({
  children,
  defaultSize = 50,
  className,
}: {
  children: ReactNode;
  defaultSize?: number;
  minSize?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("overflow-auto", className)}
      style={{ flex: `0 0 ${defaultSize}%` }}
    >
      {children}
    </div>
  );
}

export function ResizableHandle({ className }: { className?: string }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className={cn(
        "relative flex w-1 items-center justify-center bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600",
        "cursor-col-resize",
        isDragging && "bg-zinc-400 dark:bg-zinc-500",
        className
      )}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
    >
      <div className="absolute h-8 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500" />
    </div>
  );
}
