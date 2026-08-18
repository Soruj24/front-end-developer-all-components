"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Wind } from "lucide-react";

const installCommand = `npx component-library@latest add wind-breeze`;
const usageCode = `import { WindBreeze } from "@/components/_wind-breeze";

<WindBreeze intensity="gentle" />`;

function BreezeIndicator({ label, speed }: { label: string; speed: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <Wind className="h-5 w-5 text-primary animate-[spin_3s_linear_infinite]" />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{speed}</p>
      </div>
    </div>
  );
}

function WindLines({ count }: { count: number }) {
  return (
    <div className="relative h-8 w-48 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="absolute h-0.5 rounded-full bg-primary/40 animate-[slide-right_2s_linear_infinite]"
          style={{
            top: `${(i / count) * 100}%`,
            width: `${40 + Math.random() * 60}%`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function WindBreezePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Wind Breeze</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated wind effects with flowing lines, breeze indicators, and airflow visualizations.
        </p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Wind Animation</h2>
        <div className="flex items-center gap-8">
          <WindLines count={5} />
          <WindLines count={8} />
          <WindLines count={3} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Breeze Levels</h2>
        <div className="grid grid-cols-3 gap-3">
          <BreezeIndicator label="Calm" speed="1-5 km/h" />
          <BreezeIndicator label="Gentle" speed="6-11 km/h" />
          <BreezeIndicator label="Strong" speed="39-49 km/h" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Intensity Sizes</h2>
        <div className="flex items-end gap-6">
          <Wind className="h-4 w-4 text-muted-foreground animate-[spin_4s_linear_infinite]" />
          <Wind className="h-6 w-6 text-muted-foreground animate-[spin_3s_linear_infinite]" />
          <Wind className="h-8 w-8 text-muted-foreground animate-[spin_2s_linear_infinite]" />
          <Wind className="h-10 w-10 text-muted-foreground animate-[spin_1.5s_linear_infinite]" />
          <Wind className="h-12 w-12 text-muted-foreground animate-[spin_1s_linear_infinite]" />
        </div>
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
                <td className="px-4 py-3 font-mono text-xs">intensity</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;calm&quot; | &quot;gentle&quot; | &quot;moderate&quot; | &quot;strong&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;gentle&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">direction</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;left&quot; | &quot;right&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;right&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
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
