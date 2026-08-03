import { ReactNode } from "react";

export interface MenubarProps {
  className?: string;
  children: ReactNode;
}

export interface MenubarMenuProps {
  children: ReactNode;
}

export interface MenubarTriggerProps {
  children: ReactNode;
  className?: string;
}

export interface MenubarContentProps {
  children: ReactNode;
  className?: string;
}

export interface MenubarItemProps {
  children: ReactNode;
  className?: string;
  shortcut?: string;
  disabled?: boolean;
}

export interface MenubarSeparatorProps {
  className?: string;
}
