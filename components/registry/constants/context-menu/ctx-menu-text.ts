import type { RegistryEntry } from "../../types";

export const ctxMenuText: RegistryEntry = {
  id: "ctx-menu-text",
  title: "Text Context Menu",
  description: "Context menu for text editing operations",
  source: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
}

const textMenu: MenuItem[] = [
  { label: "Copy", icon: "C", shortcut: "Ctrl+C" },
  { label: "Paste", icon: "P", shortcut: "Ctrl+V" },
  { label: "Cut", icon: "X", shortcut: "Ctrl+X", disabled: true },
  { label: "---" },
  { label: "Select All", icon: "A", shortcut: "Ctrl+A" },
];

export function ContextMenuText() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 text-sm font-medium text-primary dark:border-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
        Right-click<br />Text Area
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  dependencies: [],
};
