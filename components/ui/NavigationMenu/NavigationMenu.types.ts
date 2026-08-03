import { ReactNode } from "react";

export interface NavigationMenuProps {
  className?: string;
  children: ReactNode;
}

export interface NavigationMenuListProps {
  children: ReactNode;
  className?: string;
}

export interface NavigationMenuItemProps {
  children: ReactNode;
  className?: string;
}

export interface NavigationMenuTriggerProps {
  children: ReactNode;
  className?: string;
}

export interface NavigationMenuContentProps {
  children: ReactNode;
  className?: string;
}

export interface NavigationMenuLinkProps {
  href?: string;
  children: ReactNode;
  className?: string;
}
