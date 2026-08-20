"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  LAYOUT,
  BORDER,
  BG,
  RADIUS,
  TRANSITION,
  TEXT,
} from "@/constants/tokens";

interface MobileHeaderProps {
  className?: string;
}

export function MobileHeader({ className }: MobileHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4",
        LAYOUT.headerHeight,
        BORDER.default,
        "lg:hidden",
        className,
      )}
    >
      <Link
        href="/"
        className={cn(
          "flex items-center gap-2.5",
          `${TRANSITION.opacity} hover:opacity-80`,
        )}
        aria-label="Component Registry - Home"
      >
        <div
          className={cn(
            "flex h-7 w-7 items-center justify-center",
            RADIUS.lg,
            BG.primary,
            "text-background",
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
        <span className={cn("font-semibold tracking-tight text-foreground", TEXT.brand)}>
          Registry
        </span>
      </Link>
    </div>
  );
}
