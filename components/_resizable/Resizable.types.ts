import type { ReactNode, HTMLAttributes } from "react";

export interface ResizableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  defaultSizes?: number[];
  onSizesChange?: (sizes: number[]) => void;
  collapsible?: boolean;
  minSizes?: number[];
  maxSizes?: number[];
}

export interface ResizablePanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
}

export interface ResizableHandleProps extends HTMLAttributes<HTMLDivElement> {
  onResize?: (sizes: number[]) => void;
}
