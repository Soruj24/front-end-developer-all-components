export const COMBOBOX_STYLES: Record<string, string> = {
  base: "relative w-full",
  trigger: "flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm",
  popover: "absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover py-1 text-sm shadow-lg",
  option: "flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer",
  optionSelected: "bg-gray-100 dark:bg-gray-800",
  optionDisabled: "opacity-50 cursor-not-allowed",
  search: "w-full px-3 py-2 text-sm outline-none",
  badge: "inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium dark:bg-gray-800",
};
