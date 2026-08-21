"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { ScrollAreaProps, ScrollAreaSize } from "./ScrollArea.types";

const SCROLLBAR_SIZE: Record<ScrollAreaSize, string> = {
  sm: "scrollbar-thin",
  md: "",
  lg: "scrollbar-wide",
};

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({
    children,
    orientation = "vertical",
    size = "md",
    maxHeight = "16rem",
    maxWidth,
    className,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-auto rounded-xl border border-border bg-card",
          "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20",
          "hover:scrollbar-thumb-muted-foreground/40",
          "scrollbar-thumb-rounded-full scrollbar-track-rounded-full",
          SCROLLBAR_SIZE[size],
          orientation === "vertical" && "overflow-x-hidden",
          orientation === "horizontal" && "overflow-y-hidden",
          className,
        )}
        style={{
          maxHeight: orientation !== "horizontal" ? maxHeight : undefined,
          maxWidth: orientation !== "vertical" ? maxWidth : undefined,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ScrollArea.displayName = "ScrollArea";
