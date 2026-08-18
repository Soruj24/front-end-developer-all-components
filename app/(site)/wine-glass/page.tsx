"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Wine } from "lucide-react";

const installCommand = `npx component-library@latest add wine-glass`;
const usageCode = `import { WineGlass } from "@/components/_wine-glass";

<WineGlass type="red" fill={75} />`;

function GlassDisplay({ type, fill, label }: { type: string; fill: number; label: string }) {
  const colors: Record<string, string> = {
    red: "bg-danger",
    white: "bg-warning/60",
    rose: "bg-pink-400",
    champagne: "bg-amber-300",
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative flex h-32 w-16 items-end overflow-hidden rounded-b-full border-2 border-border border-t-0">
        <div className={`w-full rounded-b-full ${colors[type] || colors.red}`} style={{ height: `${fill}%` }} />
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

function WineCard({ name, region, year, type }: { name: string; region: string; year: string; type: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-2 flex items-center gap-2">
        <Wine className="h-4 w-4 text-danger" />
        <span className="text-sm font-medium">{name}</span>
      </div>
      <p className="text-xs text-muted-foreground">{region} · {year}</p>
      <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary capitalize">{type}</span>
    </div>
  );
}

export default function WineGlassPage() {
  const wines = [
    { name: "Cabernet Sauvignon", region: "Napa Valley", year: "2019", type: "red" },
    { name: "Chardonnay", region: "Sonoma", year: "2021", type: "white" },
    { name: "Rosé", region: "Provence", year: "2022", type: "rose" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Wine Glass</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Wine glass illustrations with fill levels, type indicators, and collection cards.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Glass Types</h2>
        <div className="flex items-end gap-8">
          <GlassDisplay type="red" fill={80} label="Red" />
          <GlassDisplay type="white" fill={60} label="White" />
          <GlassDisplay type="rose" fill={70} label="Rosé" />
          <GlassDisplay type="champagne" fill={50} label="Champagne" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Wine Collection</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {wines.map((w) => (
            <WineCard key={w.name} {...w} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Fill Levels</h2>
        <div className="flex items-end gap-4">
          {[25, 50, 75, 100].map((level) => (
            <div key={level} className="flex flex-col items-center gap-1">
              <div className="relative flex h-24 w-10 items-end overflow-hidden rounded-b-full border-2 border-border border-t-0">
                <div className="w-full rounded-b-full bg-danger" style={{ height: `${level}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{level}%</span>
            </div>
          ))}
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
                <td className="px-4 py-3 font-mono text-xs">type</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;red&quot; | &quot;white&quot; | &quot;rose&quot; | &quot;champagne&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;red&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">fill</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">50</td>
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
