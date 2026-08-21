import { cn } from "@/lib/cn";
import type { MasonryProps, MasonryItemProps } from "./Masonry.types";

const COLUMN_MAP = { 2: "columns-2", 3: "columns-3", 4: "columns-4" } as const;
const GAP_MAP = { 2: "gap-2", 4: "gap-4", 6: "gap-6", 8: "gap-8" } as const;

export function Masonry({ children, columns = 3, gap = 4, className }: MasonryProps) {
  return (
    <div
      className={cn(
        "w-full",
        COLUMN_MAP[columns],
        GAP_MAP[gap as keyof typeof GAP_MAP] ?? `gap-${gap}`,
        className,
      )}
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
