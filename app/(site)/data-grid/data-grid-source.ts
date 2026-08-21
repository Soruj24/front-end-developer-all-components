export const DATAGRID_SOURCE = `"use client";

import { forwardRef, useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/cn";
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from "lucide-react";

interface DataGridColumn<T> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
}

interface DataGridProps<T extends Record<string, unknown>> {
  columns: DataGridColumn<T>[];
  data: T[];
  sortable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  striped?: boolean;
  compact?: boolean;
  showRowNumbers?: boolean;
  onRowClick?: (row: T) => void;
  emptyContent?: React.ReactNode;
  className?: string;
  defaultSortKey?: keyof T & string;
  defaultSortDir?: "asc" | "desc";
}

const DataGridInner = forwardRef(function DataGridInner<T extends Record<string, unknown>>(
  { columns, data, sortable = true, pagination = true, pageSize = 10, searchable = true, searchPlaceholder = "Search...", striped = false, compact = false, showRowNumbers = false, onRowClick, emptyContent, className, defaultSortKey, defaultSortDir }: DataGridProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  const [sort, setSort] = useState<{ key: string | null; dir: "asc" | "desc" | null }>({ key: defaultSortKey ?? null, dir: defaultSortDir ?? null });
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [focusedRow, setFocusedRow] = useState(-1);

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) => columns.some((col) => { const val = row[col.key]; return val !== undefined && String(val).toLowerCase().includes(q); }));
  }, [search, data, columns]);

  const sorted = useMemo(() => {
    if (!sort.key || !sort.dir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sort.key as keyof T]; const bv = b[sort.key as keyof T];
      if (typeof av === "number" && typeof bv === "number") return sort.dir === "asc" ? av - bv : bv - av;
      return sort.dir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [filtered, sort.key, sort.dir]);

  const totalPages = pagination ? Math.ceil(sorted.length / pageSize) : 1;
  const paged = pagination ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted;

  const toggleSort = useCallback((key: string) => {
    if (!sortable) return;
    setSort((prev) => {
      if (prev.key === key) { if (prev.dir === "asc") return { key, dir: "desc" }; if (prev.dir === "desc") return { key: null, dir: null }; }
      return { key, dir: "asc" };
    });
    setPage(0);
  }, [sortable]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, rowIdx: number) => {
    if (e.key === "ArrowDown" && rowIdx < paged.length - 1) { e.preventDefault(); setFocusedRow(rowIdx + 1); }
    else if (e.key === "ArrowUp" && rowIdx > 0) { e.preventDefault(); setFocusedRow(rowIdx - 1); }
    else if (e.key === "Enter" && onRowClick) { onRowClick(paged[rowIdx]); }
  }, [paged, onRowClick]);

  const pad = compact ? "px-3 py-2" : "px-4 py-3";

  return (
    <div ref={ref} className={cn("flex w-full flex-col gap-3", className)}>
      {searchable && (
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
          <input type="text" placeholder={searchPlaceholder} value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full rounded-lg border border-border/60 bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/10" />
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-border/60">
        <table className="w-full text-sm" role="grid">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              {showRowNumbers && <th className={pad + " w-12 text-left text-xs font-medium text-muted-foreground"} scope="col">#</th>}
              {columns.map((col) => (
                <th key={col.key} scope="col"
                  className={cn(pad, "text-xs font-medium uppercase tracking-wider text-muted-foreground", col.align === "right" && "text-right", col.align === "center" && "text-center", !col.align && "text-left", sortable && col.sortable !== false && "cursor-pointer select-none hover:text-foreground transition-colors", col.className)}
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                  tabIndex={sortable && col.sortable !== false ? 0 : undefined}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleSort(col.key); } }}
                  aria-sort={sort.key === col.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}>
                  <span className="inline-flex items-center gap-1.5">{col.label}{sortable && col.sortable !== false && <SortIcon active={sort.key === col.key} dir={sort.dir} />}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr><td colSpan={columns.length + (showRowNumbers ? 1 : 0)} className={pad + " text-center text-muted-foreground"}>{emptyContent ?? "No results found."}</td></tr>
            ) : paged.map((row, rowIdx) => (
              <tr key={rowIdx} className={cn("border-b border-border/30 last:border-0 transition-colors", striped && rowIdx % 2 === 1 && "bg-muted/15", onRowClick && "cursor-pointer hover:bg-muted/30", focusedRow === rowIdx && "bg-primary/5")}
                onClick={() => onRowClick?.(row)} onKeyDown={(e) => handleKeyDown(e, rowIdx)} tabIndex={onRowClick ? 0 : undefined} role={onRowClick ? "row" : undefined}>
                {showRowNumbers && <td className={pad + " text-xs text-muted-foreground"}>{page * pageSize + rowIdx + 1}</td>}
                {columns.map((col) => (
                  <td key={col.key} className={cn(pad, "text-foreground", col.align === "right" && "text-right font-mono", col.align === "center" && "text-center", col.className)}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

function SortIcon({ active, dir }: { active: boolean; dir: "asc" | "desc" | null }) {
  if (!active) return <ArrowUpDown className="h-3 w-3 text-muted-foreground/30" />;
  return dir === "asc" ? <ArrowUp className="h-3 w-3 text-primary" /> : <ArrowDown className="h-3 w-3 text-primary" />;
}

export { DataGridInner as DataGrid };`;

