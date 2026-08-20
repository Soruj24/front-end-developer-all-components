"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

interface MobileHeaderProps {
  className?: string;
}

export function MobileHeader({ className }: MobileHeaderProps) {
  return (
    <div
      className={cn(
        "flex h-14 items-center justify-between px-4",
        "border-b border-border/60",
        "lg:hidden",
        className,
      )}
    >
      <Link
        href="/"
        className={cn(
          "flex items-center gap-2.5",
          "transition-opacity hover:opacity-80",
        )}
        aria-label="Component Registry - Home"
      >
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg",
            "bg-foreground text-background",
          )}
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Registry
        </span>
      </Link>
    </div>
  );
}
