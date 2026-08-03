export const TEXTAREA_VARIANTS = {
  default: "default",
  outlined: "outlined",
  filled: "filled",
} as const;

export const TEXTAREA_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const TEXTAREA_STYLES: Record<string, string> = {
  base: "w-full rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
  sm: "min-h-[60px] px-3 py-2 text-sm",
  md: "min-h-[80px] px-4 py-2.5 text-base",
  lg: "min-h-[120px] px-4 py-3 text-lg",
  default: "border-gray-300 dark:border-gray-600",
  outlined: "border-gray-400 dark:border-gray-500",
  filled: "border-transparent bg-gray-100 dark:bg-gray-800",
  error: "border-red-500 focus-visible:ring-red-500",
};
