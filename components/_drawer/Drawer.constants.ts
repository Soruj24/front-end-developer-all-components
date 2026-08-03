export const DRAWER_STYLES: Record<string, string> = {
  overlay: "fixed inset-0 z-50 bg-black/50",
  content: "fixed z-50 flex flex-col bg-background p-6 shadow-xl",
  top: "inset-x-0 top-0 h-auto max-w-full rounded-b-none",
  right: "inset-y-0 right-0 h-full w-80 max-w-full rounded-l-none",
  bottom: "inset-x-0 bottom-0 h-auto max-w-full rounded-t-none",
  left: "inset-y-0 left-0 h-full w-80 max-w-full rounded-r-none",
  close: "absolute right-4 top-4 rounded-sm opacity-50 hover:opacity-100",
  title: "text-lg font-semibold",
  description: "text-sm text-gray-600 dark:text-gray-400",
};
