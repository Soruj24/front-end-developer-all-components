export const INPUT_GROUP_VARIANTS = {
  default: "default",
  outline: "outline",
} as const;

export const INPUT_GROUP_STYLES: Record<string, string> = {
  base: "flex items-center rounded-md border transition-colors focus-within:ring-2",
  default: "border-gray-300 dark:border-gray-600",
  outline: "border-gray-400 dark:border-gray-500 bg-transparent",
};
