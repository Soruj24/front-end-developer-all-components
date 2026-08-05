"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface SiteHeaderNotificationsProps {
  count?: number;
  className?: string;
}

export function SiteHeaderNotifications({
  count = 0,
  className,
}: SiteHeaderNotificationsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative hidden h-9 w-9 items-center justify-center rounded-full",
          "text-zinc-400 transition-all duration-200",
          "hover:bg-zinc-800/60 hover:text-zinc-200 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
          "md:flex",
          className
        )}
        aria-label={`Notifications${count > 0 ? ` (${count} unread)` : ""}`}
        aria-expanded={isOpen}
      >
        <svg
          className="h-[18px] w-[18px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
        {count > 0 && (
          <span
            className={cn(
              "absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center",
              "rounded-full bg-danger text-[10px] font-bold text-danger-foreground",
              "animate-pop"
            )}
          >
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>
    </div>
  );
}
