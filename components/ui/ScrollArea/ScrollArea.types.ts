import { ReactNode } from "react";

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
export type ScrollAreaSize = "sm" | "md" | "lg";

export interface ScrollAreaProps {
  children: ReactNode;
  orientation?: ScrollAreaOrientation;
  size?: ScrollAreaSize;
  maxHeight?: string;
  maxWidth?: string;
  className?: string;
}
