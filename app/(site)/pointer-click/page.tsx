"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { MousePointerClick } from "lucide-react";

const installCommand = `npx component-library@latest add pointer-click`;
const usageCode = `import { PointerClick } from "@/components/pointer-click";

<PointerClick
  onClick={() => handleClick()}
  label="Click me"
/>`;

export default function PointerClickPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Pointer Click</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An interactive click indicator component showing pointer interactions with visual feedback and ripple effects.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Click Target</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all">
              <MousePointerClick className="h-6 w-6 text-primary" />
              <div className="absolute h-4 w-4 rounded-full bg-primary/20 animate-ping" />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Click Ripple</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative overflow-hidden rounded-lg bg-primary px-6 py-3 text-primary-foreground cursor-pointer">
              <span className="relative z-10 text-sm font-medium">Click Ripple Effect</span>
              <div className="absolute inset-0 bg-white/20 scale-0 rounded-full animate-ping" />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Hover States</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center gap-4 p-8">
            {["Default", "Hover", "Active"].map((state, i) => (
              <div key={state} className={`rounded-lg border p-4 text-sm cursor-pointer transition-all ${i === 1 ? "border-primary bg-primary/5 scale-105" : i === 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted"}`}>
                {state}
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onClick</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
