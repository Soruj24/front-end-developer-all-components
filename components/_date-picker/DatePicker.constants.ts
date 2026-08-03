export const DATE_PICKER_STYLES: Record<string, string> = {
  base: "relative w-full rounded-md border bg-background text-foreground",
  input: "w-full px-3 py-2 text-sm focus:outline-none focus:ring-2",
  sm: "h-8 px-2",
  md: "h-10 px-3",
  lg: "h-12 px-4",
  default: "border-gray-300 dark:border-gray-600",
  outlined: "border-gray-400",
  error: "border-red-500 focus:ring-red-500",
  calendar: "absolute inset-0 m-auto h-5 w-5 opacity-50",
  preset: "px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800",
  panel: "absolute z-10 mt-1 rounded-md border bg-background p-3 shadow-lg",
};

export const DATE_PICKER_PRESETS: { key: string; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "last7days", label: "Last 7 days" },
  { key: "last30days", label: "Last 30 days" },
  { key: "thisMonth", label: "This month" },
  { key: "thisYear", label: "This year" },
];
