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
  xs: "gap-0.5",
  sm: "gap-1",
  md: "gap-2",
};

export const BUTTON_GROUP_STYLES: Record<string, string> = {
  base: "inline-flex items-center",
  horizontal: "flex-row",
  vertical: "flex-col",
  rounded: "rounded-md [&>*:not(:first-child)]:ml-0 [&>*:not(:first-child)]:mt-0",
};
