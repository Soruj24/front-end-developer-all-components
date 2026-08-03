import type { ReactNode } from "react";

export interface SidebarProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: "left" | "right";
  className?: string;
}

export interface SidebarHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface SidebarContentProps {
  children: ReactNode;
  className?: string;
}

export interface SidebarFooterProps {
  children: ReactNode;
  className?: string;
}

export interface SidebarItemProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}
