export const COMPARISON_TABLE_SOURCE = `"use client";

import { forwardRef, Fragment } from "react";
import { cn } from "@/lib/cn";

interface ComparisonColumn {
  title: string;
  header?: React.ReactNode;
  highlighted?: boolean;
}

interface ComparisonRow {
  label: string;
  values: React.ReactNode[];
}

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  highlightedColumn?: number;
  onColumnSelect?: (index: number) => void;
  striped?: boolean;
  className?: string;
  compact?: boolean;
}

const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>(
  ({ columns, rows, highlightedColumn = -1, onColumnSelect, striped = false, className, compact = false }, ref) => {
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
                    highlightedColumn === i ? "bg-primary/5 text-primary border-b-2 border-primary" : "text-foreground hover:bg-muted/40",
                    onColumnSelect && "cursor-pointer",
                  )}
                  onClick={() => onColumnSelect?.(i)}
                  tabIndex={onColumnSelect ? 0 : undefined}
                  onKeyDown={onColumnSelect ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onColumnSelect(i); } } : undefined}
                  aria-sort={highlightedColumn === i ? "ascending" : undefined}
                >
                  {col.header ?? <span className="text-sm font-semibold">{col.title}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <Fragment key={row.label}>
                <tr className={cn(striped && rowIdx % 2 === 1 && "bg-muted/20")}>
                  <td className={cn("font-medium text-foreground border-t border-border/40", cellPadding)}>{row.label}</td>
                  {row.values.map((value, i) => (
                    <td key={i} className={cn("text-center border-t border-border/40 transition-colors duration-200", cellPadding, highlightedColumn === i && "bg-primary/5")}>
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

export { ComparisonTable };`;

export const CARDS_SOURCE = `"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Check, X, ArrowRight } from "lucide-react";

interface ComparisonCardsProps {
  plans: {
    name: string;
    price: string;
    period?: string;
    highlighted?: boolean;
    badge?: string;
    features: { label: string; value: string | boolean }[];
    cta?: string;
  }[];
  onCtaClick?: (planName: string) => void;
  className?: string;
}

const ComparisonCards = forwardRef<HTMLDivElement, ComparisonCardsProps>(({ plans, onCtaClick, className }, ref) => {
  return (
    <div ref={ref} className={cn("grid w-full gap-4 sm:grid-cols-3", className)} role="list">
      {plans.map((plan) => (
        <div
          key={plan.name}
          role="listitem"
          className={cn(
            "relative flex flex-col gap-4 rounded-xl border p-6 transition-all duration-200",
            plan.highlighted ? "border-primary/60 bg-primary/5 shadow-md shadow-primary/5" : "border-border/60 bg-background hover:border-border hover:shadow-sm",
          )}
        >
          {plan.badge && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
              {plan.badge}
            </span>
          )}
          <div>
            <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
            <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight text-foreground">
              {plan.price}{plan.period && <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>}
            </p>
          </div>
          <ul className="flex flex-1 flex-col gap-2.5">
            {plan.features.map((feat) => (
              <li key={feat.label} className="flex items-center gap-2 text-sm">
                {typeof feat.value === "boolean" ? (
                  feat.value ? (
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40"><Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /></span>
                  ) : (
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted"><X className="h-3 w-3 text-muted-foreground/40" /></span>
                  )
                ) : (
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40"><Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" /></span>
                )}
                <span className={cn("text-muted-foreground", typeof feat.value === "boolean" && !feat.value && "text-muted-foreground/50")}>
                  {feat.label}{typeof feat.value === "string" && \`: \${feat.value}\`}
                </span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onCtaClick?.(plan.name)}
            className={cn(
              "mt-auto flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150",
              plan.highlighted ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
              "active:scale-[0.98]",
            )}
          >
            {plan.cta || \`Choose \${plan.name}\`}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
});

ComparisonCards.displayName = "ComparisonCards";

export { ComparisonCards };`;

export const PRICING_EXAMPLE = `<ComparisonTable
  columns={plans.map((p) => ({ title: p.name, header: <PlanHeader plan={p} /> }))}
  rows={featureRows.map((row) => ({
    label: row.label,
    values: plans.map((p) => renderValue(p.features[row.key])),
  }))}
  highlightedColumn={highlightedCol}
  onColumnSelect={setHighlightedCol}
/>`;

export const FEATURES_EXAMPLE = `<ComparisonTable columns={columns} rows={rows} striped />`;

export const CARDS_EXAMPLE = `<ComparisonCards
  plans={plans.map((p, i) => ({
    name: p.name,
    price: p.price,
    period: p.period,
    highlighted: i === 1,
    badge: i === 1 ? "Most Popular" : undefined,
    features: featureRows.map((row) => ({
      label: row.label,
      value: p.features[row.key],
    })),
  }))}
  onCtaClick={(name) => console.log(name)}
/>`;
