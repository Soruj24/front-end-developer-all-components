"use client";

import { ScrollArea } from "@/components/_scroll-area";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add scroll-area`;

const usageCode = `import { ScrollArea } from "@/components/_scroll-area";

<ScrollArea maxHeight={200}>
  <div>Scrollable content here</div>
</ScrollArea>`;

export default function ScrollAreaPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Scroll Area</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Augments native scroll functionality for custom, cross-browser styling.
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
          <p className="mt-1 text-sm text-muted-foreground">Vertical scroll area.</p>
        </div>
        <ComponentPreview id="scroll-area-default">
          <ScrollArea maxHeight={200} className="w-full rounded border">
            <div className="flex flex-col gap-2 p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="rounded bg-muted/50 p-2 text-sm">Item {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        </ComponentPreview>
      </section>

      {/* Horizontal */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Horizontal</h2>
          <p className="mt-1 text-sm text-muted-foreground">Horizontal scroll area.</p>
        </div>
        <ComponentPreview id="scroll-area-horizontal">
          <ScrollArea maxHeight={100} orientation="horizontal" className="w-full rounded border">
            <div className="flex gap-4 p-4">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex h-20 w-32 shrink-0 items-center justify-center rounded bg-muted/50 text-sm">Card {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
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
                <td className="px-4 py-3 font-mono text-xs">maxHeight</td>
                <td className="px-4 py-3 text-muted-foreground">number | string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;100%&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot; | &quot;horizontal&quot; | &quot;both&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;both&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">showScrollbar</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
