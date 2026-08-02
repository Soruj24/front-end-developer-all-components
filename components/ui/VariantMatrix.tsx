"use client";

import { memo, useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

/** One axis entry — a row header (e.g. a variant) or a column header (e.g. a size). */
export interface VariantMatrixAxis {
  id: string;
  label: string;
  /** Optional small hint shown under the label. */
  sublabel?: string;
}

/** A single matrix cell — the live preview for one row × column combination. */
export interface VariantMatrixCell {
  id: string;
  row: string;
  column: string;
  /** Display name. Falls back to `row · column` when omitted. */
  label?: string;
  /** The live component rendered inside the cell. */
  preview: ReactNode;
  /** JSX snippet copied by the cell's "Copy" button. */
  config: string;
  /** Tags used by the filter chips and search. */
  tags?: string[];
}

/** A colored legend row rendered below the matrix. */
export interface VariantMatrixLegend {
  label: string;
  className?: string;
}

export interface VariantMatrixProps {
  rows: VariantMatrixAxis[];
  columns: VariantMatrixAxis[];
  cells: VariantMatrixCell[];
  /** Optional heading for the matrix (also labels the corner header cell). */
  title?: string;
  description?: string;
  className?: string;
  /** Toggles the search box. Default `true`. */
  searchable?: boolean;
  /** Toggles the tag filter chips. Default `true`. */
  filterable?: boolean;
  /** Toggles per-cell "Copy" buttons. Default `true`. */
  copyable?: boolean;
  /** Message shown when no cells are provided. */
  emptyMessage?: string;
  /** Colored dots + labels rendered under the matrix. */
  legend?: VariantMatrixLegend[];
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
    </svg>
  );
}

function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function CopyIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function GridIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Cell view                                                           */
/* ------------------------------------------------------------------ */

interface CellViewProps {
  cell?: VariantMatrixCell;
  row: VariantMatrixAxis;
  column: VariantMatrixAxis;
  copied: boolean;
  copyable: boolean;
  onCopy: (cell: VariantMatrixCell) => void;
}

