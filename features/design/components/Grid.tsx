import { CSSProperties, HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface GridLayout {
  cols?: string;
  gap?: number | string;
  autoCols?: string;
  autoRows?: string;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  "2xl"?: number;
}

export interface GridProps extends HTMLAttributes<HTMLDivElement>, GridLayout {}

/**
 * Premium SaaS responsive grid: CSS Grid with configurable columns at each breakpoint.
 * Perfect for card-based UIs, feature grids, and component galleries.
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap = 6, sm, md, lg, xl, "2xl": xl2, autoCols, autoRows, style, ...props }, ref) => {
    const gapValue = typeof gap === "number" ? `${gap * 0.25}rem` : gap;
    const gridCols = cols ? `grid-cols-[${cols}]` : "";
    const responsiveCols = [
      sm && `sm:grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
      xl2 && `2xl:grid-cols-${xl2}`,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={cn("grid", gridCols, responsiveCols, className)}
        style={{
          ...style,
          gap: gapValue,
          ...(autoCols && { "grid-auto-columns": autoCols }),
          ...(autoRows && { "grid-auto-rows": autoRows }),
        }}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";
