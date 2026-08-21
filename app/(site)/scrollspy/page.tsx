"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SCROLLSPY_SOURCE, SIDEBAR_EXAMPLE, DOTS_EXAMPLE, PILLS_EXAMPLE, PROGRESS_EXAMPLE } from "./scrollspy-source";
import { SidebarDemo, DotsDemo, PillsDemo, ProgressDemo, BackToTopDemo } from "./scrollspy-demos";

export default function ScrollspyPage() {
  return (
    <ComponentDocPage
      name="Scrollspy"
      category="Navigation"
      description="Track scroll position and highlight the current section in navigation. Includes progress indicators, dot navigation, and pill-style variants."
    >
      <PreviewPanel filename="scrollspy-sidebar.tsx">
        <div className="w-full">
          <SidebarDemo />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SCROLLSPY_SOURCE}
        filename="components/ui/Scrollspy/Scrollspy.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Dot Navigation"
          description="Minimal dot indicators for section tracking."
          code={DOTS_EXAMPLE}
          filename="dots.tsx"
        >
          <div className="w-full">
            <DotsDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Pill Navigation"
          description="Pill-style buttons that highlight the active section."
          code={PILLS_EXAMPLE}
          filename="pills.tsx"
        >
          <div className="w-full">
            <PillsDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Progress Bar"
          description="Shows overall scroll progress through the page."
          code={PROGRESS_EXAMPLE}
          filename="progress.tsx"
        >
          <div className="w-full">
            <ProgressDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Back to Top"
          description="Floating button that appears after scrolling down."
          code={`<ScrollspyBackToTop threshold={300} />`}
          filename="back-to-top.tsx"
        >
          <div className="w-full">
            <BackToTopDemo />
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
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">ScrollspyNavItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">offset</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">"sidebar" | "dots" | "pills"</td>
                <td className="px-4 py-3 text-muted-foreground">"sidebar"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">onSectionChange</td>
                <td className="px-4 py-3 text-muted-foreground">(id: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">showProgress</td>
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
