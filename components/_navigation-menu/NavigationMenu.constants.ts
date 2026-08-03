export const NAVIGATION_MENU_STYLES: Record<string, string> = {
  base: "flex flex-col gap-1 p-2",
  horizontal: "flex-row",
  item: "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800",
  itemActive: "bg-gray-200 dark:bg-gray-700 font-medium",
  itemDisabled: "opacity-50 cursor-not-allowed",
  icon: "flex-shrink-0 w-4 h-4",
  submenu: "ml-4 border-l border-gray-200 dark:border-gray-700 pl-4",
};
