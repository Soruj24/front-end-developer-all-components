import { cn } from "@/lib/cn";
import type { GridProps, GridItemProps } from "./Grid.types";

export function Grid({ children, columns = 3, gap = 4, className }: GridProps) {
  return (
    <div
      className={cn("grid", `gap-${gap}`, className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

export function GridItem({ children, span = 1, rowSpan = 1, className }: GridItemProps) {
  return (
    <div
      className={cn(className)}
      style={{ gridColumn: `span ${span}`, gridRow: `span ${rowSpan}` }}
    >
      {children}
    </div>
  );
}
