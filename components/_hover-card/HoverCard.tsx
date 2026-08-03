"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { HoverCardProps } from "./HoverCard.types";
import { HOVER_CARD_STYLES } from "./HoverCard.constants";

export function HoverCard({ trigger, content, openDelay = 200, closeDelay = 150, offset = 8, contentClassName }: HoverCardProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const openTimer = React.useRef<NodeJS.Timeout | null>(null);
  const closeTimer = React.useRef<NodeJS.Timeout | null>(null);

  const clearTimeouts = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const handleMouseEnter = () => {
    clearTimeouts();
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  };

  const handleMouseLeave = () => {
    clearTimeouts();
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
  };

  React.useEffect(() => {
    return () => clearTimeouts();
  }, []);

  return (
    <span
      ref={triggerRef}
      className={HOVER_CARD_STYLES.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {trigger}
      {open && (
        <div ref={contentRef} className={cn(HOVER_CARD_STYLES.content, contentClassName)}>
          {content}
        </div>
      )}
    </span>
  );
}
