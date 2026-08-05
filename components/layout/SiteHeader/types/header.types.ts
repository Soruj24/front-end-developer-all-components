import type { ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
  badge?: "new" | "beta" | "pro";
  icon?: ReactNode;
}

export interface HeaderProps {
  navLinks?: NavItem[];
  className?: string;
}

export interface HeaderState {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  activeDropdown: string | null;
}

export interface NavIndicatorStyle {
  left: number;
  width: number;
  opacity: number;
}

export interface SearchRecent {
  id: string;
  query: string;
  timestamp: number;
}

export interface Notification {
  id: string;
  title: string;
  read: boolean;
}

export type Breakpoint = "mobile" | "tablet" | "desktop";

export interface HeaderContext {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  isMac: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
}
