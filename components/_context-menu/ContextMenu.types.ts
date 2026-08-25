import type { ReactNode } from "react";

export interface ContextMenuItem {
  key?: string;
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  dangerous?: boolean;
  divider?: boolean;
  onClick?: () => void;
  child?: ContextMenuItem[];
  children?: ContextMenuItem[];
  [key: string]: unknown;
}

export interface ContextMenuProps {
  children: ReactNode;
  items: ContextMenuItem[];
  trigger?: "rightClick" | "longPress";
  triggerDelay?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  overlayClassName?: string;
  itemClassName?: string;
}
