"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { RotateCcw } from "lucide-react";

const installCommand = `npx component-library@latest add zoom-reset`;
const usageCode = `// usage`;

export default function ZoomResetPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zoom Reset</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A zoom reset component that provides a button to reset zoom level to default with animated transition and keyboard shortcut support.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zoom Reset Demo</h2><p className="mt-1 text-sm text-muted-foreground">Reset zoom level to default with a single click.</p></div>
        <ComponentPreview id="zoom-reset-demo"><div className="w-full p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg border p-1">
              <button className="rounded-md px-2 py-1 text-xs hover:bg-muted">-</button>
              <span className="min-w-[3rem] text-center text-xs font-medium">150%</span>
              <button className="rounded-md px-2 py-1 text-xs hover:bg-muted">+</button>
            </div>
            <button className="flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium hover:bg-muted">
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
            <span className="text-[10px] text-muted-foreground">Press Ctrl+0 to reset</span>
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
