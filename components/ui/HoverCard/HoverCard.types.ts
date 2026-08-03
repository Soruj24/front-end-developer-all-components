import type { ReactNode } from "react";

export interface HoverCardProps {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  className?: string;
}
