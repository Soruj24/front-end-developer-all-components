import type { ReactNode } from "react";

export type StackDirection = "vertical" | "horizontal";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

export interface StackProps {
  /** Stack direction. */
  direction?: StackDirection;
  /** Gap between items (Tailwind gap class number, e.g. 4 = gap-4). */
  gap?: number;
  /** Horizontal alignment (for vertical stacks). */
  align?: StackAlign;
  /** Vertical alignment (for horizontal stacks). */
  justify?: StackJustify;
  /** Wrap items to next line. */
  wrap?: boolean;
  /** Render as separator between items. */
  separator?: ReactNode;
  /** Additional CSS classes. */
  className?: string;
  /** Child elements. */
  children: ReactNode;
}

export interface InlineProps {
  /** Gap between items. */
  gap?: number;
  /** Horizontal alignment. */
  align?: StackAlign;
  /** Vertical alignment. */
  justify?: StackJustify;
  /** Wrap items to next line. */
  wrap?: boolean;
  /** Additional CSS classes. */
  className?: string;
  /** Child elements. */
  children: ReactNode;
}
