"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Flower2 } from "lucide-react";

const installCommand = `npx component-library@latest add zen-garden`;
const usageCode = `// usage`;

export default function ZenGardenPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zen Garden</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A zen garden animation component that creates calming, organic motion patterns inspired by Japanese rock gardens.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zen Garden Demo</h2><p className="mt-1 text-sm text-muted-foreground">Calming organic motion patterns inspired by zen gardens.</p></div>
        <ComponentPreview id="zen-garden-demo"><div className="w-full p-4">
          <div className="relative h-32 overflow-hidden rounded-lg border bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900">
            <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 200 100">
              <path d="M0 50 Q25 20 50 50 T100 50 T150 50 T200 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-stone-400" />
              <path d="M0 60 Q25 30 50 60 T100 60 T150 60 T200 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-stone-400" />
              <path d="M0 40 Q25 10 50 40 T100 40 T150 40 T200 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-stone-400" />
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Flower2 className="h-8 w-8 text-stone-500 animate-pulse" />
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
