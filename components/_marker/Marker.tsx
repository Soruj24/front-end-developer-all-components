import * as React from "react";
import { cn } from "@/lib/cn";
import type { MarkerProps } from "./Marker.types";
import { MARKER_COLORS, MARKER_STYLES } from "./Marker.constants";

export function Marker({ children, variant = "default", shape = "dot", size = 10, className, style, ...props }: MarkerProps) {
  const isDot = shape === "dot";
  const sizeStyle = isDot ? { width: size, height: size } : {};

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        MARKER_COLORS[variant],
        isDot ? MARKER_STYLES.dot : cn("text-white font-bold", MARKER_STYLES[shape]),
        className,
      )}
      style={{ ...sizeStyle, ...style }}
      {...props}
    >
      {children}
    </span>
  );
}
