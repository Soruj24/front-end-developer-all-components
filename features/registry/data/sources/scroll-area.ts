export const scrollAreaSource: string = `"use client";

import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
export type ScrollAreaSize = "sm" | "md" | "lg";

export interface ScrollAreaProps {
  children: ReactNode;
  orientation?: ScrollAreaOrientation;
  size?: ScrollAreaSize;
  maxHeight?: string;
  maxWidth?: string;
  className?: string;
}

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
          "relative overflow-auto rounded-xl border border-border/60 bg-card ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
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

// cn() is imported from @/lib/cn (clsx + tailwind-merge).
`;
