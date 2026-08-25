"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/cn";
import { TooltipProps } from "./Tooltip.types";

const sideClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export default function Tooltip({
  content,
  children,
  side = "top",
  delayDuration = 300,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delayDuration);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-50 animate-fade-in-fast",
            sideClasses[side],
            className
          )}
        >
          <div className="whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-popover ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}
