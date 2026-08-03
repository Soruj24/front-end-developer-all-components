import { ReactNode } from "react";

type SheetSide = "left" | "right" | "top" | "bottom";

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: SheetSide;
  children: ReactNode;
  className?: string;
}
