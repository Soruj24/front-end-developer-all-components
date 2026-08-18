"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add glass-card`;
const usageCode = `import { GlassCard } from "@/components/ui/glass-card";

<GlassCard>
  <div>Glassmorphism content</div>
</GlassCard>`;

export default function GlassCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Glass Card</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A glassmorphism card component with blur effects, transparency, and frosted glass visual styling.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Glass</h2><p className="mt-1 text-sm text-muted-foreground">A card with frosted glass effect.</p></div>
        <ComponentPreview id="glass-card-basic">
          <div className="w-full p-4">
            <div className="relative max-w-sm mx-auto h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/30 via-purple-500/20 to-pink-500/30">
              <div className="absolute inset-4 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <p className="text-sm font-medium">Glass Card</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Content</h2><p className="mt-1 text-sm text-muted-foreground">Glass card with structured content.</p></div>
        <ComponentPreview id="glass-card-content">
          <div className="w-full p-4">
            <div className="relative max-w-sm mx-auto h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/30 to-cyan-500/30">
              <div className="absolute inset-4 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 p-5">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mb-3">🎨</div>
                <h3 className="text-sm font-semibold">Design System</h3>
                <p className="text-xs text-muted-foreground mt-1">Beautiful glassmorphism components for modern web apps.</p>
                <div className="mt-4 flex gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-white/20 text-xs font-medium">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Nested Glass</h2><p className="mt-1 text-sm text-muted-foreground">Multiple glass layers for depth effect.</p></div>
        <ComponentPreview id="glass-card-nested">
          <div className="w-full p-4">
            <div className="relative max-w-sm mx-auto h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30">
              <div className="absolute inset-6 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20" />
              <div className="absolute inset-10 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <p className="text-xs font-medium">Nested Glass</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
