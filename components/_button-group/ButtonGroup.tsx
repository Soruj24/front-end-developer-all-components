import * as React from "react";
import { cn } from "@/lib/cn";
import { BUTTON_GROUP_STYLES, BUTTON_GROUP_GAPS } from "./ButtonGroup.constants";
import type { ButtonGroupProps } from "./ButtonGroup.types";

export function ButtonGroup({
  variant = "default",
  size = "md",
  orientation = "horizontal",
  rounded = true,
  gap = "sm",
  children,
  className,
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      aria-label="Button group"
      className={cn(
        BUTTON_GROUP_STYLES.base,
        orientation === "horizontal" ? BUTTON_GROUP_STYLES.horizontal : BUTTON_GROUP_STYLES.vertical,
        BUTTON_GROUP_GAPS[gap],
        rounded && "rounded-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
