"use client";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  totalItems?: number;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  pageSize = 10,
  onPageSizeChange,
  totalItems,
}: PaginationProps) => {
  const totalSiblings = siblingCount * 2 + 3;

  const showLeftEllipsis = currentPage > siblingCount + 2;
  const showRightEllipsis = currentPage < totalPages - siblingCount - 1;

  let pages: (number | "ellipsis")[];

  if (totalPages <= totalSiblings) {
    pages = range(1, totalPages);
  } else {
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = range(1, totalSiblings - 2);
      pages = [...leftRange, "ellipsis", totalPages];
    } else if (showLeftEllipsis && !showRightEllipsis) {
      const rightRange = range(totalPages - (totalSiblings - 3), totalPages);
      pages = [1, "ellipsis", ...rightRange];
    } else {
      const middleRange = range(leftSibling, rightSibling);
      pages = [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
    }
  }

  const btnBase =
    "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const btnActive =
    "bg-foreground text-background";
  const btnInactive =
    "text-muted-foreground hover:bg-muted";
  const btnNav =
    "text-muted-foreground hover:bg-muted";

  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-1">
        {showFirstLast && (
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(1)}
            className={btnNav}
            aria-label="First page"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="11 17 6 12 11 7" />
              <polyline points="18 17 13 12 18 7" />
            </svg>
          </button>
        )}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={btnNav}
          aria-label="Previous page"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
            >
              &#x2026;
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`${btnBase} ${page === currentPage ? btnActive : btnInactive}`}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={btnNav}
          aria-label="Next page"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {showFirstLast && (
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(totalPages)}
            className={btnNav}
            aria-label="Last page"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
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
          <select
            value={pageSize}
            aria-label="Rows per page"
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-lg border border-border bg-transparent px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {[5, 10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Pagination;
