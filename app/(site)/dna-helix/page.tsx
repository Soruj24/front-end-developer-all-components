"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Dna, RotateCw } from "lucide-react";

const installCommand = `npx component-library@latest add dna-helix`;
const usageCode = `import { DNAHelix } from "@/components/dna-helix";

<DNAHelix height={200} speed={2} color="primary" />`;

function DNAHelixDemo() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setOffset((o) => o + 0.1), 30);
    return () => clearInterval(interval);
  }, []);

  const numPairs = 12;
  const spacing = 20;
  const amplitude = 30;

  return (
    <div className="relative h-64 w-full max-w-xs overflow-hidden">
      {[...Array(numPairs)].map((_, i) => {
        const y = i * spacing + 5;
        const phase = offset + i * 0.5;
        const x1 = 80 + amplitude * Math.sin(phase);
        const x2 = 80 - amplitude * Math.sin(phase);
        const z = Math.cos(phase);
        const size1 = 6 + z * 2;
        const size2 = 6 - z * 2;
        return (
          <svg key={i} className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeWidth="1" className="text-border" opacity={0.4} />
            <circle cx={x1} cy={y} r={size1} className="fill-primary" opacity={0.6 + z * 0.4} />
            <circle cx={x2} cy={y} r={size2} className="fill-purple-500" opacity={0.6 - z * 0.4} />
          </svg>
        );
      })}
    </div>
  );
}

function StaticHelixDemo() {
  const numPairs = 10;
  const spacing = 22;
  const amplitude = 25;

  return (
    <div className="relative h-56 w-full max-w-xs">
      {[...Array(numPairs)].map((_, i) => {
        const y = i * spacing + 10;
        const phase = i * 0.6;
        const x1 = 70 + amplitude * Math.sin(phase);
        const x2 = 70 - amplitude * Math.sin(phase);
        return (
          <svg key={i} className="absolute inset-0 h-full w-full">
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeWidth="1" className="text-border" opacity={0.3} />
            <circle cx={x1} cy={y} r={5} className="fill-blue-500" />
            <circle cx={x2} cy={y} r={5} className="fill-pink-500" />
          </svg>
        );
      })}
    </div>
  );
}

function MiniHelixRowDemo() {
  return (
    <div className="flex gap-4">
      {["blue", "purple", "green"].map((color) => (
        <div key={color} className="flex flex-col items-center gap-1">
          <div className="relative h-20 w-12">
            {[...Array(6)].map((_, i) => {
              const y = i * 12 + 5;
              const phase = i * 0.8;
              const x1 = 24 + 10 * Math.sin(phase);
              const x2 = 24 - 10 * Math.sin(phase);
              return (
                <svg key={i} className="absolute inset-0 h-full w-full">
                  <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeWidth="0.5" className="text-border" opacity={0.3} />
                  <circle cx={x1} cy={y} r={2.5} fill={color === "blue" ? "#3b82f6" : color === "purple" ? "#a855f7" : "#22c55e"} />
                  <circle cx={x2} cy={y} r={2.5} fill={color === "blue" ? "#ec4899" : color === "purple" ? "#f97316" : "#f59e0b"} />
                </svg>
              );
            })}
          </div>
          <span className="text-[10px] capitalize text-muted-foreground">{color}</span>
        </div>
      ))}
    </div>
  );
}

export default function DNAHelixPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">DNA Helix</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated DNA double helix with rotating base pairs, depth parallax, and color variants for science-themed UIs.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Animated Helix</h2>
        <ComponentPreview>
          <DNAHelixDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Static View</h2>
        <ComponentPreview>
          <StaticHelixDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Mini Variants</h2>
        <ComponentPreview>
          <MiniHelixRowDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">height</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">200</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">speed</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">1</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
