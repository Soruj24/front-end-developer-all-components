"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { ComparisonTable, ComparisonCards } from "@/components/ui/ComparisonTable";
import type { ComparisonColumn, ComparisonRow } from "@/components/ui/ComparisonTable";

const plans = [
  { name: "Starter", price: "$9", period: "/mo", features: { storage: "5 GB", users: "1", support: "Email", api: false, analytics: false, sso: false } },
  { name: "Pro", price: "$29", period: "/mo", features: { storage: "50 GB", users: "10", support: "Priority", api: true, analytics: true, sso: false } },
  { name: "Enterprise", price: "$99", period: "/mo", features: { storage: "Unlimited", users: "Unlimited", support: "24/7", api: true, analytics: true, sso: true } },
];

const featureRows = [
  { label: "Storage", key: "storage" as const },
  { label: "Team Members", key: "users" as const },
  { label: "Support", key: "support" as const },
  { label: "API Access", key: "api" as const },
  { label: "Advanced Analytics", key: "analytics" as const },
  { label: "SSO Integration", key: "sso" as const },
];

function CheckIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
      <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
    </span>
  );
}

function XIcon() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted">
      <X className="h-3 w-3 text-muted-foreground/40" />
    </span>
  );
}

function renderValue(v: string | boolean) {
  return typeof v === "boolean" ? (v ? <CheckIcon /> : <XIcon />) : <span className="text-muted-foreground">{v}</span>;
}

export function PricingTableDemo() {
  const [highlightedCol, setHighlightedCol] = useState(1);

  const columns: ComparisonColumn[] = plans.map((p) => ({
    title: p.name,
    header: (
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-medium text-muted-foreground">{p.name}</span>
        <span className="text-2xl font-bold tabular-nums tracking-tight text-foreground">
          {p.price}
          <span className="text-xs font-normal text-muted-foreground">{p.period}</span>
        </span>
      </div>
    ),
  }));

  const rows: ComparisonRow[] = featureRows.map((row) => ({
    label: row.label,
    values: plans.map((p) => renderValue(p.features[row.key])),
  }));

  return (
    <ComparisonTable
      columns={columns}
      rows={rows}
      highlightedColumn={highlightedCol}
      onColumnSelect={setHighlightedCol}
    />
  );
}

const techComparison = [
  { feature: "Bundle Size", reactA: "42 KB", reactB: "38 KB", vueA: "33 KB" },
  { feature: "Learning Curve", reactA: "Medium", reactB: "Low", vueA: "Low" },
  { feature: "TypeScript", reactA: "Excellent", reactB: "Good", vueA: "Excellent" },
  { feature: "SSR Support", reactA: "Built-in", reactB: "Plugin", vueA: "Built-in" },
  { feature: "Ecosystem", reactA: "Massive", reactB: "Growing", vueA: "Large" },
];

export function FeatureTableDemo() {
  const columns: ComparisonColumn[] = [
    { title: "React A" },
    { title: "React B" },
    { title: "Vue A" },
  ];

  const rows: ComparisonRow[] = techComparison.map((r) => ({
    label: r.feature,
    values: [
      <span key="ra" className="text-muted-foreground">{r.reactA}</span>,
      <span key="rb" className="text-muted-foreground">{r.reactB}</span>,
      <span key="va" className="text-muted-foreground">{r.vueA}</span>,
    ],
  }));

  return <ComparisonTable columns={columns} rows={rows} striped />;
}

export function PricingCardsDemo() {
  return (
    <ComparisonCards
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
        cta: `Choose ${p.name}`,
      }))}
      onCtaClick={(name) => alert(`Selected: ${name}`)}
    />
  );
}
