"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { CollapsibleProps } from "./Collapsible.types";

export function Collapsible({
  open: controlledOpen,
  onOpenChange,
  trigger,
  children,
  className,
}: CollapsibleProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isOpen = controlledOpen ?? uncontrolledOpen;
  const setIsOpen = onOpenChange ?? setUncontrolledOpen;

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between"
      >
        {trigger}
        <svg
          className={cn(
            "h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-2 overflow-hidden animate-in slide-in-from-top-1">
          {children}
        </div>
      )}
    </div>
  );
}
