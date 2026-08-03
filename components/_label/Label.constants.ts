export const LABEL_VARIANTS = {
  default: "default",
  secondary: "secondary",
} as const;

export const LABEL_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const LABEL_STYLES: Record<string, string> = {
  base: "block font-medium cursor-pointer",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  default: "text-gray-900 dark:text-gray-100",
  secondary: "text-gray-600 dark:text-gray-400",
  required: "after:content-['*'] after:text-red-500 after:ml-0.5",
  disabled: "cursor-not-allowed opacity-50",
};
