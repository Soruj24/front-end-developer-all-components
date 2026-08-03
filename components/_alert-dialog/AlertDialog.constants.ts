export const ALERT_DIALOG_STYLES = {
  overlay: "fixed inset-0 z-50 bg-black/50",
  content: "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-xl",
  title: "text-lg font-semibold",
  description: "text-sm text-gray-600 dark:text-gray-400",
  actions: "flex justify-end gap-2",
  confirm: "rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
  cancel: "rounded-md border border-gray-300 px-4 py-2 text-gray-900 dark:border-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800",
  destructive: "rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600",
} as const;
