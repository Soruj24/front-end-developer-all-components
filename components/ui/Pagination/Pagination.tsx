"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { InlineSelect } from "@/components/ui/InlineSelect";
import type { PaginationProps } from "./Pagination.types";

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  pageSize = 10,
  onPageSizeChange,
  totalItems,
  className,
}: PaginationProps) {
  const pages = useMemo(() => {
    const totalSiblings = siblingCount * 2 + 3;
    if (totalPages <= totalSiblings) return range(1, totalPages);
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);
    const showLeft = currentPage > siblingCount + 2;
    const showRight = currentPage < totalPages - siblingCount - 1;
    if (!showLeft && showRight) return [...range(1, totalSiblings - 2), "ellipsis", totalPages];
    if (showLeft && !showRight) return [1, "ellipsis", ...range(totalPages - (totalSiblings - 3), totalPages)];
    return [1, "ellipsis", ...range(leftSibling, rightSibling), "ellipsis", totalPages];
  }, [currentPage, totalPages, siblingCount]);

  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;

  return (
    <nav className={cn("flex flex-wrap items-center justify-between gap-4", className)} aria-label="Pagination">
      <div className="flex items-center gap-1" role="list">
        {showFirstLast && (
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            aria-label="First page"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium",
              "transition-colors duration-150",
              "text-muted-foreground hover:bg-muted hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
              "active:bg-muted/80",
              "disabled:pointer-events-none disabled:opacity-40",
            )}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
            </svg>
          </button>
        )}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium",
            "transition-colors duration-150",
            "text-muted-foreground hover:bg-muted hover:text-foreground",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            "active:bg-muted/80",
            "disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
              aria-hidden="true"
            >
              &#x2026;
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium",
                "transition-colors duration-150",
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
                "active:bg-muted/80",
                page === currentPage
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {page}
            </button>
          ),
        )}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium",
            "transition-colors duration-150",
            "text-muted-foreground hover:bg-muted hover:text-foreground",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            "active:bg-muted/80",
            "disabled:pointer-events-none disabled:opacity-40",
          )}
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
        {showFirstLast && (
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            aria-label="Last page"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium",
              "transition-colors duration-150",
              "text-muted-foreground hover:bg-muted hover:text-foreground",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
              "active:bg-muted/80",
              "disabled:pointer-events-none disabled:opacity-40",
            )}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex items-center gap-4">
        {totalItems !== undefined && (
          <span className="text-sm text-muted-foreground">
            Showing {startItem}&ndash;{endItem} of {totalItems}
          </span>
        )}
        {onPageSizeChange && (
          <InlineSelect
            options={[5, 10, 20, 50, 100].map((size) => ({
              value: String(size),
              label: size + " / page",
            }))}
            value={String(pageSize)}
            onChange={(val) => onPageSizeChange(Number(val))}
            size="sm"
            aria-label="Rows per page"
            className={cn(
              "h-9 rounded-lg border border-border bg-card px-2.5 py-1 text-sm",
              "transition-colors duration-150",
              "hover:border-muted-foreground/30",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            )}
          />
        )}
      </div>
    </nav>
  );
}
