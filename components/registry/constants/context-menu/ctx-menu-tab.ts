import type { RegistryEntry } from "../../types";

export const ctxMenuTab: RegistryEntry = {
  id: "ctx-menu-tab",
  title: "Browser Tab Context Menu",
  description: "Context menu for browser tab operations",
  source: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
}

const tabMenu: MenuItem[] = [
  { label: "Reload", icon: "R", shortcut: "Ctrl+R" },
  { label: "Duplicate Tab", icon: "D" },
  { label: "Pin Tab", icon: "P" },
  { label: "Mute Tab", icon: "M" },
  { label: "---" },
  { label: "Close Tab", icon: "C" },
  { label: "Close Other Tabs", icon: "O" },
  { label: "Close to Right", icon: "R", destructive: true },
];

export function ContextMenuTab() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-lime-300 bg-lime-50 text-sm font-medium text-lime-600 dark:border-lime-700 dark:bg-lime-900/20 dark:text-lime-300">
        Right-click<br />Browser Tab
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  dependencies: [],
};
