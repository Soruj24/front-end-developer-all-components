export const COMPARISON_TABLE_SOURCE = `"use client";

import { Fragment } from "react";

interface ComparisonColumn {
  title: string;
  header?: React.ReactNode;
}

interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: { label: string; values: React.ReactNode[] }[];
  highlightedColumn?: number;
  onColumnSelect?: (index: number) => void;
  className?: string;
}

export function ComparisonTable({
  columns,
  rows,
  highlightedColumn = -1,
  onColumnSelect,
  className = "",
}: ComparisonTableProps) {
  return (
    <div className={\`overflow-x-auto \${className}\`}>
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr>
            <th className="p-4 text-left" />
            {columns.map((col, i) => (
              <th
                key={col.title}
                className={\`cursor-pointer p-4 text-center transition-all \${highlightedColumn === i ? "bg-primary/5 ring-2 ring-primary" : "hover:bg-muted/50"}\`}
                onClick={() => onColumnSelect?.(i)}
              >
                {col.header ?? col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Fragment key={row.label}>
              <tr className="border-t">
                <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className={\`px-4 py-3 text-center \${highlightedColumn === i ? "bg-primary/5" : ""}\`}
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
}`;

export const PRICING_EXAMPLE = `<ComparisonTable
  columns={[
    { title: "Starter", header: <PlanCard name="Starter" price="$9" /> },
    { title: "Pro", header: <PlanCard name="Pro" price="$29" /> },
    { title: "Enterprise", header: <PlanCard name="Enterprise" price="$99" /> },
  ]}
  rows={[
    { label: "Storage", values: ["5 GB", "50 GB", "Unlimited"] },
    { label: "API Access", values: [<X key="x" />, <Check key="c" />, <Check key="c2" />] },
  ]}
  highlightedColumn={highlightedCol}
  onColumnSelect={setHighlightedCol}
/>`;

export const FEATURES_EXAMPLE = `<table className="w-full text-sm">
  <thead>
    <tr className="border-b">
      <th className="px-4 py-3 text-left text-muted-foreground">Feature</th>
      <th className="px-4 py-3 text-center font-medium">React A</th>
      <th className="px-4 py-3 text-center font-medium">React B</th>
      <th className="px-4 py-3 text-center font-medium">Vue A</th>
    </tr>
  </thead>
  <tbody>
    {techComparison.map((row) => (
      <tr key={row.feature} className="border-b last:border-0">
        <td className="px-4 py-3 font-medium">{row.feature}</td>
        <td className="px-4 py-3 text-center text-muted-foreground">{row.reactA}</td>
        <td className="px-4 py-3 text-center text-muted-foreground">{row.reactB}</td>
        <td className="px-4 py-3 text-center text-muted-foreground">{row.vueA}</td>
      </tr>
    ))}
  </tbody>
</table>`;

export const CARDS_EXAMPLE = `<div className="grid gap-4 sm:grid-cols-3">
  {plans.map((plan, i) => (
    <div
      key={plan.name}
      className={\`relative flex flex-col gap-4 rounded-xl border p-6 transition-all \${i === 1 ? "border-primary ring-2 ring-primary/20" : "border-border"}\`}
    >
      {i === 1 && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          Most Popular
        </span>
      )}
      <div>
        <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
        <p className="mt-2 text-3xl font-bold text-foreground">{plan.price}</p>
      </div>
      <ul className="flex flex-1 flex-col gap-2">
        {featureRows.map((row) => (
          <li key={row.key} className="flex items-center gap-2 text-sm">
            {plan.features[row.key] ? <Check className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-muted-foreground/30" />}
            <span className="text-muted-foreground">{row.label}</span>
          </li>
        ))}
      </ul>
      <button className="mt-auto rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Choose {plan.name} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  ))}
</div>`;