"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const CRM_SOURCE = `"use client";

import { useState } from "react";

interface CrmMetricProps {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export function CrmMetric({ label, value, change, positive }: CrmMetricProps) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
      {change && (
        <span className={\`text-xs font-medium \${
          positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
        }\`}>
          {change}
        </span>
      )}
    </div>
  );
}

export default function CrmPage() {
  const [metric, setMetric] = useState({
    label: "Monthly Revenue",
    value: "$85,234",
    change: "+12.5%",
    positive: true,
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <CrmMetric label="Monthly Revenue" value="$85,234" change="+12.5%" positive />
      <CrmMetric label="Active Deals" value="24" change="+3" positive />
      <CrmMetric label="Win Rate" value="68%" change="-2.1%" />
      <CrmMetric label="Avg Deal Size" value="$12,400" change="+8.3%" positive />
    </div>
  );
}`;

const DEFAULT_EXAMPLE = `<CrmMetric label="Monthly Revenue" value="$85,234" change="+12.5%" positive />`;

export default function CrmPage() {
  return (
    <ComponentDocPage
      name="CRM Dashboard"
      category="Commerce"
      description="A dashboard for tracking key business metrics and performance indicators."
    >
      <PreviewPanel filename="crm.tsx">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CrmMetric label="Monthly Revenue" value="$85,234" change="+12.5%" positive />
          <CrmMetric label="Active Deals" value="24" change="+3" positive />
          <CrmMetric label="Win Rate" value="68%" change="-2.1%" />
          <CrmMetric label="Avg Deal Size" value="$12,400" change="+8.3%" positive />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={CRM_SOURCE}
        filename="components/ui/Crm/Crm.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-4">
        <ExampleBlock title="Metric Card" description="Display a single CRM metric with change indicator." code={DEFAULT_EXAMPLE}>
          <CrmMetric label="Monthly Revenue" value="$85,234" change="+12.5%" positive />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}

function CrmMetric({ label, value, change, positive }: { label: string; value: string; change?: string; positive?: boolean }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
      {change && (
        <span className={`text-xs font-medium ${positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
          {change}
        </span>
      )}
    </div>
  );
}
