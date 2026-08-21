"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CENTER_SOURCE } from "./center-source";
import { BothDemo, HorizontalDemo, VerticalDemo, PaddingDemo, AbsoluteDemo, FlexboxDemo, HeroDemo } from "./center-demos";

export default function CenterLayoutPage() {
  return (
    <ComponentDocPage
      name="Center Layout"
      category="Layout"
      description="Center content both horizontally and vertically. Supports single-axis centering, absolute positioning, and responsive padding for hero sections and modals."
    >
      <PreviewPanel filename="center.tsx">
        <BothDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CENTER_SOURCE}
        filename="components/ui/Center/Center.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Horizontal Center Only"
          description="Center content horizontally while keeping it top-aligned."
          code={'<Center axis="x" className="h-48">\n  <div>Top-aligned, horizontally centered</div>\n</Center>'}
        >
          <HorizontalDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Vertical Center Only"
          description="Center content vertically while keeping it left-aligned."
          code={'<Center axis="y" className="h-48">\n  <div>Vertically centered</div>\n</Center>'}
        >
          <VerticalDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Center with Padding"
          description="Center with responsive padding and max-width constraints."
          code={'<Center padding className="h-48">\n  <div className="max-w-sm">Centered with padding</div>\n</Center>'}
        >
          <PaddingDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Absolute Center"
          description="Absolute positioning for precise centering within a container."
          code={'<div className="relative h-48">\n  <Center inset>\n    <div>Absolute Center</div>\n  </Center>\n</div>'}
        >
          <AbsoluteDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Flexbox Patterns"
          description="Common flexbox centering patterns for different scenarios."
          code={'<Center>\n  <div>Flex Center</div>\n</Center>\n\n<Center>\n  <div className="flex flex-col items-center gap-1">\n    <div>Stacked</div>\n    <span>subtitle</span>\n  </div>\n</Center>'}
        >
          <FlexboxDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Hero Pattern"
          description="Centered hero section with title, description, and CTAs."
          code={'<Center className="h-64 bg-gradient-to-br from-primary/5 to-primary/10">\n  <div className="flex flex-col items-center gap-3 text-center">\n    <h3>Welcome</h3>\n    <p>Build beautiful interfaces.</p>\n    <div className="flex gap-2">...</div>\n  </div>\n</Center>'}
        >
          <HeroDemo />
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
                <td className="px-4 py-3 font-mono text-xs">axis</td>
                <td className="px-4 py-3 text-muted-foreground">"both" | "x" | "y"</td>
                <td className="px-4 py-3 text-muted-foreground">"both"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">inset</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">padding</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ComponentDocPage>
  );
}
