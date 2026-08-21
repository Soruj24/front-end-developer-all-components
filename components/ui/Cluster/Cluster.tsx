"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { ClusterProps, ClusterJustify, ClusterAlign } from "./Cluster.types";

const JUSTIFY_STYLES: Record<ClusterJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
};

const ALIGN_STYLES: Record<ClusterAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const Cluster = forwardRef<HTMLDivElement, ClusterProps>(
  ({ gap = 2, justify = "start", align, responsive = true, className, children }, ref) => {
    const justifyClass = JUSTIFY_STYLES[justify];
    const alignClass = align ? ALIGN_STYLES[align] : undefined;
    const gapStyle = { gap: `${gap * 0.25}rem` };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap",
          justifyClass,
          alignClass,
          responsive && "max-sm:[&>*]:w-full",
          className,
        )}
        style={gapStyle}
        role="group"
      >
        {children}
      </div>
    );
  },
);

Cluster.displayName = "Cluster";

export { Cluster };
