"use client";

import { useCallback, type ReactNode } from "react";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface TableProps {
  columns: Column[];
  data: Array<Record<string, unknown>>;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  selectedRows?: string[];
  onSelectionChange?: (keys: string[]) => void;
  rowKey?: string;
  striped?: boolean;
  stickyHeader?: boolean;
}

function Table({
  columns = [],
  data = [],
  onSort,
  sortKey,
  sortDirection = "asc",
  selectedRows = [],
  onSelectionChange,
  rowKey = "id",
  striped = false,
  stickyHeader = false,
}: TableProps) {
  const allSelected = data.length > 0 && data.every((row) => selectedRows.includes(row[rowKey] as string));

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return;
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((row) => row[rowKey] as string));
    }
  }, [onSelectionChange, allSelected, data, rowKey]);

  const handleSelectRow = useCallback(
    (key: string) => {
      if (!onSelectionChange) return;
      const idx = selectedRows.indexOf(key);
      if (idx === -1) {
        onSelectionChange([...selectedRows, key]);
      } else {
        const next = [...selectedRows];
        next.splice(idx, 1);
        onSelectionChange(next);
      }
    },
    [onSelectionChange, selectedRows]
  );

  return (
    <div className="w-full overflow-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">Data table</caption>
        <thead>
          <tr
            className={`border-b border-border bg-muted text-left ${
              stickyHeader ? "sticky top-0" : ""
            }`}
          >
            {onSelectionChange && (
              <th scope="col" className="w-10 px-3 py-3">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={allSelected}
                  onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-border text-foreground focus:ring-ring"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                aria-sort={
                  col.sortable && sortKey === col.key
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
                className={`px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground ${
                  col.sortable ? "cursor-pointer select-none hover:text-foreground" : ""
                }`}
              >
                <button
                  type="button"
                  disabled={!col.sortable}
                  onClick={() => {
                    if (col.sortable && onSort) {
                      onSort(col.key, sortKey === col.key && sortDirection === "asc" ? "desc" : "asc");
                    }
                  }}
                  className="inline-flex items-center gap-1 focus-visible:ring-ring outline-none focus-visible:ring-2"
                >
                  {col.label}
                  {col.sortable && (
                    <span className="inline-flex flex-col leading-none">
                      <span
                        className={`text-[10px] ${
                          sortKey === col.key && sortDirection === "asc"
                            ? "text-foreground"
                            : "text-subtle"
                        }`}
                      >
                        ▲
                      </span>
                      <span
                        className={`text-[10px] ${
                          sortKey === col.key && sortDirection === "desc"
                            ? "text-foreground"
                            : "text-subtle"
                        }`}
                      >
                        ▼
                      </span>
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            const key = row[rowKey] as string;
            const isSelected = selectedRows.includes(key);
            return (
              <tr
                key={key}
                className={`border-b border-border transition-colors ${
                  isSelected
                    ? "bg-muted"
                    : striped && idx % 2 === 1
                      ? "bg-muted/50"
                      : "bg-background"
                } hover:bg-muted`}
              >
                {onSelectionChange && (
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${key}`}
                      checked={isSelected}
                      onChange={() => handleSelectRow(key)}
                  className="h-4 w-4 rounded border-border text-foreground focus:ring-ring"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-3 text-foreground">
                    {row[col.key] as ReactNode}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="flex items-center justify-center px-6 py-12 text-sm text-muted-foreground">
          No data available
        </div>
      )}
    </div>
  );
}

export default Table;
