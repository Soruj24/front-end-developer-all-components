export const MARKER_VARIANTS = {
  default: "default",
  primary: "primary",
  secondary: "secondary",
  danger: "danger",
} as const;

export const MARKER_SHAPES = {
  circle: "circle",
  square: "square",
  dot: "dot",
} as const;

export const MARKER_COLORS: Record<string, string> = {
  default: "bg-gray-400",
  primary: "bg-blue-500",
  secondary: "bg-gray-500",
  danger: "bg-red-500",
};

export const MARKER_STYLES: Record<string, string> = {
  circle: "rounded-full",
  square: "rounded",
  dot: "rounded-full",
};
