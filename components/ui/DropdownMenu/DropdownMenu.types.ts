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
  trigger: ReactNode | ((open: boolean) => ReactNode);
  children: ReactNode;
  align?: DropdownAlign;
  className?: string;
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
  className?: string;
}

export interface DropdownMenuSeparatorProps {
  className?: string;
}

export interface DropdownMenuLabelProps {
  children: ReactNode;
  className?: string;
  inset?: boolean;
}

export interface DropdownMenuGroupProps {
  children: ReactNode;
  className?: string;
}