export const PAGINATION_SOURCE = `"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationControlsProps { page: number; totalPages: number; onPageChange: (page: number) => void; className?: string; }

const PaginationControls = forwardRef<HTMLDivElement, PaginationControlsProps>(({ page, totalPages, onPageChange, className }, ref) => {
  const getVisiblePages = (): (number | "...")[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i);
    const pages: (number | "...")[] = [0];
    if (page > 2) pages.push("...");
    for (let i = Math.max(1, page - 1); i <= Math.min(totalPages - 2, page + 1); i++) pages.push(i);
    if (page < totalPages - 3) pages.push("...");
    if (totalPages > 1) pages.push(totalPages - 1);
    return pages;
  };

  return (
    <div ref={ref} className={cn("flex items-center gap-1", className)} role="navigation" aria-label="Pagination">
      <NavBtn onClick={() => onPageChange(0)} disabled={page === 0} label="First"><ChevronsLeft className="h-4 w-4" /></NavBtn>
      <NavBtn onClick={() => onPageChange(page - 1)} disabled={page === 0} label="Previous"><ChevronLeft className="h-4 w-4" /></NavBtn>
      {getVisiblePages().map((p, i) => p === "..." ? <span key={\`dots-\${i}\`} className="px-1 text-xs text-muted-foreground/40">...</span> : (
        <button key={p} onClick={() => onPageChange(p)} className={cn("h-8 min-w-[2rem] rounded-lg px-2 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95", page === p ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground")} aria-current={page === p ? "page" : undefined}>{p + 1}</button>
      ))}
      <NavBtn onClick={() => onPageChange(page + 1)} disabled={page === totalPages - 1} label="Next"><ChevronRight className="h-4 w-4" /></NavBtn>
      <NavBtn onClick={() => onPageChange(totalPages - 1)} disabled={page === totalPages - 1} label="Last"><ChevronsRight className="h-4 w-4" /></NavBtn>
    </div>
  );
});

PaginationControls.displayName = "PaginationControls";

function NavBtn({ onClick, disabled, label, children }: { onClick: () => void; disabled: boolean; label: string; children: React.ReactNode }) {
  return <button onClick={onClick} disabled={disabled} aria-label={label} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95">{children}</button>;
}

export { PaginationControls };`;

export const BASIC_EXAMPLE = `<DataGrid columns={columns} data={data} />`;

export const SORTABLE_EXAMPLE = `<DataGrid columns={columns} data={data} sortable />`;

export const PAGINATION_EXAMPLE = `<DataGrid columns={columns} data={data} pagination pageSize={5} />`;

export const COMPACT_STRIPED_EXAMPLE = `<DataGrid columns={columns} data={data} compact striped />`;

export const ROW_NUMBERS_EXAMPLE = `<DataGrid columns={columns} data={data} showRowNumbers />`;
