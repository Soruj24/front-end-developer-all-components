"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Move } from "lucide-react";

const installCommand = `npx component-library@latest add zoom-pan`;
const usageCode = `// usage`;

export default function ZoomPanPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zoom Pan</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A zoom and pan component that allows users to zoom into content and pan around with mouse drag and scroll.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zoom Pan Demo</h2><p className="mt-1 text-sm text-muted-foreground">Zoom and pan around the content area.</p></div>
        <ComponentPreview id="zoom-pan-demo"><div className="w-full p-4">
          <div className="relative overflow-hidden rounded-lg border">
            <div className="flex h-40 items-center justify-center bg-muted/20 cursor-grab active:cursor-grabbing">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Move className="h-6 w-6" />
                <span className="text-xs">Click and drag to pan • Scroll to zoom</span>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 flex gap-1">
              <button className="rounded bg-background/80 px-2 py-1 text-xs backdrop-blur">+</button>
              <button className="rounded bg-background/80 px-2 py-1 text-xs backdrop-blur">-</button>
              <button className="rounded bg-background/80 px-2 py-1 text-xs backdrop-blur">Reset</button>
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
