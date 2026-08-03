export const PROGRESS_VARIANTS = {
  default: "default",
  success: "success",
  warning: "warning",
  danger: "danger",
} as const;

export const PROGRESS_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const PROGRESS_STYLES: Record<string, string> = {
  base: "relative w-full overflow-hidden rounded-full",
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
  bg: "bg-gray-200 dark:bg-gray-700",
  default: "bg-blue-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
};
