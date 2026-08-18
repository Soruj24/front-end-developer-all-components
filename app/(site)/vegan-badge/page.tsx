"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Leaf, Check } from "lucide-react";

const installCommand = `npx component-library@latest add vegan-badge`;
const usageCode = `import { VeganBadge } from "@/components/_vegan-badge";

<VeganBadge />`;

function LabelBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${color}`}>
      <Leaf className="h-3 w-3" />
      {label}
    </span>
  );
}

function ProductCard({ name, badges }: { name: string; badges: { label: string; color: string }[] }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-3 h-24 rounded-md bg-muted" />
      <p className="mb-2 text-sm font-medium">{name}</p>
      <div className="flex flex-wrap gap-1.5">
        {badges.map((b) => (
          <LabelBadge key={b.label} {...b} />
        ))}
      </div>
    </div>
  );
}

export default function VeganBadgePage() {
  const badgeColors = [
    { label: "Vegan", color: "bg-success/10 text-success" },
    { label: "Organic", color: "bg-primary/10 text-primary" },
    { label: "Gluten-Free", color: "bg-warning/10 text-warning" },
    { label: "Non-GMO", color: "bg-info/10 text-info" },
  ];

  const products = [
    { name: "Almond Milk", badges: [badgeColors[0], badgeColors[1], badgeColors[3]] },
    { name: "Oat Bar", badges: [badgeColors[0], badgeColors[2]] },
    { name: "Quinoa Bowl", badges: [badgeColors[0], badgeColors[1], badgeColors[2], badgeColors[3]] },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Vegan Badge</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Dietary and certification badges for vegan, organic, and allergen-free product labels.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Badge Variants</h2>
        <div className="flex flex-wrap gap-2">
          {badgeColors.map((b) => (
            <LabelBadge key={b.label} {...b} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Product Cards</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Verified Checkmark</h2>
        <div className="flex items-center gap-2 rounded-lg border border-success/20 bg-success/5 px-4 py-2">
          <Check className="h-4 w-4 text-success" />
          <span className="text-sm font-medium text-success">Certified Vegan</span>
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
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Vegan&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;filled&quot; | &quot;outlined&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;filled&quot;</td>
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
