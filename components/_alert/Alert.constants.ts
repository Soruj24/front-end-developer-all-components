export const ALERT_VARIANTS = {
  default: "default",
  destructive: "destructive",
  success: "success",
  warning: "warning",
  info: "info",
} as const;

export const ALERT_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const ALERT_STYLES: Record<string, string> = {
  base: "flex items-start gap-3 rounded-lg p-4 text-sm",
  default: "bg-gray-50 text-gray-900 dark:bg-gray-800/50 dark:text-gray-100",
  destructive: "bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-300",
  success: "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-300",
  warning: "bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-300",
  info: "bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-300",
};
