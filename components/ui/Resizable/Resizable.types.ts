import { ReactNode } from "react";

export interface ResizableProps {
  direction?: "horizontal" | "vertical";
  children: ReactNode;
  className?: string;
}

export interface ResizablePanelProps {
  children: ReactNode;
  defaultSize?: number;
  className?: string;
}

export interface ResizableHandleProps {
  className?: string;
}
