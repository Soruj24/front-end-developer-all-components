export interface ShortcutItem {
  keys: string[];
  description: string;
}

export interface ShortcutGroup {
  category: string;
  items: ShortcutItem[];
}

export interface KeyboardShortcutsProps {
  shortcuts: ShortcutGroup[];
  searchable?: boolean;
  className?: string;
}
