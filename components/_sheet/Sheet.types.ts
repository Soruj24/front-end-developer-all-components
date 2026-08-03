import type { ReactNode } from "react";

export type SheetSide = "top" | "right" | "bottom" | "left";
export type SheetSize = "sm" | "md" | "lg" | "xl" | "full";

export interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: SheetSide;
  size?: SheetSize;
  trigger?: ReactNode;
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  closable?: boolean;
  overlayClassName?: string;
}
