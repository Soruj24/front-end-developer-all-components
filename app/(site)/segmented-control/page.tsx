"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SEGMENTED_CONTROL_SOURCE, DEFAULT_EXAMPLE, ICONS_EXAMPLE, SIZES_EXAMPLE, ICON_ONLY_EXAMPLE } from "./segmented-control-source";
import { DefaultDemo, IconsDemo, SizesDemo, ViewToggleDemo, BillingDemo, IconOnlyDemo } from "./segmented-control-demos";

export default function SegmentedControlPage() {
  return (
    <ComponentDocPage
      name="Segmented Control"
      category="Navigation"
      description="A set of mutually exclusive buttons for switching between views or options with an animated sliding indicator. Supports icons, sizes, and keyboard navigation."
    >
      <PreviewPanel filename="segmented-control.tsx">
        <DefaultDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={SEGMENTED_CONTROL_SOURCE}
        filename="components/ui/SegmentedControl/SegmentedControl.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="With Icons"
          description="Segmented control with icons alongside labels."
          code={ICONS_EXAMPLE}
          filename="icons.tsx"
        >
          <IconsDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Small, medium, and large sizes."
          code={SIZES_EXAMPLE}
          filename="sizes.tsx"
        >
          <SizesDemo />
        </ExampleBlock>

        <ExampleBlock
          title="View Toggle"
          description="Switching between grid and list views with live content preview."
          code={`<SegmentedControl options={viewOptions} value={view} onChange={setView} />`}
          filename="view-toggle.tsx"
        >
          <ViewToggleDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Billing Period"
          description="Toggle between billing periods for pricing."
          code={`<SegmentedControl options={periodOptions} value={period} onChange={setPeriod} />`}
          filename="billing.tsx"
        >
          <BillingDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Icon Only"
          description="Compact control with icons only, no text labels."
          code={ICON_ONLY_EXAMPLE}
          filename="icon-only.tsx"
        >
          <IconOnlyDemo />
        </ExampleBlock>
      </div>


    </ComponentDocPage>
  );
}
