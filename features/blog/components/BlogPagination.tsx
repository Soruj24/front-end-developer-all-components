import { cn } from "@/lib/cn";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: BlogPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)}>
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
          "border border-border text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "disabled:pointer-events-none disabled:opacity-40"
        )}
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange?.(page)}
          className={cn(
            "h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors",
            page === currentPage
              ? "bg-primary text-primary-foreground shadow-sm"
              : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
          "border border-border text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "disabled:pointer-events-none disabled:opacity-40"
        )}
      >
        Next
      </button>
    </div>
  );
}
