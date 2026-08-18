"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Bold, Italic, Type } from "lucide-react";

const installCommand = `npx component-library@latest add bold-text`;
const usageCode = `import { BoldText } from "@/components/bold-text";

<BoldText size="lg" weight="bold">
  Important heading
</BoldText>`;

type Weight = "normal" | "medium" | "semibold" | "bold" | "extrabold";
type Size = "sm" | "md" | "lg" | "xl" | "2xl";

const weights: { value: Weight; label: string; css: string }[] = [
  { value: "normal", label: "Normal", css: "font-normal" },
  { value: "medium", label: "Medium", css: "font-medium" },
  { value: "semibold", label: "Semibold", css: "font-semibold" },
  { value: "bold", label: "Bold", css: "font-bold" },
  { value: "extrabold", label: "Extrabold", css: "font-extrabold" },
];

const sizes: { value: Size; label: string; css: string }[] = [
  { value: "sm", label: "Small", css: "text-sm" },
  { value: "md", label: "Medium", css: "text-base" },
  { value: "lg", label: "Large", css: "text-lg" },
  { value: "xl", label: "XL", css: "text-xl" },
  { value: "2xl", label: "2XL", css: "text-2xl" },
];

function WeightDemo() {
  const [selected, setSelected] = useState<Weight>("bold");
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="flex gap-2">
        {weights.map((w) => (
          <button
            key={w.value}
            onClick={() => setSelected(w.value)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              selected === w.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {w.label}
          </button>
        ))}
      </div>
      <p className={`${weights.find((w) => w.value === selected)?.css} text-2xl text-foreground`}>
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  );
}

function SizeScaleDemo() {
  return (
    <div className="flex flex-col gap-2">
      {sizes.map((s) => (
        <div key={s.value} className="flex items-baseline gap-3">
          <span className="w-10 text-xs text-muted-foreground">{s.label}</span>
          <span className={`${s.css} font-bold text-foreground`}>Heading Text</span>
        </div>
      ))}
    </div>
  );
}

function HeadingHierarchyDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Page Title</h1>
        <span className="text-[10px] text-muted-foreground">3xl / extrabold</span>
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Section Heading</h2>
        <span className="text-[10px] text-muted-foreground">2xl / bold</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-foreground">Subsection</h3>
        <span className="text-[10px] text-muted-foreground">xl / semibold</span>
      </div>
      <div>
        <h4 className="text-lg font-medium text-foreground">Card Title</h4>
        <span className="text-[10px] text-muted-foreground">lg / medium</span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Body text uses normal weight for comfortable reading.</p>
        <span className="text-[10px] text-muted-foreground">sm / normal</span>
      </div>
    </div>
  );
}

export default function BoldTextPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Bold Text</h1>
          <Badge variant="primary">Typography</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Typography component with configurable font weights, sizes, and heading hierarchy for consistent text styling.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Weight Selector</h2>
        <ComponentPreview>
          <WeightDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Size Scale</h2>
        <ComponentPreview>
          <SizeScaleDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Heading Hierarchy</h2>
        <ComponentPreview>
          <HeadingHierarchyDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">weight</td><td className="px-4 py-3 text-muted-foreground">{'"normal" | "medium" | "semibold" | "bold" | "extrabold"'}</td><td className="px-4 py-3 text-muted-foreground">{'"bold"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">{'"sm" | "md" | "lg" | "xl" | "2xl"'}</td><td className="px-4 py-3 text-muted-foreground">{'"md"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">as</td><td className="px-4 py-3 text-muted-foreground">{'"p" | "h1" | "h2" | "h3" | "h4" | "span"'}</td><td className="px-4 py-3 text-muted-foreground">{'"p"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
