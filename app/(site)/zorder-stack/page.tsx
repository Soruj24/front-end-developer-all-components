"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Layers } from "lucide-react";

const installCommand = `npx component-library@latest add zorder-stack`;
const usageCode = `// usage`;

export default function ZorderStackPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Z-order Stack</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A z-order stack component for managing layering and stacking contexts of overlapping elements.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Z-order Stack Demo</h2><p className="mt-1 text-sm text-muted-foreground">Overlapping layers with different z-index values.</p></div>
        <ComponentPreview id="zorder-stack-demo"><div className="w-full p-4">
          <div className="relative h-32">
            <div className="absolute left-4 top-4 h-20 w-20 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-xs" style={{ zIndex: 1 }}>z-1</div>
            <div className="absolute left-12 top-8 h-20 w-20 rounded-lg bg-primary/40 border border-primary/50 flex items-center justify-center text-xs" style={{ zIndex: 2 }}>z-2</div>
            <div className="absolute left-20 top-12 h-20 w-20 rounded-lg bg-primary/60 border border-primary/70 flex items-center justify-center text-xs text-white" style={{ zIndex: 3 }}>z-3</div>
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
