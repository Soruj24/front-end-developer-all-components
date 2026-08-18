"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Waves } from "lucide-react";

const installCommand = `npx component-library@latest add zigzag-wave-v2`;
const usageCode = `// usage`;

export default function ZigzagWaveV2Page() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zigzag Wave V2</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An enhanced zigzag wave animation with multi-layered SVG waves, customizable frequencies, and staggered motion.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zigzag Wave V2 Demo</h2><p className="mt-1 text-sm text-muted-foreground">Multi-layered animated zigzag waves with staggered motion.</p></div>
        <ComponentPreview id="zigzag-wave-v2-demo"><div className="w-full p-4">
          <div className="relative h-32 overflow-hidden rounded-lg border bg-gradient-to-b from-primary/5 to-primary/10">
            {[1,2,3,4].map((i) => (
              <svg key={i} className="absolute bottom-0 w-full" viewBox="0 0 400 40" style={{ opacity: 0.15 * i, animation: `waveMove ${3 + i}s ease-in-out ${i * 0.2}s infinite alternate` }}>
                <path d={`M0 ${20 + i * 3} Q50 ${10 + i * 2} 100 ${20 + i * 3} T200 ${20 + i * 3} T300 ${20 + i * 3} T400 ${20 + i * 3} L400 40 L0 40 Z`} fill="currentColor" className="text-primary" />
              </svg>
            ))}
            <style>{`@keyframes waveMove { 0% { transform: translateX(-20px); } 100% { transform: translateX(20px); } }`}</style>
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
