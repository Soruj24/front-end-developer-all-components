import type { RegistryEntry } from "../../types";

export const ctxMenuImage: RegistryEntry = {
  id: "ctx-menu-image",
  title: "Image Context Menu",
  description: "Context menu for image operations",
  code: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
}

const imageMenu: MenuItem[] = [
  { label: "Save Image", icon: "S", shortcut: "Ctrl+S" },
  { label: "Copy Image", icon: "C" },
  { label: "Open in Tab", icon: "O" },
  { label: "---" },
  { label: "Share", icon: "S" },
  { label: "Download", icon: "D" },
];

export function ContextMenuImage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-green-300 bg-success-soft text-sm font-medium text-success dark:border-green-700 dark:bg-green-900/20 dark:text-green-300">
        Right-click<br />Image Area
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  dependencies: [],
};
