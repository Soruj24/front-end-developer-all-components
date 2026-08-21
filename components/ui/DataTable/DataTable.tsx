"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { DataTableProps } from "./DataTable.types";

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  showPageSizeSelector = true,
  className,
  emptyMessage = "No results found.",
  onRowClick,
  striped = false,
  compact = false,
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = String(av).localeCompare(String(bv), undefined, {
        numeric: true,
      });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const startRow = page * pageSize + 1;
  const endRow = Math.min((page + 1) * pageSize, sorted.length);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(0);
  };

  const cellPadding = compact ? "px-3 py-1.5" : "px-4 py-3";

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && toggleSort(col.key)}
                    className={cn(
                      cellPadding,
                      "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                      alignClass[col.align ?? "left"],
                      col.sortable &&
                        "cursor-pointer select-none transition-colors hover:text-foreground",
                      sortKey === col.key && "text-foreground",
                      col.className,
                    )}
                    scope="col"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {col.header}
                      {col.sortable && (
                        <span className="inline-flex flex-col" aria-hidden="true">
                          <svg
                            className={cn(
                              "h-3 w-3 -mb-0.5",
                              sortKey === col.key && sortDir === "asc"
                                ? "text-foreground"
                                : "text-muted-foreground/40",
                            )}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M7 15l5-5 5 5z" />
                          </svg>
                          <svg
                            className={cn(
                              "h-3 w-3 -mt-0.5",
                              sortKey === col.key && sortDir === "desc"
                                ? "text-foreground"
                                : "text-muted-foreground/40",
                            )}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M7 9l5 5 5-5z" />
                          </svg>
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paged.map((row, i) => (
                <tr
                  key={page * pageSize + i}
                  onClick={() => onRowClick?.(row, page * pageSize + i)}
                  className={cn(
                    "transition-colors",
                    striped && (page * pageSize + i) % 2 === 1 && "bg-muted/30",
                    onRowClick &&
                      "cursor-pointer hover:bg-muted/50",
                    !onRowClick && "hover:bg-muted/30",
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        cellPadding,
                        "text-foreground",
                        alignClass[col.align ?? "left"],
                        col.className,
                      )}
                    >
                      {col.render
                        ? col.render(row, page * pageSize + i)
                        : ((row[col.key] as React.ReactNode) ?? (
                            <span className="text-muted-foreground/50">&mdash;</span>
                          ))}
                    </td>
                  ))}
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-sm text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 0 && (
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Showing {startRow}&ndash;{endRow} of {sorted.length}
            </span>
            {showPageSizeSelector && (
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(0);
                }}
                className="h-7 rounded-lg border border-border bg-card px-2 text-xs text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                aria-label="Rows per page"
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size} / page
                  </option>
                ))}
              </select>
            )}
          </div>

          {totalPages > 1 && (
            <nav className="flex items-center gap-1" aria-label="Pagination">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i;
                } else if (page < 3) {
                  pageNum = i;
                } else if (page > totalPages - 4) {
                  pageNum = totalPages - 5 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors",
                      page === pageNum
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted",
                    )}
                    aria-label={`Page ${pageNum + 1}`}
                    aria-current={page === pageNum ? "page" : undefined}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}

              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}
