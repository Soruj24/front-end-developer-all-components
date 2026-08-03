import { cn } from "@/lib/cn";
import type { MasonryProps, MasonryItemProps } from "./Masonry.types";

export function Masonry({ children, columns: _columns = 3, gap = 4, className }: MasonryProps) {
  return (
    <div
      className={cn("columns-2 md:columns-3 lg:columns-4", `gap-${gap}`, className)}
    >
      {children}
    </div>
  );
}

export function MasonryItem({ children, className }: MasonryItemProps) {
  return (
    <div className={cn("break-inside-avoid mb-4", className)}>
      {children}
    </div>
  );
}
