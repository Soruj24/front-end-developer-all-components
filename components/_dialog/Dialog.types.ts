import type { ReactNode } from "react";

export type DialogTrigger = ReactNode;

export interface DialogContentProps {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closable?: boolean;
}

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: DialogTrigger;
  content: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closable?: boolean;
  overlayClassName?: string;
}
