"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Minus } from "lucide-react";

const installCommand = `npx component-library@latest add zigzag-divider`;
const usageCode = `// usage`;

export default function ZigzagDividerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zigzag Divider</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A decorative zigzag divider for visually separating sections with a distinctive zigzag pattern.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zigzag Divider Demo</h2><p className="mt-1 text-sm text-muted-foreground">A zigzag pattern divider between two content sections.</p></div>
        <ComponentPreview id="zigzag-divider-demo"><div className="w-full p-4">
          <div className="flex flex-col gap-0">
            <div className="bg-muted/30 p-4 text-sm text-muted-foreground rounded-t-lg">Content above</div>
            <svg className="w-full h-4" viewBox="0 0 200 16" preserveAspectRatio="none">
              <path d="M0 0 L10 16 L20 0 L30 16 L40 0 L50 16 L60 0 L70 16 L80 0 L90 16 L100 0 L110 16 L120 0 L130 16 L140 0 L150 16 L160 0 L170 16 L180 0 L190 16 L200 0" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
            </svg>
            <div className="bg-muted/30 p-4 text-sm text-muted-foreground rounded-b-lg">Content below</div>
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
