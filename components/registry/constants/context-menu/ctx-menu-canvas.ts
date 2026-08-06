import type { RegistryEntry } from "../../types";

export const ctxMenuCanvas: RegistryEntry = {
  id: "ctx-menu-canvas",
  title: "Canvas Context Menu",
  description: "Context menu for canvas operations",
  code: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
}

const canvasMenu: MenuItem[] = [
  { label: "Undo", icon: "U", shortcut: "Ctrl+Z" },
  { label: "Redo", icon: "R", shortcut: "Ctrl+Y" },
  { label: "---" },
  { label: "Bring Forward", icon: "F" },
  { label: "Send Backward", icon: "B" },
  { label: "---" },
  { label: "Group", icon: "G" },
  { label: "Ungroup", icon: "U" },
  { label: "---" },
  { label: "Delete Layer", icon: "X", destructive: true },
];

export function ContextMenuCanvas() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-pink-300 bg-pink-50 text-sm font-medium text-pink-600 dark:border-pink-700 dark:bg-pink-900/20 dark:text-pink-300">
        Right-click<br />Canvas
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  dependencies: [],
};
