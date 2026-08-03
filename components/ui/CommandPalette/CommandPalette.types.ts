import type { ReactNode } from "react";

export interface CommandItem {
  id: string;
  label: string;
  keywords?: string[];
  icon?: ReactNode;
  shortcut?: string;
  group?: string;
  danger?: boolean;
  disabled?: boolean;
  pinned?: boolean;
  children?: CommandItem[];
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  items: CommandItem[];
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
  closeOnSelect?: boolean;
  className?: string;
}

export interface Row {
  key: string;
  item: CommandItem;
  parents: CommandItem[];
  section: string;
}

export interface Section {
  title: string | null;
  rows: Row[];
}

export interface FlatCommand {
  item: CommandItem;
  parents: CommandItem[];
}

export interface BuildOptions {
  items: CommandItem[];
  stack: CommandItem[];
  query: string;
  recents: string[];
  favorites: string[];
  pinned: string[];
}
