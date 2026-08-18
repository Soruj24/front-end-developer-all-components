"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ArrowUpDown, Check, X, ArrowRight } from "lucide-react";

const installCommand = `npx component-library@latest add comparison-table`;

const usageCode = `import { ComparisonTable } from "@/components/comparison-table";

<ComparisonTable
  columns={columns}
  data={data}
  highlightedColumn={1}
/>`;

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

const techComparison = [
  { feature: "Bundle Size", reactA: "42 KB", reactB: "38 KB", vueA: "33 KB" },
  { feature: "Learning Curve", reactA: "Medium", reactB: "Low", vueA: "Low" },
  { feature: "TypeScript", reactA: "Excellent", reactB: "Good", vueA: "Excellent" },
  { feature: " SSR Support", reactA: "Built-in", reactB: "Plugin", vueA: "Built-in" },
  { feature: "Ecosystem", reactA: "Massive", reactB: "Growing", vueA: "Large" },
];

export default function ComparisonTablePage() {
  const [highlightedCol, setHighlightedCol] = useState(1);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Comparison Table</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Side-by-side comparison tables for plans, features, and products. Highlight key differences and help users make informed decisions.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="comparison-table-pricing">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-4 gap-0">
              <div className="p-4" />
              {plans.map((plan, i) => (
                <div
                  key={plan.name}
                  className={`cursor-pointer rounded-t-lg p-4 text-center transition-all ${
                    highlightedCol === i
                      ? "bg-primary/5 ring-2 ring-primary"
                      : "bg-muted/30 hover:bg-muted/50"
                  }`}
                  onClick={() => setHighlightedCol(i)}
                >
                  <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
                  </p>
                </div>
              ))}
              {featureRows.map((row) => (
                <>
                  <div key={`label-${row.key}`} className="flex items-center border-t px-4 py-3 text-sm font-medium text-foreground">
                    {row.label}
                  </div>
                  {plans.map((plan, i) => (
                    <div
                      key={`${row.key}-${plan.name}`}
                      className={`flex items-center justify-center border-t px-4 py-3 text-sm transition-all ${
                        highlightedCol === i ? "bg-primary/5" : ""
                      }`}
                    >
                      {typeof plan.features[row.key] === "boolean" ? (
                        plan.features[row.key] ? (
                          <Check className="h-5 w-5 text-success" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground/40" />
                        )
                      ) : (
                        <span className="text-muted-foreground">{plan.features[row.key] as string}</span>
                      )}
                    </div>
                  ))}
                </>
              ))}
              <div className="border-t p-4" />
              {plans.map((plan, i) => (
                <div
                  key={`cta-${plan.name}`}
                  className={`flex justify-center border-t p-4 transition-all ${
                    highlightedCol === i ? "bg-primary/5" : ""
                  }`}
                >
                  <button
                    className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                      highlightedCol === i
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="comparison-table-features">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Feature</th>
                <th className="px-4 py-3 text-center font-medium text-foreground">React A</th>
                <th className="px-4 py-3 text-center font-medium text-foreground">React B</th>
                <th className="px-4 py-3 text-center font-medium text-foreground">Vue A</th>
              </tr>
            </thead>
            <tbody>
              {techComparison.map((row) => (
                <tr key={row.feature} className="border-b last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{row.feature}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{row.reactA}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{row.reactB}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{row.vueA}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      <ComponentPreview id="comparison-table-cards">
        <div className="grid w-full gap-4 sm:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative flex flex-col gap-4 rounded-xl border p-6 transition-all ${
                i === 1 ? "border-primary ring-2 ring-primary/20" : "border-border"
              }`}
            >
              {i === 1 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="primary">Most Popular</Badge>
                </span>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">{plan.name}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {plan.price}<span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
                </p>
              </div>
              <ul className="flex flex-1 flex-col gap-2">
                {featureRows.map((row) => (
                  <li key={row.key} className="flex items-center gap-2 text-sm">
                    {typeof plan.features[row.key] === "boolean" ? (
                      plan.features[row.key] ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground/30" />
                      )
                    ) : (
                      <Check className="h-4 w-4 text-success" />
                    )}
                    <span className={typeof plan.features[row.key] === "boolean" && !plan.features[row.key] ? "text-muted-foreground/50" : "text-muted-foreground"}>
                      {row.label}: {typeof plan.features[row.key] !== "boolean" ? (plan.features[row.key] as string) : ""}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-auto flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                  i === 1
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Choose {plan.name} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">columns</td>
                <td className="px-4 py-3 text-muted-foreground">ColumnDef[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">data</td>
                <td className="px-4 py-3 text-muted-foreground">Record&lt;string, any&gt;[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">highlightedColumn</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onColumnSelect</td>
                <td className="px-4 py-3 text-muted-foreground">(index: number) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
