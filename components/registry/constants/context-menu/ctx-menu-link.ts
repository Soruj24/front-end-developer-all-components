import type { RegistryEntry } from "../../types";

export const ctxMenuLink: RegistryEntry = {
  id: "ctx-menu-link",
  name: "Link Context Menu",
  description: "Context menu for link operations",
  code: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
}

const linkMenu: MenuItem[] = [
  { label: "Open Link", icon: "O" },
  { label: "Open in New Tab", icon: "T" },
  { label: "Copy Link", icon: "L" },
  { label: "---" },
  { label: "Bookmark", icon: "B" },
  { label: "Share Link", icon: "S" },
];

export function ContextMenuLink() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-cyan-300 bg-cyan-50 text-sm font-medium text-cyan-600 dark:border-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300">
        Right-click<br />Link
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  component: "ContextMenuLink",
  dependencies: [],
};
