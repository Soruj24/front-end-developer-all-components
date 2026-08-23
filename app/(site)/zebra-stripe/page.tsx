"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZEBRA_STRIPE_SOURCE } from "./zebra-stripe-source";
import {
  BASIC_STRIPE_EXAMPLE,
  STRIPE_COLORS_EXAMPLE,
  STRIPE_WITH_ICONS_EXAMPLE,
  STRIPE_TABLE_EXAMPLE,
  STRIPE_INTERACTIVE_EXAMPLE,
  STRIPE_GRADIENT_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zebra-stripe-examples";
import {
  BasicStripe,
  StripeColors,
  StripeWithIcons,
  StripeTable,
  StripeInteractive,
  StripeGradient,
  PlaygroundDemo,
} from "./demos";

export default function ZebraStripePage() {
  return (
    <ComponentDocPage
      name="Zebra Stripe"
      category="Visual"
      description="A zebra stripe component for adding alternating stripe patterns to lists, tables, and other container elements."
    >
      <PreviewPanel filename="basic-stripe.tsx">
        <BasicStripe />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZEBRA_STRIPE_SOURCE}
        filename="components/ui/ZebraStripe/BasicStripe.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zebra stripe variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Stripe" description="Default alternating stripe list with subtle background." code={BASIC_STRIPE_EXAMPLE}>
          <BasicStripe />
        </ExampleBlock>
        <ExampleBlock title="Stripe Colors" description="Zinc, blue, violet, and emerald stripe color options." code={STRIPE_COLORS_EXAMPLE}>
          <StripeColors />
        </ExampleBlock>
        <ExampleBlock title="With Icons" description="Navigation-style stripe list with SVG icons." code={STRIPE_WITH_ICONS_EXAMPLE}>
          <StripeWithIcons />
        </ExampleBlock>
        <ExampleBlock title="Stripe Table" description="Table layout with striped rows and status badges." code={STRIPE_TABLE_EXAMPLE}>
          <StripeTable />
        </ExampleBlock>
        <ExampleBlock title="Interactive" description="Toggle stripes on/off with animated transition." code={STRIPE_INTERACTIVE_EXAMPLE}>
          <StripeInteractive />
        </ExampleBlock>
        <ExampleBlock title="Gradient Stripe" description="Gradient-filled alternating rows." code={STRIPE_GRADIENT_EXAMPLE}>
          <StripeGradient />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
