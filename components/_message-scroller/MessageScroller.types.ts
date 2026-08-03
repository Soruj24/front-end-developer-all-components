import type { ReactNode, HTMLAttributes } from "react";

export interface MessageScrollerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  autoScroll?: boolean;
  showScrollButton?: boolean;
  emptyMessage?: ReactNode;
  messageCount?: number;
}
