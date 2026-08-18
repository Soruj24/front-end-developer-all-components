"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add glow-effect`;
const usageCode = `import { GlowEffect } from "@/components/ui/glow-effect";

<GlowEffect color="primary" size="md">
  <div>Glowing element</div>
</GlowEffect>`;

export default function GlowEffectPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Glow Effect</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A glow effect component for adding luminous halos, neon effects, and ambient light around UI elements.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Glow Colors</h2><p className="mt-1 text-sm text-muted-foreground">Different colored glow effects.</p></div>
        <ComponentPreview id="glow-colors">
          <div className="w-full p-4">
            <div className="flex items-center gap-6 justify-center">
              {[
                { color: "bg-primary", glow: "shadow-primary/50" },
                { color: "bg-green-500", glow: "shadow-green-500/50" },
                { color: "bg-purple-500", glow: "shadow-purple-500/50" },
                { color: "bg-amber-500", glow: "shadow-amber-500/50" },
              ].map((item) => (
                <div key={item.color} className={`h-12 w-12 rounded-xl ${item.color} shadow-lg ${item.glow}`} />
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Pulsing Glow</h2><p className="mt-1 text-sm text-muted-foreground">Glow effects that pulse with animation.</p></div>
        <ComponentPreview id="glow-pulsing">
          <div className="w-full p-4">
            <div className="flex items-center gap-8 justify-center">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-primary animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-ping" />
              </div>
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-green-500" />
                <div className="absolute inset-0 rounded-full bg-green-500/30 blur-xl animate-pulse" />
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Card Glow</h2><p className="mt-1 text-sm text-muted-foreground">Glow applied to card borders on hover.</p></div>
        <ComponentPreview id="glow-card">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto rounded-xl border border-border bg-card p-6 cursor-pointer hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-shadow">
              <div className="h-8 w-8 rounded-lg bg-primary/10 mb-3" />
              <p className="text-sm font-medium">Hover to glow</p>
              <p className="text-xs text-muted-foreground mt-1">This card has a hover glow effect.</p>
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
