import type { ReactNode } from "react";

export interface DropdownMenuItem {
  key?: string;
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
  child?: DropdownMenuItem[];
}

export interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  triggerClassName?: string;
  className?: string;
}
