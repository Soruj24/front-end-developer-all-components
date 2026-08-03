import type { ReactNode } from "react";

export type DropdownAlign = "start" | "center" | "end";

export interface DropdownMenuItem {
  label: string;
  shortcut?: string;
  icon?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: DropdownAlign;
  className?: string;
}

export interface DropdownMenuTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export interface DropdownMenuContentProps {
  children: ReactNode;
  align?: DropdownAlign;
  className?: string;
}

export interface DropdownMenuItemProps {
  children: ReactNode;
  shortcut?: string;
  icon?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuSeparatorProps {
  className?: string;
}
