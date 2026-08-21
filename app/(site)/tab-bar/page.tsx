"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { TABBAR_SOURCE, DEFAULT_EXAMPLE, FILLED_EXAMPLE, PILL_EXAMPLE, FLOATING_EXAMPLE, ICON_ONLY_EXAMPLE } from "./tab-bar-source";
import { DefaultDemo, FilledDemo, PillDemo, FloatingDemo, IconOnlyDemo } from "./tab-bar-demos";

export default function TabBarPage() {
  return (
    <ComponentDocPage
      name="Tab Bar"
      category="Navigation"
      description="Mobile bottom navigation bar with icon tabs, badges, and active indicators. Supports filled, pill, floating, icon-only, and minimal variants with keyboard navigation."
    >
      <PreviewPanel filename="tab-bar.tsx">
        <div className="w-full max-w-sm">
          <DefaultDemo />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={TABBAR_SOURCE}
        filename="components/ui/TabBar/TabBar.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Filled"
          description="Active tab highlighted with a filled background."
          code={FILLED_EXAMPLE}
          filename="filled.tsx"
        >
          <div className="w-full max-w-sm">
            <FilledDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Pill"
          description="Active tab shown as a pill shape with background and shadow."
          code={PILL_EXAMPLE}
          filename="pill.tsx"
        >
          <div className="w-full max-w-sm">
            <PillDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Floating"
          description="Floating tab bar with rounded corners, border, and shadow."
          code={FLOATING_EXAMPLE}
          filename="floating.tsx"
        >
          <div className="w-full max-w-sm">
            <FloatingDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Icon Only"
          description="Compact tab bar with icons only, no labels."
          code={ICON_ONLY_EXAMPLE}
          filename="icon-only.tsx"
        >
          <div className="w-full max-w-sm">
            <IconOnlyDemo />
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">tabs</td>
                <td className="px-4 py-3 text-muted-foreground">TabBarTab[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">active</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(id: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">"default" | "filled" | "pill" | "minimal" | "floating"</td>
                <td className="px-4 py-3 text-muted-foreground">"default"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">iconOnly</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ComponentDocPage>
  );
}
