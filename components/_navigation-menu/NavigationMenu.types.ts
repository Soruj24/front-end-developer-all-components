import type { ReactNode } from "react";

export interface NavigationMenuItems {
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: NavigationMenuItems[];
  className?: string;
  onClick?: () => void;
}

export interface NavigationMenuProps {
  items: NavigationMenuItems[];
  orientation?: "horizontal" | "vertical";
  className?: string;
  itemClassName?: string;
}
