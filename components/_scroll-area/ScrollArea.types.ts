import type { ReactNode, HTMLAttributes } from "react";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
export type ScrollAreaSize = "sm" | "md" | "lg";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxHeight?: number | string;
  orientation?: ScrollAreaOrientation;
  size?: ScrollAreaSize;
  showScrollbar?: boolean;
}
