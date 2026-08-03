export const TOGGLE_VARIANTS = {
  default: "default",
  outline: "outline",
  ghost: "ghost",
} as const;

export const TOGGLE_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const TOGGLE_STYLES: Record<string, string> = {
  base: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
  default: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700",
  outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800",
  ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
  pressed: "bg-blue-500 text-white hover:bg-blue-600",
};
