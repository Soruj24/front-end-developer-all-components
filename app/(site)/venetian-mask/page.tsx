"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Eye, EyeOff, Mask } from "lucide-react";

const installCommand = `npx component-library@latest add venetian-mask`;
const usageCode = `import { VenetianMask } from "@/components/_venetian-mask";

<VenetianMask variant="elegant" />`;

function MaskCard({ name, style, color }: { name: string; style: string; color: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-border p-4 ${color}`}>
      <div className="mb-3 flex items-center gap-2">
        <Mask className="h-5 w-5" />
        <p className="text-sm font-medium">{name}</p>
      </div>
      <p className="text-xs text-muted-foreground">{style}</p>
    </div>
  );
}

export default function VenetianMaskPage() {
  const masks = [
    { name: "Columbina", style: "Half-face, elegant", color: "bg-primary/5" },
    { name: "Bauta", style: "Full-face, angular", color: "bg-warning/5" },
    { name: "Medico della Peste", style: "Plague doctor", color: "bg-danger/5" },
    { name: "Volto", style: "Full face, ghost-like", color: "bg-muted/50" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Venetian Mask</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Decorative mask illustrations and anonymity indicators with reveal/hide functionality.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Mask Types</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {masks.map((m) => (
            <MaskCard key={m.name} {...m} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Anonymity Toggle</h2>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            <EyeOff className="h-4 w-4" />
            Anonymous
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            <Eye className="h-4 w-4" />
            Reveal Identity
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Size Variants</h2>
        <div className="flex items-end gap-4">
          <Mask className="h-6 w-6 text-muted-foreground" />
          <Mask className="h-8 w-8 text-muted-foreground" />
          <Mask className="h-10 w-10 text-muted-foreground" />
          <Mask className="h-12 w-12 text-muted-foreground" />
          <Mask className="h-16 w-16 text-muted-foreground" />
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;elegant&quot; | &quot;full&quot; | &quot;plague&quot; | &quot;ghost&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;elegant&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
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
