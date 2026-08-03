import type { ReactNode } from "react";

export interface HoverCardProps {
  trigger: ReactNode;
  content: ReactNode;
  openDelay?: number;
  closeDelay?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  offset?: number;
  contentClassName?: string;
}
