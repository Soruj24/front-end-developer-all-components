export const SHEET_SIDES = {
  top: "top",
  right: "right",
  bottom: "bottom",
  left: "left",
} as const;

export const SHEET_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  full: "full",
} as const;

export const SHEET_STYLES: Record<string, string> = {
  overlay: "fixed inset-0 z-50 bg-black/50",
  content: "fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-xl",
  top: "inset-x-0 top-0 h-auto max-w-full rounded-b-none",
  right: "inset-y-0 right-0 h-full w-80 max-w-full rounded-l-none",
  bottom: "inset-x-0 bottom-0 h-auto max-w-full rounded-t-none",
  left: "inset-y-0 left-0 h-full w-80 max-w-full rounded-r-none",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "inset-0 h-full w-full max-w-none",
  title: "text-lg font-semibold",
  description: "text-sm text-gray-600 dark:text-gray-400",
  close: "absolute right-4 top-4 rounded-sm opacity-50 hover:opacity-100",
};
