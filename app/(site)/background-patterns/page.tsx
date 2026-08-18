"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Button } from "@/components/ui";

const installCommand = "npx component-library@latest add background-patterns";

const usageCode = `import { BackgroundPatterns } from "@/components/ui";

export default function Example() {
  return <BackgroundPatterns variant="dots" color="#6366f1" />;
}`;

const patterns = [
  { id: "dots", label: "Dots" },
  { id: "grid", label: "Grid" },
  { id: "diagonal", label: "Diagonal" },
  { id: "waves", label: "Waves" },
];

function PatternCard({ pattern, color }: { pattern: string; color: string }) {
  const svgPatterns: Record<string, string> = {
    dots: `<circle cx="10" cy="10" r="1.5" fill="${color}" />`,
    grid: `<path d="M 20 0 L 0 0 0 20" fill="none" stroke="${color}" stroke-width="0.5" />`,
    diagonal: `<path d="M 0 10 L 10 0 M -2 2 L 2 -2 M 8 12 L 12 8" stroke="${color}" stroke-width="0.5" />`,
    waves: `<path d="M 0 10 Q 5 5 10 10 T 20 10" fill="none" stroke="${color}" stroke-width="0.5" />`,
  };
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-lg border border-border" style={{ backgroundColor: `${color}08` }}>
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id={pattern} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" dangerouslySetInnerHTML={{ __html: svgPatterns[pattern] }} /></defs>
        <rect width="100%" height="100%" fill={`url(#${pattern})`} />
      </svg>
    </div>
  );
}

export default function BackgroundPatternsPage() {
  const [activePattern, setActivePattern] = useState("dots");
  const [color, setColor] = useState("#6366f1");
  const colors = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Background Patterns</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          SVG background pattern generators with customizable colors, density, and animation options for hero sections.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">All Patterns</h3>
          <ComponentPreview id="background-patterns-default">
            <div className="grid w-full grid-cols-2 gap-3">
              {patterns.map((p) => <PatternCard key={p.id} pattern={p.id} color="#6366f1" />)}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Color Variations</h3>
          <ComponentPreview id="background-patterns-colors">
            <div className="grid w-full grid-cols-5 gap-2">
              {colors.map((c) => (
                <button key={c} onClick={() => setColor(c)} className={`h-8 rounded-md border-2 transition-all ${color === c ? "border-foreground scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="background-patterns-interactive">
            <div className="w-full">
              <div className="mb-3 flex gap-2">
                {patterns.map((p) => (
                  <Button key={p.id} variant={activePattern === p.id ? "default" : "outline"} size="sm" onClick={() => setActivePattern(p.id)}>{p.label}</Button>
                ))}
              </div>
              <PatternCard pattern={activePattern} color={color} />
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">"dots" | "grid" | "diagonal" | "waves"</td>
                <td className="px-4 py-3 text-muted-foreground">"dots"</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"#000"</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}