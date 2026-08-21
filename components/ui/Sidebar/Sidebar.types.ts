import type { ReactNode } from "react";

export type SidebarSide = "left" | "right";

export interface SidebarProps {
  children: ReactNode;
  side?: SidebarSide;
  width?: number;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
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
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface SidebarGroupProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

export interface SidebarTriggerProps {
  className?: string;
}

export interface SidebarOverlayProps {
  className?: string;
}
