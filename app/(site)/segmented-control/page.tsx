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

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">options</td>
                <td className="px-4 py-3 text-muted-foreground">SegmentedControlOption[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">"sm" | "md" | "lg"</td>
                <td className="px-4 py-3 text-muted-foreground">"md"</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ComponentDocPage>
  );
}
