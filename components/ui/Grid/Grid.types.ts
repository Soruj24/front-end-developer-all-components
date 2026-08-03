import type { ReactNode } from "react";

export interface GridProps {
  children: ReactNode;
  columns?: number;
  rows?: number;
  gap?: number;
  className?: string;
}

export interface GridItemProps {
  children: ReactNode;
  span?: number;
  rowSpan?: number;
  className?: string;
}
