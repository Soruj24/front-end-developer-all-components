import type { RegistryEntry } from "../../types";

export const ctxMenuEmail: RegistryEntry = {
  id: "ctx-menu-email",
  name: "Email Context Menu",
  description: "Context menu for email operations",
  code: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
}

const emailMenu: MenuItem[] = [
  { label: "Reply", icon: "R" },
  { label: "Reply All", icon: "A" },
  { label: "Forward", icon: "F" },
  { label: "---" },
  { label: "Mark as Read", icon: "M" },
  { label: "Mark as Unread", icon: "U" },
  { label: "---" },
  { label: "Archive", icon: "A" },
  { label: "Delete", icon: "X", destructive: true },
];

export function ContextMenuEmail() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-teal-300 bg-teal-50 text-sm font-medium text-teal-600 dark:border-teal-700 dark:bg-teal-900/20 dark:text-teal-300">
        Right-click<br />Email
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  component: "ContextMenuEmail",
  dependencies: [],
};
