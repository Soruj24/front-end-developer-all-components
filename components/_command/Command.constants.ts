export const COMMAND_STYLES: Record<string, string> = {
  base: "flex h-60 w-full max-w-sm flex-col overflow-hidden rounded-md border bg-popover",
  input: "flex h-12 w-full rounded-md border-0 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground",
  list: "flex-1 overflow-y-auto",
  item: "flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer",
  itemSelected: "bg-gray-100 dark:bg-gray-800",
  itemDisabled: "opacity-50 cursor-not-allowed",
  shortcut: "ml-auto text-xs text-gray-500 dark:text-gray-400",
  empty: "py-6 text-center text-sm text-gray-500",
  group: "py-1.5 font-semibold text-xs text-gray-500 dark:text-gray-400",
};
