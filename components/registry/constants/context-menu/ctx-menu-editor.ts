import type { RegistryEntry } from "../../types";

export const ctxMenuEditor: RegistryEntry = {
  id: "ctx-menu-editor",
  name: "Editor Context Menu",
  description: "Context menu for code editor operations",
  code: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
}

const editorMenu: MenuItem[] = [
  { label: "Format Document", icon: "F", shortcut: "Shift+Alt+F" },
  { label: "Toggle Comment", icon: "/", shortcut: "Ctrl+/" },
  { label: "---" },
  { label: "Go to Definition", icon: "D", shortcut: "F12" },
  { label: "Find References", icon: "R", shortcut: "Shift+F12" },
  { label: "---" },
  { label: "Rename Symbol", icon: "N", shortcut: "F2" },
];

export function ContextMenuEditor() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50 text-sm font-medium text-primary dark:border-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
        Right-click<br />Editor
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  component: "ContextMenuEditor",
  dependencies: [],
};
