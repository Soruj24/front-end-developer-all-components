"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const CRM_SOURCE = "use client";

export function CrmMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-sm text-foreground">{label}</span>
      <span className="font-mono font-bold text-foreground">{value}</span>
    </div>
  );
}

export default function CrmPage() {
  const [metric, setMetric] = useState({ label: "Monthly Revenue", value: "$85,234" });

  return (
    <ComponentDocPage
      name="CRM Dashboard"
      category="Commerce"
      description="A dashboard for tracking key business metrics and performance indicators."
    >
      <PreviewPanel filename="crm.tsx">
        <CrmMetric label={metric.label} value={metric.value} />
      </PreviewPanel>

      <SourceCodeViewer
        source={CRM_SOURCE}
        filename="components/ui/Crm/Crm.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-4">
        <ExampleBlock title="Metric" description="Display a single CRM metric." code={CRM_SOURCE}>
          <CrmMetric label="Monthly Revenue" value="$85,234" />
        </ExampleBlock>

        <ExampleBlock title="Custom Metric" description="Display a custom metric with a different label and value." code={CRM_SOURCE}>
          <CrmMetric label="Active Deals" value="24" />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}