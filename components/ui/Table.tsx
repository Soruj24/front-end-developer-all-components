import { type ReactNode, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";

export type TableSize = "sm" | "md" | "lg";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
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
  size?: TableSize;
  compact?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: Record<string, unknown>) => void;
}

const CELL_SIZES: Record<TableSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-3 text-sm",
  lg: "px-5 py-4 text-base",
};

const ALIGN: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function SortIcon({ direction }: { direction: "asc" | "desc" | undefined }) {
  return (
    <span className="inline-flex flex-col leading-none">
      <svg
        className={cn(
          "h-2.5 w-2.5",
          direction === "asc" ? "text-primary" : "text-muted-foreground/30",
        )}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
      <svg
        className={cn(
          "h-2.5 w-2.5 -mt-0.5",
          direction === "desc" ? "text-primary" : "text-muted-foreground/30",
        )}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
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
  size = "md",
  compact = false,
  emptyMessage = "No data available",
  onRowClick,
}: TableProps) {
  const allSelected = useMemo(
    () =>
      data.length > 0 &&
      data.every((row) => selectedRows.includes(row[rowKey] as string)),
    [data, selectedRows, rowKey],
  );

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
    [onSelectionChange, selectedRows],
  );

  const cell = compact ? "px-3 py-1.5 text-xs" : CELL_SIZES[size];
  const headerCell = compact
    ? "px-3 py-2 text-[11px]"
    : size === "lg"
      ? "px-5 py-3.5 text-xs"
      : "px-4 py-3 text-xs";

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-background">
      <table className="w-full border-collapse">
        <caption className="sr-only">Data table</caption>
        <thead>
          <tr
            className={cn(
              "border-b border-border/60 bg-muted/50",
              stickyHeader && "sticky top-0 z-10",
            )}
          >
            {onSelectionChange && (
              <th scope="col" className={cn("w-10", headerCell)}>
                <label className="inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    aria-label="Select all rows"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-border/60 bg-background text-primary focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 focus:ring-offset-background"
                  />
                </label>
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
                className={cn(
                  headerCell,
                  "text-left font-semibold uppercase tracking-wider text-muted-foreground/70",
                  ALIGN[col.align ?? "left"],
                  col.sortable &&
                    "cursor-pointer select-none transition-colors hover:text-foreground",
                )}
              >
                <button
                  type="button"
                  disabled={!col.sortable}
                  onClick={() => {
                    if (col.sortable && onSort) {
                      onSort(
                        col.key,
                        sortKey === col.key && sortDirection === "asc"
                          ? "desc"
                          : "asc",
                      );
                    }
                  }}
                  className="inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-default"
                >
                  {col.label}
                  {col.sortable && (
                    <SortIcon
                      direction={
                        sortKey === col.key ? sortDirection : undefined
                      }
                    />
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (onSelectionChange ? 1 : 0)}
                className="px-6 py-16 text-center text-sm text-muted-foreground"
              >
                <div className="flex flex-col items-center gap-2">
                  <svg
                    className="h-10 w-10 text-muted-foreground/30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3h18v18H3z" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                    <path d="M9 3v18" />
                  </svg>
                  <span>{emptyMessage}</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, idx) => {
              const key = row[rowKey] as string;
              const isSelected = selectedRows.includes(key);
              return (
                <tr
                  key={key}
                  className={cn(
                    "border-b border-border/60 transition-colors last:border-0",
                    isSelected
                      ? "bg-primary/5"
                      : striped && idx % 2 === 1
                        ? "bg-muted/30"
                        : "bg-background",
                    onRowClick
                      ? "cursor-pointer hover:bg-muted/60"
                      : "hover:bg-muted/40",
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {onSelectionChange && (
                    <td className={cell}>
                      <label className="inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          aria-label={`Select row ${key}`}
                          checked={isSelected}
                          onChange={() => handleSelectRow(key)}
                          className="h-4 w-4 rounded border-border/60 bg-background text-primary focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 focus:ring-offset-background"
                        />
                      </label>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(cell, "text-foreground", ALIGN[col.align ?? "left"])}
                    >
                      {row[col.key] as ReactNode}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
