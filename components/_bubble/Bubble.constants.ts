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
  base: "inline-flex items-start gap-2.5 rounded-2xl border border-border/50 transition-colors duration-150",
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
  default:
    "bg-muted text-foreground",
  primary:
    "border-primary/20 bg-primary text-primary-foreground shadow-sm shadow-primary/10",
  secondary:
    "bg-secondary text-secondary-foreground",
  muted:
    "border-dashed bg-muted/50 text-muted-foreground",
};
