import type { RegistryEntry } from "../../types";

export const ctxMenuFile: RegistryEntry = {
  id: "ctx-menu-file",
  title: "File Context Menu",
  description: "Context menu for file operations",
  source: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  children?: MenuItem[];
}

const fileMenu: MenuItem[] = [
  { label: "Open", icon: "O", shortcut: "Enter" },
  { label: "Rename", icon: "R", shortcut: "F2" },
  { label: "Duplicate", icon: "D", shortcut: "Ctrl+D" },
  { label: "---" },
  {
    label: "Move to",
    icon: "M",
    children: [
      { label: "Documents", icon: "D" },
      { label: "Downloads", icon: "L" },
      { label: "Trash", icon: "T", destructive: true },
    ],
  },
  { label: "---" },
  { label: "Delete", icon: "X", destructive: true },
];

export function ContextMenuFile() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-purple-300 bg-purple-50 text-sm font-medium text-purple-600 dark:border-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
        Right-click<br />File Area
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  dependencies: [],
};
