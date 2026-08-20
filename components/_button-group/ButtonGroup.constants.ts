export const BUTTON_GROUP_VARIANTS = {
  default: "default",
  outline: "outline",
  ghost: "ghost",
} as const;

export const BUTTON_GROUP_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const BUTTON_GROUP_GAPS: Record<string, string> = {
  none: "gap-0",
  xs: "gap-px",
  sm: "gap-0.5",
  md: "gap-1",
};

export const BUTTON_GROUP_STYLES: Record<string, string> = {
  base: "inline-flex items-center",
  horizontal: "flex-row",
  vertical: "flex-col",
};
