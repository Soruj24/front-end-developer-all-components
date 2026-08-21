"use client";

import { forwardRef, useMemo } from "react";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import type { PaginationBarProps, PaginationBarVariant, PaginationBarSize } from "./PaginationBar.types";

const SIZE_MAP: Record<PaginationBarSize, { btn: string; nav: string }> = {
  sm: { btn: "h-8 min-w-[32px] text-xs", nav: "h-8 text-xs" },
  md: { btn: "h-9 min-w-[36px] text-sm", nav: "h-9 text-sm" },
  lg: { btn: "h-11 min-w-[44px] text-base", nav: "h-11 text-base" },
};

const VARIANT_MAP: Record<PaginationBarVariant, { btn: string; active: string; inactive: string }> = {
  default: {
    btn: "rounded-md",
    active: "bg-foreground text-background dark:bg-muted dark:text-zinc-900",
    inactive: "border-border hover:bg-muted",
  },
  pill: {
    btn: "rounded-full",
    active: "bg-foreground text-background dark:bg-muted dark:text-zinc-900",
    inactive: "border-border hover:bg-muted",
  },
  outline: {
    btn: "rounded-md",
    active: "border-primary text-primary bg-primary/10",
    inactive: "border-border hover:bg-muted",
  },
};

function getPageNumbers(current: number, total: number): (number | "...")[] {
  const pages: (number | "...")[] = [];
  const delta = 1;
  const s = Math.max(2, current - delta);
  const e = Math.min(total - 1, current + delta);
  pages.push(1);
  if (s > 2) pages.push("...");
  for (let i = s; i <= e; i++) pages.push(i);
  if (e < total - 1) pages.push("...");
  if (total > 1) pages.push(total);
  return pages;
}

const PaginationBar = forwardRef<HTMLDivElement, PaginationBarProps>(
  ({ current, total, onChange, variant = "default", size = "md", showFirstLast = true, showInfo = false, className }, ref) => {
    const pages = useMemo(() => getPageNumbers(current, total), [current, total]);
    const s = SIZE_MAP[size];
    const v = VARIANT_MAP[variant];

    return (
      <div ref={ref} className={cn("flex min-w-0 max-w-full items-center gap-1 overflow-x-auto pb-1", className)}>
        {showInfo && (
          <span className="mr-2 whitespace-nowrap text-xs text-muted-foreground">
            Page {current} of {total}
          </span>
        )}
        {showFirstLast && (
          <button
            type="button"
            onClick={() => onChange(1)}
            disabled={current === 1}
            className={cn(s.btn, v.btn, "flex items-center justify-center border border-border disabled:opacity-40", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1")}
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => onChange(Math.max(1, current - 1))}
          disabled={current === 1}
          className={cn(s.nav, v.btn, "flex items-center gap-1 border border-border px-2 disabled:opacity-40", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>
        <div className="flex items-center gap-1">
          {pages.map((page, i) =>
            page === "..." ? (
              <span
                key={`e${i}`}
                className={cn(s.btn, v.btn, "flex items-center justify-center text-sm text-muted-foreground/70")}
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onChange(page)}
                className={cn(
                  s.btn,
                  v.btn,
                  "flex items-center justify-center border px-2",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1",
                  page === current ? v.active : v.inactive,
                )}
              >
                {page}
              </button>
            ),
          )}
        </div>
        <button
          type="button"
          onClick={() => onChange(Math.min(total, current + 1))}
          disabled={current === total}
          className={cn(s.nav, v.btn, "flex items-center gap-1 border border-border px-2 disabled:opacity-40", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1")}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
        {showFirstLast && (
          <button
            type="button"
            onClick={() => onChange(total)}
            disabled={current === total}
            className={cn(s.btn, v.btn, "flex items-center justify-center border border-border disabled:opacity-40", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1")}
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);

PaginationBar.displayName = "PaginationBar";

export { PaginationBar };
