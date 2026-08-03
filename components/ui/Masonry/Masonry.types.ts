import type { ReactNode } from "react";

export interface MasonryProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: number;
  className?: string;
}

export interface MasonryItemProps {
  children: ReactNode;
  className?: string;
}
