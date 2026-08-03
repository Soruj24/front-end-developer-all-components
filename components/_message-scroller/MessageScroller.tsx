import * as React from "react";
import { cn } from "@/lib/cn";
import type { MessageScrollerProps } from "./MessageScroller.types";

function useAutoScroll(containerRef: React.RefObject<HTMLDivElement | null>, deps: unknown[]) {
  React.useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, deps);
}

export function MessageScroller({ children, autoScroll = true, showScrollButton = true, emptyMessage, messageCount = 0, className, ...props }: MessageScrollerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  useAutoScroll(containerRef, [children, messageCount]);

  const [showTopButton, setShowTopButton] = React.useState(false);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    setShowTopButton(el.scrollTop > 100);
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={cn("relative h-full w-full", className)} {...props}>
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto"
        onScroll={handleScroll}
      >
        {messageCount === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">{emptyMessage}</div>
        ) : (
          <div className="space-y-4 p-4">{children}</div>
        )}
      </div>
      {showScrollButton && showTopButton && (
        <button
          onClick={scrollToTop}
          className="absolute bottom-4 right-4 rounded-full bg-blue-500 p-2 text-white shadow-lg hover:bg-blue-600"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
