"use client";

import React, { useState, useRef, useEffect, useCallback, isValidElement } from "react";
import { cn } from "@/lib/cn";
import type { HoverCardProps } from "./HoverCard.types";

export function HoverCard({
  trigger,
  children,
  open: controlledOpen,
  onOpenChange,
  delayDuration = 300,
  className,
}: HoverCardProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scheduleOpen = useCallback(() => {
    timerRef.current = setTimeout(() => setOpen(true), delayDuration);
  }, [delayDuration, setOpen]);

  const scheduleClose = useCallback(() => {
    clearTimeout(timerRef.current!);
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current!);
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        scheduleClose();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [scheduleClose]);

  const triggerEl = isValidElement(trigger)
    ? <span onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}>{trigger}</span>
    : <span onMouseEnter={scheduleOpen} onMouseLeave={scheduleClose}>{trigger}</span>;

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      {triggerEl}
      {open && (
        <div
          onMouseEnter={scheduleOpen}
          onMouseLeave={scheduleClose}
          className="absolute z-50 mt-2 w-80 rounded-md border bg-white p-4 shadow-md dark:bg-zinc-900 dark:border-zinc-700"
        >
          {children}
        </div>
      )}
    </div>
  );
}
