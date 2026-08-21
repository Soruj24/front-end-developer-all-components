"use client";

import { forwardRef, Fragment } from "react";
import { cn } from "@/lib/cn";
import type { ComparisonTableProps } from "./ComparisonTable.types";

const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>(
  (
    {
      columns,
      rows,
      highlightedColumn = -1,
      onColumnSelect,
      striped = false,
      className,
      compact = false,
    },
    ref,
  ) => {
    const cellPadding = compact ? "px-3 py-2" : "px-4 py-3";

    return (
      <div ref={ref} className={cn("w-full overflow-x-auto rounded-xl border border-border/60 bg-background shadow-sm", className)}>
        <table className="w-full min-w-[600px] text-sm" role="table">
          <thead>
            <tr>
              <th className={cn("text-left font-medium text-muted-foreground", cellPadding, "w-[200px]")} scope="col" />
              {columns.map((col, i) => (
                <th
                  key={col.title}
                  scope="col"
                  className={cn(
                    "text-center font-semibold transition-all duration-200",
                    cellPadding,
                    highlightedColumn === i
                      ? "bg-primary/5 text-primary border-b-2 border-primary"
                      : "text-foreground hover:bg-muted/40",
                    onColumnSelect && "cursor-pointer",
                  )}
                  onClick={() => onColumnSelect?.(i)}
                  tabIndex={onColumnSelect ? 0 : undefined}
                  onKeyDown={onColumnSelect ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onColumnSelect(i); } } : undefined}
                  role={onColumnSelect ? "columnheader" : "columnheader"}
                  aria-sort={highlightedColumn === i ? "ascending" : undefined}
                >
                  {col.header ?? (
                    <span className="text-sm font-semibold">{col.title}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <Fragment key={row.label}>
                <tr className={cn(striped && rowIdx % 2 === 1 && "bg-muted/20")}>
                  <td className={cn("font-medium text-foreground border-t border-border/40", cellPadding)}>
                    {row.label}
                  </td>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={cn(
                        "text-center border-t border-border/40 transition-colors duration-200",
                        cellPadding,
                        highlightedColumn === i && "bg-primary/5",
                      )}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

ComparisonTable.displayName = "ComparisonTable";

export default ComparisonTable;
