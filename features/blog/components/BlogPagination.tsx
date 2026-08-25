import { cn } from "@/lib/cn";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

function generatePages(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  if (current <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push("...");
    pages.push(total);
  } else if (current >= total - 3) {
    pages.push(1);
    pages.push("...");
    for (let i = total - 4; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("...");
    for (let i = current - 1; i <= current + 1; i++) pages.push(i);
    pages.push("...");
    pages.push(total);
  }

  return pages;
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: BlogPaginationProps) {
  const pages = generatePages(currentPage, totalPages);

  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)}>
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all",
          "border border-border/60 text-muted-foreground shadow-sm",
          "hover:bg-accent hover:text-foreground hover:border-border",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "disabled:pointer-events-none disabled:opacity-40",
          "active:scale-[0.97]",
        )}
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Prev
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={cn(
              "h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "active:scale-[0.97]",
              page === currentPage
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                : "border border-border/60 text-muted-foreground shadow-sm hover:bg-accent hover:text-foreground hover:border-border",
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all",
          "border border-border/60 text-muted-foreground shadow-sm",
          "hover:bg-accent hover:text-foreground hover:border-border",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          "disabled:pointer-events-none disabled:opacity-40",
          "active:scale-[0.97]",
        )}
      >
        Next
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
