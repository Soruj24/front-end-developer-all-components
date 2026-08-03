import * as React from "react";
import { cn } from "@/lib/cn";
import type { SeparatorProps } from "./Separator.types";
import { SEPARATOR_STYLES } from "./Separator.constants";

export function Separator({ orientation = "horizontal", decorative = true, className }: SeparatorProps) {
  const orientationKey = orientation === "vertical" ? "vertical" : "horizontal";
  const role = decorative ? undefined : "separator";

  return (
    <div
      {...(role ? { role } : {})}
      aria-orientation={orientation}
      className={cn(
        SEPARATOR_STYLES.base,
        SEPARATOR_STYLES[orientationKey],
        className,
      )}
    />
  );
}
