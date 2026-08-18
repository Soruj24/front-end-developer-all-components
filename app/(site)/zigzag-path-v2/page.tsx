"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { TrendingUp } from "lucide-react";

const installCommand = `npx component-library@latest add zigzag-path-v2`;
const usageCode = `// usage`;

export default function ZigzagPathV2Page() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zigzag Path V2</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An enhanced zigzag path component with SVG path animations, customizable amplitudes, and gradient stroke support.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zigzag Path V2 Demo</h2><p className="mt-1 text-sm text-muted-foreground">Animated zigzag paths with different amplitudes and styles.</p></div>
        <ComponentPreview id="zigzag-path-v2-demo"><div className="w-full p-4">
          <div className="flex flex-col gap-3">
            <svg className="w-full h-8" viewBox="0 0 400 32">
              <path d="M0 16 L12 4 L24 16 L36 4 L48 16 L60 4 L72 16 L84 4 L96 16 L108 4 L120 16 L132 4 L144 16 L156 4 L168 16 L180 4 L192 16 L204 4 L216 16 L228 4 L240 16 L252 4 L264 16 L276 4 L288 16 L300 4 L312 16 L324 4 L336 16 L348 4 L360 16 L372 4 L384 16 L396 4 L400 16" fill="none" stroke="url(#gradient1)" strokeWidth="2" />
              <defs><linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="hsl(var(--primary))" /><stop offset="100%" stopColor="hsl(var(--primary) / 0.3)" /></linearGradient></defs>
            </svg>
            <svg className="w-full h-6" viewBox="0 0 400 24">
              <path d="M0 12 L20 2 L40 12 L60 2 L80 12 L100 2 L120 12 L140 2 L160 12 L180 2 L200 12 L220 2 L240 12 L260 2 L280 12 L300 2 L320 12 L340 2 L360 12 L380 2 L400 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" strokeDasharray="4 2" />
            </svg>
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
