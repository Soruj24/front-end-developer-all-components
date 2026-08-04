"use client";

import { Resizable, ResizablePanel, ResizableHandle } from "@/components/_resizable";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add resizable`;

const usageCode = `import { Resizable, ResizablePanel, ResizableHandle } from "@/components/_resizable";

<Resizable defaultSizes={[50, 50]}>
  <ResizablePanel>Panel 1</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Panel 2</ResizablePanel>
</Resizable>`;

export default function ResizablePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Resizable</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Accessible resizable panel groups and layouts with drag-to-resize handles.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Default */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Two resizable panels.</p>
        </div>
        <ComponentPreview id="resizable-default">
          <Resizable defaultSizes={[50, 50]} className="h-48">
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Panel 1</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Panel 2</div>
            </ResizablePanel>
          </Resizable>
        </ComponentPreview>
      </section>

      {/* Three Panels */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Three Panels</h2>
          <p className="mt-1 text-sm text-muted-foreground">Three resizable panels.</p>
        </div>
        <ComponentPreview id="resizable-three">
          <Resizable defaultSizes={[33, 33, 34]} className="h-48">
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Sidebar</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Content</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel>
              <div className="flex h-full items-center justify-center rounded border bg-muted/50 p-4">Preview</div>
            </ResizablePanel>
          </Resizable>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">defaultSizes</td>
                <td className="px-4 py-3 text-muted-foreground">number[]</td>
                <td className="px-4 py-3 text-muted-foreground">Evenly distributed</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">collapsible</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onSizesChange</td>
                <td className="px-4 py-3 text-muted-foreground">(sizes: number[]) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
