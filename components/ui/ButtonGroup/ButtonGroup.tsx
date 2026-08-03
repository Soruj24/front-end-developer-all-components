"use client";

import { cn } from "@/lib/cn";
import type { ButtonGroupProps } from "./ButtonGroup.types";

export function ButtonGroup({
  className,
  children,
  orientation = "horizontal",
}: ButtonGroupProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      role="group"
      className={cn(
        "inline-flex",
        isVertical ? "flex-col" : "flex-row",
        "[&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:border-l-0 [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
        isVertical &&
          "[&>*:not(:first-child)]:-ml-0 [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:border-l [&>*:not(:first-child)]:border-t-0 [&>*:not(:first-child)]:rounded-none [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none",
        className
      )}
    >
      {children}
    </div>
  );
}
