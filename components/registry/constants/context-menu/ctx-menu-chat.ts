import type { RegistryEntry } from "../../types";

export const ctxMenuChat: RegistryEntry = {
  id: "ctx-menu-chat",
  title: "Chat Context Menu",
  description: "Context menu for chat message operations",
  code: `"use client";

interface MenuItem {
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  children?: MenuItem[];
}

const chatMenu: MenuItem[] = [
  { label: "Reply", icon: "R" },
  {
    label: "React",
    icon: "E",
    children: [
      { label: "Like", icon: "T" },
      { label: "Love", icon: "H" },
      { label: "Laugh", icon: "L" },
    ],
  },
  { label: "Forward", icon: "F" },
  { label: "---" },
  { label: "Copy Text", icon: "C" },
  { label: "Pin Message", icon: "P" },
  { label: "---" },
  { label: "Delete", icon: "X", destructive: true },
];

export function ContextMenuChat() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-28 w-full max-w-md cursor-context-menu items-center justify-center rounded-xl border-2 border-dashed border-violet-300 bg-violet-50 text-sm font-medium text-violet-600 dark:border-violet-700 dark:bg-violet-900/20 dark:text-violet-300">
        Right-click<br />Chat
      </div>
      <p className="text-xs text-muted-foreground/70">Right-click the zone to open the menu</p>
    </div>
  );
}`,
  dependencies: [],
};
