export const SELECT_VARIANTS = {
  default: "default",
  outline: "outline",
} as const;

export const SELECT_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const SELECT_STYLES: Record<string, string> = {
  base: "w-full rounded-md border bg-background text-foreground focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-12 px-4 text-lg",
  default: "border-gray-300 dark:border-gray-600",
  outline: "border-gray-400 dark:border-gray-500",
  error: "border-red-500 focus:ring-red-500",
};
