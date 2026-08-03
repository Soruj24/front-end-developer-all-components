export const SPINNER_VARIANTS = {
  default: "default",
  primary: "primary",
  secondary: "secondary",
} as const;

export const SPINNER_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const SPINNER_STYLES: Record<string, string> = {
  base: "animate-spin rounded-full border-2 border-t-transparent",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  default: "border-gray-300 dark:border-gray-600",
  primary: "border-blue-500",
  secondary: "border-gray-500",
};
