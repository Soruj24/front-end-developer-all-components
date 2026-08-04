"use client";

import { Marker } from "@/components/_marker";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add marker`;

const usageCode = `import { Marker } from "@/components/_marker"

<Marker />
<Marker variant="primary" />
<Marker shape="square" size={12} />`;

export default function MarkerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Marker</h1>
          <Badge variant="primary">Base UI</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A small indicator dot for status, notifications, or presence.
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

      {/* Variants */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Different color variants for the marker.
          </p>
        </div>
        <ComponentPreview id="marker-variants">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <Marker variant="default" />
              <span className="text-xs text-muted-foreground">Default</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Marker variant="primary" />
              <span className="text-xs text-muted-foreground">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Marker variant="secondary" />
              <span className="text-xs text-muted-foreground">Secondary</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Marker variant="danger" />
              <span className="text-xs text-muted-foreground">Danger</span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Shapes */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Shapes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Different shapes for the marker.
          </p>
        </div>
        <ComponentPreview id="marker-shapes">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <Marker shape="circle" />
              <span className="text-xs text-muted-foreground">Circle</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Marker shape="square" />
              <span className="text-xs text-muted-foreground">Square</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Marker shape="dot" />
              <span className="text-xs text-muted-foreground">Dot</span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sizes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Different sizes for the marker.
          </p>
        </div>
        <ComponentPreview id="marker-sizes">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <Marker size={8} />
              <span className="text-xs text-muted-foreground">8px</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Marker size={12} />
              <span className="text-xs text-muted-foreground">12px</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Marker size={16} />
              <span className="text-xs text-muted-foreground">16px</span>
            </div>
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;primary&quot; | &quot;secondary&quot; | &quot;danger&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">shape</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;circle&quot; | &quot;square&quot; | &quot;dot&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;circle&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">10</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
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
