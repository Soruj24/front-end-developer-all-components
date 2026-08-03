export const CHECKBOX_VARIANTS = {
  default: "default",
  outline: "outline",
  ghost: "ghost",
} as const;

export const CHECKBOX_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const CHECKBOX_STYLES: Record<string, string> = {
  base: "peer relative flex cursor-pointer items-center justify-center rounded border transition-colors",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  default: "border-gray-900 bg-gray-900 text-white checked:bg-gray-900",
  outline: "border-gray-400 bg-transparent text-gray-900 checked:bg-gray-900 checked:text-white",
  ghost: "border-transparent bg-transparent text-gray-600 checked:bg-gray-600 checked:text-white",
};
