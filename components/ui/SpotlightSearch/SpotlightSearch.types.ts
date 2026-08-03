import type { ReactNode } from "react";

export interface SpotlightItem {
  id: string;
  label: string;
  subtitle?: string;
  keywords?: string[];
  category: string;
  icon?: ReactNode;
  popular?: boolean;
  shortcut?: string;
  onSelect?: () => void;
}

export interface SpotlightSearchProps {
  items: SpotlightItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  storageKey?: string;
  recentLimit?: number;
  width?: number | string;
  maxHeight?: number | string;
  bindShortcut?: boolean;
  className?: string;
}

export interface Section {
  title: string;
  rows: SpotlightItem[];
}
