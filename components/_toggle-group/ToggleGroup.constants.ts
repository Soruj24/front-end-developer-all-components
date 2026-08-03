export const TOGGLE_GROUP_VARIANTS = {
  default: "default",
  outline: "outline",
  ghost: "ghost",
} as const;

export const TOGGLE_GROUP_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const TOGGLE_GROUP_STYLES: Record<string, string> = {
  base: "inline-flex items-center gap-1 rounded-md bg-gray-100 p-1 dark:bg-gray-800",
  sm: "gap-0.5",
  md: "gap-1",
  lg: "gap-1.5",
};

export const TOGGLE_GROUP_ITEM_STYLES: Record<string, string> = {
  base: "inline-flex items-center justify-center rounded font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
  selected: "bg-white dark:bg-gray-900 text-gray-900 shadow dark:text-gray-100",
  default: "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
  outline: "border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700",
  ghost: "hover:bg-gray-200 dark:hover:bg-gray-700",
};
