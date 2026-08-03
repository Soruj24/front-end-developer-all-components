import type { ReactNode } from "react";

export interface ContextMenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  dangerous?: boolean;
  onClick?: () => void;
  child?: ContextMenuItem[];
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
