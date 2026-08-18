"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { PanelBottom } from "lucide-react";

const installCommand = `npx component-library@latest add panel-bottom`;
const usageCode = `import { PanelBottom } from "@/components/panel-bottom";

<PanelBottom title="Details">
  <p>Panel content here</p>
</PanelBottom>`;

export default function PanelBottomPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Panel Bottom</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A bottom-anchored panel component for drawers, toolbars, and contextual information panels in your application.</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Default Panel</h2>
        <ComponentPreview>
          <div className="w-full space-y-4">
            <div className="h-48 rounded-lg bg-muted/50" />
            <div className="rounded-t-xl border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Panel Title</span>
                <div className="h-4 w-4 rounded bg-muted" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Panel content goes here.</p>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Actions</h2>
        <ComponentPreview>
          <div className="w-full space-y-4">
            <div className="h-48 rounded-lg bg-muted/50" />
            <div className="rounded-t-xl border bg-card p-4">
              <div className="flex items-center gap-2">
                <button className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">Save</button>
                <button className="rounded-md bg-muted px-3 py-1.5 text-xs text-muted-foreground">Cancel</button>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Tabs</h2>
        <ComponentPreview>
          <div className="w-full space-y-4">
            <div className="h-48 rounded-lg bg-muted/50" />
            <div className="rounded-t-xl border bg-card">
              <div className="flex border-b">
                {["Details", "Settings", "History"].map((tab, i) => (
                  <button key={tab} className={`px-4 py-2 text-sm ${i === 0 ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}>{tab}</button>
                ))}
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">Tab content here.</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
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
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
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
