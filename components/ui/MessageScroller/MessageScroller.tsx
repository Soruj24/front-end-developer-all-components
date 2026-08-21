"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { MessageScrollerProps } from "./MessageScroller.types";

export function MessageScroller({
  messages,
  autoScroll = true,
  className,
}: MessageScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    if (autoScroll && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, autoScroll]);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    setShowScrollDown(!atBottom);
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={cn("relative flex flex-col", className)}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        role="log"
        aria-label="Messages"
        aria-live="polite"
        className="flex flex-1 flex-col gap-1 overflow-y-auto rounded-2xl border border-border bg-card p-3 scroll-smooth dark:bg-card/50"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="group flex flex-col gap-0.5 rounded-xl bg-muted/50 px-3.5 py-2.5 transition-colors duration-150 hover:bg-muted/80"
          >
            <p className="text-sm leading-relaxed text-foreground">{msg.content}</p>
            {msg.timestamp && (
              <span className="text-xs text-muted-foreground/60">{msg.timestamp}</span>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      {showScrollDown && (
        <button
          type="button"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
          className={cn(
            "absolute bottom-3 left-1/2 -translate-x-1/2 z-10",
            "inline-flex h-8 w-8 items-center justify-center rounded-full",
            "border border-border bg-card text-muted-foreground shadow-md",
            "transition-all duration-200 hover:bg-muted hover:text-foreground hover:shadow-lg",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            "active:scale-95",
          )}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      )}
    </div>
  );
}
