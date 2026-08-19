"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Resizable, ResizablePanel, ResizableHandle } from "@/components/ui/Resizable";

const RESIZABLE_SOURCE = `import { useState } from "react";
import { cn } from "@/lib/cn";

export function Resizable({ direction = "horizontal", children, className }) {
  return (
    <div className={cn("flex overflow-hidden", direction === "horizontal" ? "flex-row" : "flex-col", className)}>
      {children}
    </div>
  );
}

export function ResizablePanel({ children, defaultSize = 50, className }) {
  return (
    <div className={cn("overflow-auto", className)} style={{ flex: \`0 0 \${defaultSize}%\` }}>
      {children}
    </div>
  );
}

export function ResizableHandle({ className }) {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <div
      className={cn("relative flex w-1 items-center justify-center bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600", "cursor-col-resize", isDragging && "bg-zinc-400 dark:bg-zinc-500", className)}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
    >
      <div className="absolute h-8 w-1 rounded-full bg-zinc-400 dark:bg-zinc-500" />
    </div>
  );
}`;

const BASIC = `<Resizable defaultSizes={[50, 50]} className="h-48">
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Panel 1</div></ResizablePanel>
  <ResizableHandle />
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Panel 2</div></ResizablePanel>
</Resizable>`;

const THREE_PANELS = `<Resizable defaultSizes={[33, 34, 33]} className="h-48">
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Left</div></ResizablePanel>
  <ResizableHandle />
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Center</div></ResizablePanel>
  <ResizableHandle />
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Right</div></ResizablePanel>
</Resizable>`;

const FOUR_PANELS = `<Resizable defaultSizes={[25, 25, 25, 25]} className="h-48">
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">1</div></ResizablePanel>
  <ResizableHandle />
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">2</div></ResizablePanel>
  <ResizableHandle />
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">3</div></ResizablePanel>
  <ResizableHandle />
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">4</div></ResizablePanel>
</Resizable>`;

const SIDEBAR = `<Resizable defaultSizes={[25, 75]} className="h-64">
  <ResizablePanel>
    <div className="flex h-full flex-col rounded border bg-muted/30 p-3">
      <div className="mb-2 text-xs font-medium text-muted-foreground">Explorer</div>
      <div className="flex flex-col gap-1 text-sm">
        <div className="rounded bg-muted px-2 py-1">src</div>
        <div className="rounded px-2 py-1 pl-4">components</div>
      </div>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Main Content</div></ResizablePanel>
</Resizable>`;

const NESTED = `<Resizable defaultSizes={[30, 70]} className="h-64">
  <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300">Left Panel</div></ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>
    <Resizable defaultSizes={[50, 50]} className="h-full">
      <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">Top Right</div></ResizablePanel>
      <ResizableHandle />
      <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-purple-50 p-4 text-sm text-purple-700 dark:bg-purple-950 dark:text-purple-300">Bottom Right</div></ResizablePanel>
    </Resizable>
  </ResizablePanel>
</Resizable>`;

export default function ResizablePage() {
  return (
    <ComponentDocPage name="Resizable" category="Layout" description="Professional resizable panel groups with drag-to-resize handles. Perfect for code editors, dashboards, split views, and IDE layouts.">
      <PreviewPanel filename="resizable-preview">
        <Resizable defaultSizes={[50, 50]} className="h-48">
          <ResizablePanel>
            <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Panel 1</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Panel 2</div>
          </ResizablePanel>
        </Resizable>
      </PreviewPanel>

      <SourceCodeViewer source={RESIZABLE_SOURCE} filename="Resizable.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Two resizable panels with equal width." code={BASIC}>
          <Resizable defaultSizes={[50, 50]} className="h-48">
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Panel 1</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Panel 2</div>
            </ResizablePanel>
          </Resizable>
        </ExampleBlock>

        <ExampleBlock title="Three Panels" description="Three-panel layout with sidebar, content, and preview." code={THREE_PANELS}>
          <Resizable defaultSizes={[33, 34, 33]} className="h-48">
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Left</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Center</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Right</div>
            </ResizablePanel>
          </Resizable>
        </ExampleBlock>

        <ExampleBlock title="Four Panels" description="Quad-panel layout for complex interfaces." code={FOUR_PANELS}>
          <Resizable defaultSizes={[25, 25, 25, 25]} className="h-48">
            <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">1</div></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">2</div></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">3</div></ResizablePanel>
            <ResizableHandle />
            <ResizablePanel><div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">4</div></ResizablePanel>
          </Resizable>
        </ExampleBlock>

        <ExampleBlock title="Sidebar Layout" description="File explorer sidebar with main content area." code={SIDEBAR}>
          <Resizable defaultSizes={[25, 75]} className="h-64">
            <ResizablePanel>
              <div className="flex h-full flex-col rounded border bg-muted/30 p-3">
                <div className="mb-2 text-xs font-medium text-muted-foreground">Explorer</div>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="rounded bg-muted px-2 py-1">src</div>
                  <div className="rounded px-2 py-1 pl-4">components</div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Main Content</div>
            </ResizablePanel>
          </Resizable>
        </ExampleBlock>

        <ExampleBlock title="Nested Panels" description="Nested resizable panels for complex layouts." code={NESTED}>
          <Resizable defaultSizes={[30, 70]} className="h-64">
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300">Left Panel</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <Resizable defaultSizes={[50, 50]} className="h-full">
                <ResizablePanel>
                  <div className="flex h-full items-center justify-center rounded border bg-green-50 p-4 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">Top Right</div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel>
                  <div className="flex h-full items-center justify-center rounded border bg-purple-50 p-4 text-sm text-purple-700 dark:bg-purple-950 dark:text-purple-300">Bottom Right</div>
                </ResizablePanel>
              </Resizable>
            </ResizablePanel>
          </Resizable>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
