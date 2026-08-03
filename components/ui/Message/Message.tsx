"use client";

import { cn } from "@/lib/cn";
import type { MessageProps, MessageVariant } from "./Message.types";

const variantStyles: Record<MessageVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
  success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100",
  error: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
};

const variantIcons: Record<MessageVariant, string> = {
  info: "ℹ",
  success: "✓",
  warning: "⚠",
  error: "✕",
};

export function Message({
  variant = "info",
  title,
  description,
  className,
}: MessageProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-md border p-4",
        variantStyles[variant],
        className
      )}
    >
      <span className="mt-0.5 text-lg leading-none">{variantIcons[variant]}</span>
      <div className="flex-1 space-y-1">
        {title && <p className="text-sm font-medium leading-none">{title}</p>}
        {description && <p className="text-sm leading-relaxed opacity-80">{description}</p>}
      </div>
    </div>
  );
}
