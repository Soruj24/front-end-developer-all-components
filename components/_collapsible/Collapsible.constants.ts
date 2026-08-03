export const COLLAPSIBLE_STYLES = {
  base: "overflow-hidden transition-all",
  content: "pt-2 text-sm",
  header: "flex items-center justify-between",
  title: "text-sm font-medium",
  trigger: "inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800",
  icon: "transition-transform duration-200",
  open: "rotate-180",
  closed: "rotate-0",
} as const;
