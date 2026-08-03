export const BUBBLE_VARIANTS = {
  default: "default",
  primary: "primary",
  secondary: "secondary",
  muted: "muted",
} as const;

export const BUBBLE_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const BUBBLE_STYLES: Record<string, string> = {
  base: "inline-flex items-center gap-2 rounded-xl",
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
  default: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-200 text-gray-900 dark:bg-gray-700",
  muted: "bg-gray-200/50 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400",
};
