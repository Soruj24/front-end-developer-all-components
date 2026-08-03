export const CONTEXT_MENU_STYLES: Record<string, string> = {
  overlay: "fixed inset-0 z-50 bg-transparent",
  content: "fixed z-50 min-w-48 rounded-md border bg-popover py-1 shadow-lg",
  item: "flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer",
  itemDisabled: "opacity-50 cursor-not-allowed",
  itemDangerous: "text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20",
  shortcut: "ml-auto text-xs text-gray-500",
  icon: "flex-shrink-0 w-4 h-4",
  separator: "my-1 h-px bg-border",
  group: "px-3 py-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400",
};
