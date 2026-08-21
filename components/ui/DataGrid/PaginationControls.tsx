"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const PaginationControls = forwardRef<HTMLDivElement, PaginationControlsProps>(
  ({ page, totalPages, onPageChange, className }, ref) => {
    const getVisiblePages = (): (number | "...")[] => {
      if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i);
      const pages: (number | "...")[] = [0];
      if (page > 2) pages.push("...");
      for (let i = Math.max(1, page - 1); i <= Math.min(totalPages - 2, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 3) pages.push("...");
      if (totalPages > 1) pages.push(totalPages - 1);
      return pages;
    };

    return (
      <div ref={ref} className={cn("flex items-center gap-1", className)} role="navigation" aria-label="Pagination">
        <Btn onClick={() => onPageChange(0)} disabled={page === 0} label="First page">
          <ChevronsLeft className="h-4 w-4" />
        </Btn>
        <Btn onClick={() => onPageChange(page - 1)} disabled={page === 0} label="Previous page">
          <ChevronLeft className="h-4 w-4" />
        </Btn>
        {getVisiblePages().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-1 text-xs text-muted-foreground/40">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                "h-8 min-w-[2rem] rounded-lg px-2 text-xs font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                "active:scale-95",
                page === p
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
              aria-current={page === p ? "page" : undefined}
            >
              {p + 1}
            </button>
          ),
        )}
        <Btn onClick={() => onPageChange(page + 1)} disabled={page === totalPages - 1} label="Next page">
          <ChevronRight className="h-4 w-4" />
        </Btn>
        <Btn onClick={() => onPageChange(totalPages - 1)} disabled={page === totalPages - 1} label="Last page">
          <ChevronsRight className="h-4 w-4" />
        </Btn>
      </div>
    );
  },
);

PaginationControls.displayName = "PaginationControls";

function Btn({ onClick, disabled, label, children }: { onClick: () => void; disabled: boolean; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95"
    >
      {children}
    </button>
  );
}

export default PaginationControls;
