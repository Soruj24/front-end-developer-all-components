import type { ReactNode } from "react";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
  itemClassName?: string;
  activeIndex?: number;
}
