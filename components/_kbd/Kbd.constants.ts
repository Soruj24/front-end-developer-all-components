export const KBD_VARIANTS = {
  default: "default",
  outline: "outline",
  ghost: "ghost",
} as const;

export const KBD_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const KBD_STYLES: Record<string, string> = {
  base: "inline-flex items-center justify-center font-mono font-medium",
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export const KBD_VARIANT_STYLES: Record<string, string> = {
  default: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
  outline: "border border-border bg-transparent",
  ghost: "text-muted-foreground",
};
