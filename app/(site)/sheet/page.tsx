"use client";

import { Sheet } from "@/components/_sheet";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add sheet`;

const usageCode = `import { Sheet } from "@/components/_sheet";

<Sheet
  trigger={<button>Open</button>}
  title="Edit Profile"
  description="Make changes here."
>
  <p>Sheet content</p>
</Sheet>`;

export default function SheetPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sheet</h1>
          <Badge variant="primary">Overlay</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A sliding panel that slides in from the edge of the screen.
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
          <p className="mt-1 text-sm text-muted-foreground">Default sheet sliding from the right.</p>
        </div>
        <ComponentPreview id="sheet-default">
          <Sheet
            trigger={<button className="rounded border px-4 py-2 text-sm">Open Sheet</button>}
            title="Edit Profile"
            description="Make changes to your profile here."
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Name</label>
                <input className="rounded border px-3 py-2 text-sm" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <input className="rounded border px-3 py-2 text-sm" />
              </div>
            </div>
          </Sheet>
        </ComponentPreview>
      </section>

      {/* Sides */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sides</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sheet from different sides.</p>
        </div>
        <ComponentPreview id="sheet-sides">
          <div className="flex flex-wrap gap-2">
            <Sheet side="left" trigger={<button className="rounded border px-4 py-2 text-sm">Left</button>} title="Left Sheet">
              <p className="text-sm text-muted-foreground">Content from the left.</p>
            </Sheet>
            <Sheet side="right" trigger={<button className="rounded border px-4 py-2 text-sm">Right</button>} title="Right Sheet">
              <p className="text-sm text-muted-foreground">Content from the right.</p>
            </Sheet>
            <Sheet side="top" trigger={<button className="rounded border px-4 py-2 text-sm">Top</button>} title="Top Sheet">
              <p className="text-sm text-muted-foreground">Content from the top.</p>
            </Sheet>
            <Sheet side="bottom" trigger={<button className="rounded border px-4 py-2 text-sm">Bottom</button>} title="Bottom Sheet">
              <p className="text-sm text-muted-foreground">Content from the bottom.</p>
            </Sheet>
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
                <td className="px-4 py-3 font-mono text-xs">side</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;top&quot; | &quot;right&quot; | &quot;bottom&quot; | &quot;left&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;right&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;full&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">trigger</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
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
