export const FIELD_STYLES: Record<string, string> = {
  base: "flex flex-col gap-1",
  input: "w-full rounded-md border bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-12 px-4 text-lg",
  label: "text-sm font-medium",
  required: "after:content-['*'] after:text-red-500 after:ml-0.5",
  helper: "text-xs text-gray-500 dark:text-gray-400",
  errorInput: "border-red-500 focus:ring-red-500",
  errorText: "text-xs text-red-500",
};
