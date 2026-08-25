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
          className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-background"
        />
      )}
      <div className={cn("max-w-[75%]")}>
        {!isSent && sender && (
          <p className="mb-1 text-xs font-medium text-muted-foreground">
            {sender}
          </p>
        )}
        <div
          className={cn(
            "rounded-2xl px-4 py-2 text-sm",
            "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            isSent
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground",
          )}
        >
          {message}
        </div>
        {timestamp && (
          <p
            className={cn(
              "mt-1 text-xs text-muted-foreground/60",
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
