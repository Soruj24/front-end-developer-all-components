"use client";

import { cn } from "@/lib/cn";
import type { BubbleProps } from "./Bubble.types";

export function Bubble({
  message,
  sender,
  timestamp,
  variant = "received",
  avatar,
  className,
}: BubbleProps) {
  const isSent = variant === "sent";

  return (
    <div
      className={cn(
        "flex gap-2",
        isSent ? "justify-end" : "justify-start",
        className
      )}
    >
      {!isSent && avatar && (
        <img
          src={avatar}
          alt={sender ?? "avatar"}
          className="h-8 w-8 shrink-0 rounded-full object-cover"
        />
      )}
      <div className={cn("max-w-[75%]")}>
        {!isSent && sender && (
          <p className="mb-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            {sender}
          </p>
        )}
        <div
          className={cn(
            "rounded-2xl px-4 py-2 text-sm",
            isSent
              ? "bg-blue-600 text-white"
              : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
          )}
        >
          {message}
        </div>
        {timestamp && (
          <p
            className={cn(
              "mt-1 text-xs text-zinc-400",
              isSent ? "text-right" : "text-left"
            )}
          >
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
