"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ZoomIn } from "lucide-react";

const installCommand = `npx component-library@latest add zoom-control`;
const usageCode = `// usage`;

export default function ZoomControlPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zoom Control</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A zoom control component for adjusting zoom levels with buttons, slider, and keyboard shortcuts.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zoom Control Demo</h2><p className="mt-1 text-sm text-muted-foreground">Zoom in and out with precise level control.</p></div>
        <ComponentPreview id="zoom-control-demo"><div className="w-full p-4">
          <div className="flex items-center gap-2 rounded-lg border p-2">
            <button className="rounded-md p-1.5 hover:bg-muted"><ZoomIn className="h-4 w-4" /></button>
            <input type="range" min="25" max="200" defaultValue="100" className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer bg-muted accent-primary" />
            <span className="min-w-[3rem] text-center text-xs font-medium">100%</span>
            <button className="rounded-md p-1.5 hover:bg-muted"><ZoomIn className="h-4 w-4 rotate-180" /></button>
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
