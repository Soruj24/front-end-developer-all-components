import type { ReactNode } from "react";

export interface BentoCardSpan {
  cols?: number;
  rows?: number;
}

export interface BentoCard {
  id: string;
  title?: string;
  content?: ReactNode;
  span?: BentoCardSpan;
  min?: BentoCardSpan;
  max?: BentoCardSpan;
  className?: string;
}

export interface BentoGridProps {
  className?: string;
  cards: BentoCard[];
  columns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
  rowHeight?: number;
  gap?: number;
  resizable?: boolean;
  draggable?: boolean;
  ariaLabel?: string;
  onReorder?: (cards: BentoCard[]) => void;
  onResize?: (id: string, span: BentoCardSpan) => void;
}

export interface Span {
  cols: number;
  rows: number;
}

export interface Cell {
  col: number;
  row: number;
}

export interface LayoutItem extends Span {
  id: string;
  col: number;
  row: number;
}

export type Breakpoint = "lg" | "md" | "sm";

export interface UseBreakpoint {
  isBreakpoint: (w: number) => Breakpoint;
}
