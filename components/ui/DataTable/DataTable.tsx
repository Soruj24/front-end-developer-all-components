"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { DataTableProps, DataTableColumn } from "./DataTable.types";

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 10,
  className,
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }: { col: DataTableColumn<T> }) => {
    if (!col.sortable) return null;
    return (
      <svg
        className={cn(
          "ml-1 inline h-3 w-3",
          sortKey === col.key ? "text-blue-600" : "text-zinc-300"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && toggleSort(col.key)}
                  className={cn(
                    "px-4 py-3 text-left font-medium text-zinc-500 dark:text-zinc-400",
                    col.sortable && "cursor-pointer select-none hover:text-zinc-700",
                    col.className
                  )}
                >
                  {col.header}
                  <SortIcon col={col} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {paged.map((row, i) => (
              <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-4 py-3", col.className)}>
                    {col.render
                      ? col.render(row, i)
                      : (row[col.key] as React.ReactNode) ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-zinc-400"
                >
                  No data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-zinc-500">
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
