"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Pen } from "lucide-react";

const installCommand = `npx component-library@latest add zigzag-line`;
const usageCode = `// usage`;

export default function ZigzagLinePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zigzag Line</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A zigzag line component for creating decorative zigzag line separators with customizable width, height, and color.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zigzag Line Demo</h2><p className="mt-1 text-sm text-muted-foreground">Decorative zigzag line patterns in different styles.</p></div>
        <ComponentPreview id="zigzag-line-demo"><div className="w-full p-4">
          <div className="flex flex-col gap-4">
            <svg className="w-full h-4" viewBox="0 0 200 16"><path d="M0 8 L10 2 L20 8 L30 2 L40 8 L50 2 L60 8 L70 2 L80 8 L90 2 L100 8 L110 2 L120 8 L130 2 L140 8 L150 2 L160 8 L170 2 L180 8 L190 2 L200 8" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" /></svg>
            <svg className="w-full h-6" viewBox="0 0 200 24"><path d="M0 12 L15 2 L30 12 L45 2 L60 12 L75 2 L90 12 L105 2 L120 12 L135 2 L150 12 L165 2 L180 12 L195 2 L200 12" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground" /></svg>
            <svg className="w-full h-3" viewBox="0 0 200 12"><path d="M0 6 L8 1 L16 6 L24 1 L32 6 L40 1 L48 6 L56 1 L64 6 L72 1 L80 6 L88 1 L96 6 L104 1 L112 6 L120 1 L128 6 L136 1 L144 6 L152 1 L160 6 L168 1 L176 6 L184 1 L192 6 L200 6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted" /></svg>
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
