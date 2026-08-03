export const NATIVE_SELECT_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export const NATIVE_SELECT_STYLES: Record<string, string> = {
  base: "w-full appearance-none rounded-md border bg-background text-foreground focus:border-blue-500",
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-12 px-4 text-lg",
};
