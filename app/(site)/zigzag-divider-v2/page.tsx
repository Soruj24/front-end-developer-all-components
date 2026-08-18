"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Minus } from "lucide-react";

const installCommand = `npx component-library@latest add zigzag-divider-v2`;
const usageCode = `// usage`;

export default function ZigzagDividerV2Page() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zigzag Divider V2</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An enhanced zigzag divider with configurable sharpness, thickness, and color for advanced visual separation.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zigzag Divider V2 Demo</h2><p className="mt-1 text-sm text-muted-foreground">Enhanced zigzag divider with configurable patterns.</p></div>
        <ComponentPreview id="zigzag-divider-v2-demo"><div className="w-full p-4">
          <div className="flex flex-col gap-4">
            <svg className="w-full h-4" viewBox="0 0 200 16"><polygon points="0,0 10,16 20,0 30,16 40,0 50,16 60,0 70,16 80,0 90,16 100,0 110,16 120,0 130,16 140,0 150,16 160,0 170,16 180,0 190,16 200,0" fill="currentColor" className="text-primary/30" /></svg>
            <svg className="w-full h-3" viewBox="0 0 200 12"><polygon points="0,0 8,12 16,0 24,12 32,0 40,12 48,0 56,12 64,0 72,12 80,0 88,12 96,0 104,12 112,0 120,12 128,0 136,12 144,0 152,12 160,0 168,12 176,0 184,12 192,0 200,0" fill="currentColor" className="text-primary/50" /></svg>
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
