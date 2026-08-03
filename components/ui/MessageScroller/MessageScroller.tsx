"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import type { MessageScrollerProps } from "./MessageScroller.types";

export function MessageScroller({
  messages,
  autoScroll = true,
  className,
}: MessageScrollerProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-y-auto rounded-md border bg-white p-3 dark:bg-zinc-900",
        className
      )}
    >
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col gap-0.5">
          <p className="text-sm text-zinc-900 dark:text-zinc-100">{msg.content}</p>
          {msg.timestamp && (
            <span className="text-xs text-zinc-400">{msg.timestamp}</span>
          )}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
