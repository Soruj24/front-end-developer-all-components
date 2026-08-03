export const MENUBAR_STYLES: Record<string, string> = {
  base: "flex h-10 items-center gap-1 rounded-md bg-gray-100 p-1 dark:bg-gray-800",
  item: "flex items-center gap-2 rounded px-3 py-1.5 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer",
  itemSelected: "bg-gray-200 dark:bg-gray-700",
  itemDisabled: "opacity-50 cursor-not-allowed",
  shortcut: "ml-auto text-xs text-gray-500",
  icon: "flex-shrink-0 w-4 h-4",
  separator: "my-1 h-px bg-border",
};
