import type { RegistryEntry } from "../../types";

export const ctxMenuDesktop: RegistryEntry = {
  id: "ctx-menu-desktop",
  title: "Desktop Context Menu",
  description: "Context menu for desktop operations",
  source: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
}

const desktopMenu: MenuItem[] = [
  { label: "New Folder", icon: "F" },
  { label: "New File", icon: "D" },
  { label: "---" },
  { label: "Paste", icon: "P" },
  { label: "Refresh", icon: "R" },
  { label: "---" },
  { label: "Display Settings", icon: "G" },
];

export function ContextMenuDesktop() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 text-sm font-medium text-muted-foreground dark:border-border dark:bg-zinc-900/20 dark:text-muted-foreground">
        Right-click<br />Desktop
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  dependencies: [],
};
