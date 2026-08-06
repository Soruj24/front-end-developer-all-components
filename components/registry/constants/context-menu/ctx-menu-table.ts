import type { RegistryEntry } from "../../types";

export const ctxMenuTable: RegistryEntry = {
  id: "ctx-menu-table",
  title: "Table Row Context Menu",
  description: "Context menu for table row operations",
  code: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
}

const tableMenu: MenuItem[] = [
  { label: "Edit Row", icon: "E" },
  { label: "Duplicate Row", icon: "D" },
  { label: "---" },
  { label: "Sort Ascending", icon: "A" },
  { label: "Sort Descending", icon: "Z" },
  { label: "---" },
  { label: "Delete Row", icon: "X", destructive: true },
];

export function ContextMenuTable() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-rose-300 bg-rose-50 text-sm font-medium text-rose-600 dark:border-rose-700 dark:bg-rose-900/20 dark:text-rose-300">
        Right-click<br />Table Row
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  dependencies: [],
};