const CellView = memo(function CellView({
  cell,
  row,
  column,
  copied,
  copyable,
  onCopy,
}: CellViewProps) {
  if (!cell) {
    return (
      <div className="flex min-h-28 items-center justify-center rounded-lg border border-dashed border-border text-sm text-subtle">
        —
      </div>
    );
  }
  const label = cell.label ?? `${row.label} · ${column.label}`;
  return (
    <div className="group relative flex min-h-28 flex-col justify-between gap-2 rounded-lg border border-border bg-background p-3 transition-colors hover:border-ring/50">
      <div className="flex min-h-12 flex-1 items-center justify-center">{cell.preview}</div>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium text-foreground">{label}</span>
        {copyable && (
          <button
            type="button"
            onClick={() => onCopy(cell)}
            aria-label={`Copy config for ${label}`}
            className="flex shrink-0 items-center gap-1 rounded-md border border-border bg-muted/60 px-1.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            {copied ? <CheckIcon className="h-3 w-3 text-success" /> : <CopyIcon className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function VariantMatrix({
  rows,
  columns,
  cells,
  title,
  description,
  className,
  searchable = true,
  filterable = true,
  copyable = true,
  emptyMessage = "Nothing to display yet",
  legend,
}: VariantMatrixProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const copiedTimerRef = useRef<number | null>(null);

  const rowById = useMemo(() => new Map(rows.map((r) => [r.id, r])), [rows]);
  const colById = useMemo(() => new Map(columns.map((c) => [c.id, c])), [columns]);

  const byKey = useMemo(() => {
    const map = new Map<string, VariantMatrixCell>();
    for (const c of cells) map.set(`${c.row}|${c.column}`, c);
    return map;
  }, [cells]);

  const tagStats = useMemo(() => {
    const tags: string[] = [];
    const counts = new Map<string, number>();
    for (const c of cells) {
      for (const t of c.tags ?? []) {
        counts.set(t, (counts.get(t) ?? 0) + 1);
        if (!tags.includes(t)) tags.push(t);
      }
    }
    return { tags, counts };
  }, [cells]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return cells.filter((c) => {
      if (filter && !(c.tags ?? []).includes(filter)) return false;
      if (!q) return true;
      const row = rowById.get(c.row);
      const col = colById.get(c.column);
      const haystack = [c.label, c.config, c.row, c.column, row?.label, col?.label, ...(c.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [cells, search, filter, rowById, colById]);

  const visibleRows = useMemo(() => {
    const used = new Set(filtered.map((c) => c.row));
    return rows.filter((r) => used.has(r.id));
  }, [rows, filtered]);

  const visibleColumns = useMemo(() => {
    const used = new Set(filtered.map((c) => c.column));
    return columns.filter((c) => used.has(c.id));
  }, [columns, filtered]);

  const handleCopy = useCallback((cell: VariantMatrixCell) => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(cell.config).catch(() => {});
    }
    setCopiedId(cell.id);
    if (copiedTimerRef.current !== null) window.clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = window.setTimeout(() => setCopiedId(null), 1600);
  }, []);

  const noMatches = cells.length > 0 && visibleRows.length === 0;
  const gridTemplateColumns = `11rem repeat(${visibleColumns.length}, minmax(0, 1fr))`;

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      {(searchable || filterable) && cells.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {searchable && (
              <div className="relative w-full max-w-xs">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search variants…"
                  spellCheck={false}
                  aria-label="Search variants"
                  className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-9 text-sm text-foreground outline-none transition-colors placeholder:text-subtle focus:border-ring"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
            {searchable && (
              <span className="text-xs tabular-nums text-muted-foreground">
                {filtered.length} of {cells.length} shown
              </span>
            )}
          </div>

          {filterable && tagStats.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setFilter(null)}
                aria-pressed={filter === null}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                  filter === null
                    ? "border-transparent bg-foreground text-background"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground"
                )}
              >
                All
              </button>
              {tagStats.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setFilter(filter === tag ? null : tag)}
                  aria-pressed={filter === tag}
                  className={cn(
                    "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                    filter === tag
                      ? "border-transparent bg-foreground text-background"
                      : "border-border bg-surface text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tag}
                  <span className="ml-1 text-[11px] opacity-60">{tagStats.counts.get(tag)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {cells.length === 0 ? (
        <div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ) : noMatches ? (
        <div className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 text-sm text-muted-foreground">
          <p>No variants match your search.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setFilter(null);
            }}
            className="text-xs font-medium text-primary hover:underline"
          >
            Clear search &amp; filters
          </button>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-xl border border-border sm:block">
            <div className="grid border-b border-border bg-muted/50" style={{ gridTemplateColumns }}>
              <div className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <GridIcon className="h-3.5 w-3.5" />
                {title ?? "Variant"}
              </div>
              {visibleColumns.map((col) => (
                <div key={col.id} className="flex flex-col justify-center px-3 py-2.5">
                  <span className="text-sm font-medium text-foreground">{col.label}</span>
                  {col.sublabel && <span className="text-xs text-muted-foreground">{col.sublabel}</span>}
                </div>
              ))}
            </div>
            {visibleRows.map((row) => (
              <div key={row.id} className="grid border-b border-border last:border-b-0" style={{ gridTemplateColumns }}>
                <div className="flex items-center px-4 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{row.label}</span>
                    {row.sublabel && <span className="text-xs text-muted-foreground">{row.sublabel}</span>}
                  </div>
                </div>
                {visibleColumns.map((col) => {
                  const cell = byKey.get(`${row.id}|${col.id}`);
                  return (
                    <CellView
                      key={col.id}
                      cell={cell}
                      row={row}
                      column={col}
                      copied={cell !== undefined && copiedId === cell.id}
                      copyable={copyable}
                      onCopy={handleCopy}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Mobile stacked cards */}
          <div className="flex flex-col gap-4 sm:hidden">
            {visibleRows.map((row) => (
              <div key={row.id} className="overflow-hidden rounded-xl border border-border">
                <div className="flex items-center justify-between border-b border-border bg-muted/50 px-3 py-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{row.label}</span>
                    {row.sublabel && <span className="text-xs text-muted-foreground">{row.sublabel}</span>}
                  </div>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {visibleColumns.filter((col) => byKey.get(`${row.id}|${col.id}`)).length} variants
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-3 p-3">
                  {visibleColumns.map((col) => {
                    const cell = byKey.get(`${row.id}|${col.id}`);
                    return (
                      <div key={col.id} className="flex flex-col gap-1.5">
                        <span className="px-1 text-xs font-medium text-muted-foreground">{col.label}</span>
                        <CellView
                          cell={cell}
                          row={row}
                          column={col}
                          copied={cell !== undefined && copiedId === cell.id}
                          copyable={copyable}
                          onCopy={handleCopy}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {legend && legend.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {legend.map((l) => (
            <span key={l.label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className={cn("h-2 w-2 rounded-full", l.className)} />
              {l.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
