export const MESSAGE_VARIANTS = {
  default: "default",
  bubble: "bubble",
} as const;

export const MESSAGE_POSITIONS = {
  sent: "sent",
  received: "received",
} as const;

export const MESSAGE_STYLES: Record<string, string> = {
  base: "flex gap-3",
  sent: "justify-end",
  received: "justify-start",
  bubble: "max-w-[70%]",
  content: "rounded-2xl px-4 py-2",
  sentContent: "bg-blue-500 text-white",
  receivedContent: "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
  avatar: "h-8 w-8 flex-shrink-0 rounded-full",
  meta: "mt-1 text-xs opacity-60",
};
