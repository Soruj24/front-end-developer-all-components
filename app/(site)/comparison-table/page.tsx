"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { COMPARISON_TABLE_SOURCE, CARDS_SOURCE, PRICING_EXAMPLE, FEATURES_EXAMPLE, CARDS_EXAMPLE } from "./comparison-table-source";
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

      <SourceCodeViewer
        source={CARDS_SOURCE}
        filename="components/ui/ComparisonTable/ComparisonCards.tsx"
        defaultExpanded={false}
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Pricing Plans"
          description="Selectable column highlighting for comparing plan pricing. Click a column header to highlight it."
          code={PRICING_EXAMPLE}
          filename="pricing-table.tsx"
        >
          <PricingTableDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Feature Comparison"
          description="Plain table comparing framework features side by side with striped rows."
          code={FEATURES_EXAMPLE}
          filename="feature-table.tsx"
        >
          <FeatureTableDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Pricing Cards"
          description="Card-based comparison with a highlighted popular plan and feature checklist."
          code={CARDS_EXAMPLE}
          filename="pricing-cards.tsx"
        >
          <PricingCardsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
