export const ATTACHMENT_VARIANTS = {
  default: "default",
  outline: "outline",
  ghost: "ghost",
} as const;

export const ATTACHMENT_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const ATTACHMENT_STYLES: Record<string, string> = {
  base: "inline-flex items-center gap-2 rounded-md",
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
  default: "border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800",
  outline: "border border-gray-400 bg-transparent",
  ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
};
