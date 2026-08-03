export const SLIDER_VARIANTS = {
  default: "default",
  accent: "accent",
} as const;

export const SLIDER_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const SLIDER_STYLES: Record<string, string> = {
  base: "relative w-full cursor-pointer",
  track: "absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-gray-200 dark:bg-gray-700",
  fill: "absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-blue-500",
  thumb: "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white shadow ring-2 ring-blue-500",
  sm: "h-4",
  md: "h-5",
  lg: "h-6",
};
