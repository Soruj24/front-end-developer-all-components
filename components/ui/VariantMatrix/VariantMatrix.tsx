"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { VariantMatrixAxis, VariantMatrixCell, VariantMatrixProps } from "./VariantMatrix.types";
import { VariantMatrixHeader } from "./VariantMatrixHeader";
import { VariantMatrixGrid } from "./VariantMatrixGrid";
import { VariantMatrixMobile } from "./VariantMatrixMobile";
import { VariantMatrixLegend } from "./VariantMatrixLegend";

export interface SharedGridProps {
  byKey: Map<string, VariantMatrixCell>;
  copiedId: string | null;
  copyable: boolean;
  handleCopy: (cell: VariantMatrixCell) => void;
  title?: string;
}

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
  const sharedProps: SharedGridProps = { byKey, copiedId, copyable, handleCopy, title };

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <VariantMatrixHeader
        title={title}
        description={description}
        searchable={searchable}
        filterable={filterable}
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
        tagStats={tagStats}
        cellCount={cells.length}
        filteredCount={filtered.length}
      />

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
          <VariantMatrixGrid
            {...sharedProps}
            visibleRows={visibleRows}
            visibleColumns={visibleColumns}
          />
          <VariantMatrixMobile
            {...sharedProps}
            visibleRows={visibleRows}
            visibleColumns={visibleColumns}
          />
        </>
      )}

      <VariantMatrixLegend legend={legend} />
    </div>
  );
}
