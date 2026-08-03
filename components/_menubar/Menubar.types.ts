import type { ReactNode } from "react";

export interface MenubarItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  checked?: boolean;
  submenu?: MenubarItem[];
  onSelect?: () => void;
}

export interface MenubarProps {
  items: MenubarItem[];
  placeholder?: string;
  className?: string;
  itemClassName?: string;
}
