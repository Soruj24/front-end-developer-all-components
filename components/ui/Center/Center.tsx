"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { CenterProps, CenterAxis } from "./Center.types";

const AXIS_STYLES: Record<CenterAxis, { justify: string; items: string }> = {
  both: { justify: "justify-center", items: "items-center" },
  x: { justify: "justify-center", items: "items-start" },
  y: { justify: "justify-start", items: "items-center" },
};

const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ axis = "both", inset = false, padding = false, className, children }, ref) => {
    const { justify, items } = AXIS_STYLES[axis];

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          justify,
          items,
          inset && "absolute inset-0",
          padding && "p-8",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

Center.displayName = "Center";

export { Center };
