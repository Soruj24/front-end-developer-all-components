import { ReactNode } from "react";

type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: TooltipSide;
  delayDuration?: number;
  className?: string;
}
