import type { ReactNode } from "react";

export interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export interface DrawerTriggerProps {
  children: ReactNode;
  className?: string;
}

export interface DrawerContentProps {
  children: ReactNode;
  className?: string;
  side?: "left" | "right" | "top" | "bottom";
}

export interface DrawerHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface DrawerTitleProps {
  children: ReactNode;
  className?: string;
}

export interface DrawerDescriptionProps {
  children: ReactNode;
  className?: string;
}

export interface DrawerFooterProps {
  children: ReactNode;
  className?: string;
}

export interface DrawerCloseProps {
  children?: ReactNode;
  className?: string;
}
