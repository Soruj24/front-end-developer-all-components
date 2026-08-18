"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { PanelTop } from "lucide-react";

const installCommand = `npx component-library@latest add zone-header`;
const usageCode = `// usage`;

export default function ZoneHeaderPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zone Header</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A zone header component for creating section headers with title, description, breadcrumb navigation, and action buttons.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zone Header Demo</h2><p className="mt-1 text-sm text-muted-foreground">A section header with title, description, and actions.</p></div>
        <ComponentPreview id="zone-header-demo"><div className="w-full p-4">
          <div className="flex flex-col gap-3 border-b pb-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Home</span><span>/</span><span>Components</span><span>/</span><span className="text-foreground">Zone Header</span>
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">Zone Header</h2>
                <p className="text-sm text-muted-foreground">A header component for zone sections.</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted">Cancel</button>
                <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">Save</button>
              </div>
            </div>
          </div>
        </div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
