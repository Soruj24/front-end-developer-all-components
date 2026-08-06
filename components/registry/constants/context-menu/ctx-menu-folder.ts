import type { RegistryEntry } from "../../types";

export const ctxMenuFolder: RegistryEntry = {
  id: "ctx-menu-folder",
  title: "Folder Context Menu",
  description: "Context menu for folder operations",
  source: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
}

const folderMenu: MenuItem[] = [
  { label: "Open", icon: "O" },
  { label: "Open in New Tab", icon: "T" },
  { label: "---" },
  { label: "Copy Path", icon: "P" },
  { label: "Paste Here", icon: "V" },
  { label: "---" },
  { label: "New Folder", icon: "N" },
  { label: "New File", icon: "F" },
];

export function ContextMenuFolder() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-amber-300 bg-warning-soft text-sm font-medium text-warning dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
        Right-click<br />Folder
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  dependencies: [],
};
