"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Resizable, ResizablePanel, ResizableHandle } from "@/components/ui/Resizable";

const RESIZABLE_SOURCE = `"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface ResizableProps { direction?: "horizontal" | "vertical"; children: ReactNode; className?: string }
interface ResizablePanelProps { children: ReactNode; defaultSize?: number; minSize?: number; collapsible?: boolean; className?: string }
interface ResizableHandleProps { className?: string }

export function Resizable({ direction = "horizontal", children, className }: ResizableProps) {
  return (
    <div role="group" aria-orientation={direction} className={cn("flex overflow-hidden rounded-xl border border-border bg-card", direction === "horizontal" ? "flex-row" : "flex-col", className)}>
      {children}
    </div>
  );
}

export function ResizablePanel({ children, defaultSize = 50, minSize, collapsible = false, className }: ResizablePanelProps) {
  return <div className={cn("overflow-auto", className)} style={{ flex: \`0 0 \${defaultSize}%\` }} data-min-size={minSize} data-collapsible={collapsible}>{children}</div>;
}

export function ResizableHandle({ className }: ResizableHandleProps) {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div role="separator" tabIndex={0} aria-orientation="vertical" onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)}
      className={cn("group relative flex w-2 items-center justify-center cursor-col-resize outline-none bg-border/50 transition-colors duration-150 hover:bg-primary/20", isDragging && "bg-primary/30", "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset", className)}>
      <div className={cn("flex h-8 w-1 flex-col items-center justify-center gap-1 rounded-full bg-muted-foreground/30 transition-all duration-150 group-hover:bg-primary/50 group-hover:h-10", isDragging && "bg-primary/60 h-10")}>
        <span className="block h-0.5 w-0.5 rounded-full bg-background/80" />
        <span className="block h-0.5 w-0.5 rounded-full bg-background/80" />
        <span className="block h-0.5 w-0.5 rounded-full bg-background/80" />
      </div>
    </div>
  );
}`;

export default function ResizablePage() {
  return (
    <ComponentDocPage
      name="Resizable"
      category="Layout"
      description="Professional resizable panel groups with drag-to-resize handles. Perfect for code editors, dashboards, split views, and IDE layouts."
    >
      <PreviewPanel filename="resizable-preview.tsx">
        <Resizable defaultSizes={[50, 50]} className="h-48">
          <ResizablePanel>
            <div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">Panel 1</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">Panel 2</div>
          </ResizablePanel>
        </Resizable>
      </PreviewPanel>

      <SourceCodeViewer
        source={RESIZABLE_SOURCE}
        filename="components/ui/Resizable/Resizable.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Two resizable panels with equal width."
          code={`<Resizable defaultSizes={[50, 50]} className="h-48">\n  <ResizablePanel>Panel 1</ResizablePanel>\n  <ResizableHandle />\n  <ResizablePanel>Panel 2</ResizablePanel>\n</Resizable>`}
          filename="basic.tsx"
        >
          <Resizable defaultSizes={[50, 50]} className="h-48">
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">Panel 1</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">Panel 2</div>
            </ResizablePanel>
          </Resizable>
        </ExampleBlock>

        <ExampleBlock
          title="Three Panels"
          description="Three-panel layout with sidebar, content, and preview."
          code={`<Resizable defaultSizes={[33, 34, 33]} className="h-48">\n  <ResizablePanel>Left</ResizablePanel>\n  <ResizableHandle />\n  <ResizablePanel>Center</ResizablePanel>\n  <ResizableHandle />\n  <ResizablePanel>Right</ResizablePanel>\n</Resizable>`}
          filename="three-panels.tsx"
        >
          <Resizable defaultSizes={[33, 34, 33]} className="h-48">
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">Left</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">Center</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">Right</div>
            </ResizablePanel>
          </Resizable>
        </ExampleBlock>

        <ExampleBlock
          title="Four Panels"
          description="Quad-panel layout for complex interfaces."
          code={`<Resizable defaultSizes={[25, 25, 25, 25]} className="h-48">...</Resizable>`}
          filename="four-panels.tsx"
        >
          <Resizable defaultSizes={[25, 25, 25, 25]} className="h-48">
            <ResizablePanel><div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">1</div></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel><div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">2</div></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel><div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">3</div></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel><div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">4</div></ResizablePanel>
          </Resizable>
        </ExampleBlock>

        <ExampleBlock
          title="Sidebar Layout"
          description="File explorer sidebar with main content area."
          code={`<Resizable defaultSizes={[25, 75]} className="h-64">...</Resizable>`}
          filename="sidebar.tsx"
        >
          <Resizable defaultSizes={[25, 75]} className="h-64">
            <ResizablePanel>
              <div className="flex h-full flex-col rounded-xl bg-muted/30 p-3">
                <div className="mb-2 text-xs font-medium text-muted-foreground">Explorer</div>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="rounded-lg bg-muted px-2 py-1.5">src</div>
                  <div className="rounded-lg px-2 py-1.5 pl-4">components</div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">Main Content</div>
            </ResizablePanel>
          </Resizable>
        </ExampleBlock>

        <ExampleBlock
          title="Nested Panels"
          description="Nested resizable panels for complex layouts."
          code={`<Resizable defaultSizes={[30, 70]} className="h-64">...</Resizable>`}
          filename="nested.tsx"
        >
          <Resizable defaultSizes={[30, 70]} className="h-64">
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded-xl bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300">Left Panel</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <Resizable defaultSizes={[50, 50]} className="h-full">
                <ResizablePanel>
                  <div className="flex h-full items-center justify-center rounded-xl bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">Top Right</div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                  <div className="flex h-full items-center justify-center rounded-xl bg-purple-50 p-4 text-sm text-purple-700 dark:bg-purple-950 dark:text-purple-300">Bottom Right</div>
                </ResizablePanel>
              </Resizable>
            </ResizablePanel>
          </Resizable>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical"
          description="Vertical resize direction."
          code={`<Resizable direction="vertical" defaultSizes={[50, 50]} className="h-64">...</Resizable>`}
          filename="vertical.tsx"
        >
          <Resizable direction="vertical" defaultSizes={[50, 50]} className="h-64">
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">Top</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded-xl bg-muted/30 p-4 text-sm text-muted-foreground">Bottom</div>
            </ResizablePanel>
          </Resizable>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Component</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">Resizable</td>
                <td className="px-4 py-3 text-muted-foreground">direction</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot;</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">ResizablePanel</td>
                <td className="px-4 py-3 text-muted-foreground">defaultSize</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">50</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">ResizablePanel</td>
                <td className="px-4 py-3 text-muted-foreground">minSize</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">ResizablePanel</td>
                <td className="px-4 py-3 text-muted-foreground">collapsible</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">ResizableHandle</td>
                <td className="px-4 py-3 text-muted-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
