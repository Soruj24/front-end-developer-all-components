import type { ReactNode, HTMLAttributes } from "react";

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: PopoverSide;
  align?: PopoverAlign;
  offset?: number;
  triggerClassName?: string;
  contentClassName?: string;
  overlay?: boolean;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
}
