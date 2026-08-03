import type { ReactNode } from "react";

export type DrawerSide = "top" | "right" | "bottom" | "left";

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: DrawerSide;
  trigger?: ReactNode;
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  closable?: boolean;
  dismissible?: boolean;
}
