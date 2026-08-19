"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { COMPARISON_TABLE_SOURCE, PRICING_EXAMPLE, FEATURES_EXAMPLE, CARDS_EXAMPLE } from "./comparison-table-source";
import { PricingTableDemo, FeatureTableDemo, PricingCardsDemo } from "./comparison-table-demos";

export default function ComparisonTablePage() {
  return (
    <ComponentDocPage
      name="Comparison Table"
      category="Data Display"
      description="Side-by-side comparison tables for plans, features, and products. Highlight key differences and help users make informed decisions."
    >
      <PreviewPanel filename="comparison-table.tsx">
        <PricingTableDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={COMPARISON_TABLE_SOURCE}
        filename="components/ui/ComparisonTable/ComparisonTable.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Pricing Plans" description="Selectable column highlighting for comparing plan pricing." code={PRICING_EXAMPLE}>
          <PricingTableDemo />
        </ExampleBlock>
        <ExampleBlock title="Feature Comparison" description="Plain table comparing framework features side by side." code={FEATURES_EXAMPLE}>
          <FeatureTableDemo />
        </ExampleBlock>
        <ExampleBlock title="Pricing Cards" description="Card-based comparison with a highlighted popular plan." code={CARDS_EXAMPLE}>
          <PricingCardsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}