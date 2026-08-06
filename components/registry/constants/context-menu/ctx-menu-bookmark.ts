import type { RegistryEntry } from "../../types";

export const ctxMenuBookmark: RegistryEntry = {
  id: "ctx-menu-bookmark",
  title: "Bookmark Context Menu",
  description: "Context menu for bookmark operations",
  code: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  children?: MenuItem[];
}

const bookmarkMenu: MenuItem[] = [
  { label: "Open", icon: "O" },
  { label: "Open in New Tab", icon: "T" },
  { label: "---" },
  { label: "Edit", icon: "E" },
  { label: "Copy URL", icon: "L" },
  { label: "---" },
  {
    label: "Move to Folder",
    icon: "M",
    children: [
      { label: "Work", icon: "W" },
      { label: "Personal", icon: "P" },
      { label: "Read Later", icon: "R" },
    ],
  },
  { label: "Delete", icon: "X", destructive: true },
];

export function ContextMenuBookmark() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 text-sm font-medium text-orange-600 dark:border-orange-700 dark:bg-orange-900/20 dark:text-orange-300">
        Right-click<br />Bookmark
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  dependencies: [],
};
