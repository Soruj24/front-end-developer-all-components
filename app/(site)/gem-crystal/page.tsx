"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Gem, Sparkles } from "lucide-react";

const installCommand = `npx component-library@latest add gem-crystal`;
const usageCode = `import { GemCrystal } from "@/components/gem-crystal";

<GemCrystal color="blue" size="lg" sparkle />`;

function GemDemo({ color = "#3b82f6", size = 80, sparkle = true }: { color?: string; size?: number; sparkle?: boolean }) {
  const [glow, setGlow] = useState(0);

  useEffect(() => {
    if (!sparkle) return;
    const interval = setInterval(() => setGlow((g) => (g >= 100 ? 0 : g + 2)), 30);
    return () => clearInterval(interval);
  }, [sparkle]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {sparkle && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full rounded-full opacity-30" style={{ background: `radial-gradient(circle, ${color}, transparent)`, transform: `scale(${1 + glow / 200})`, filter: "blur(8px)" }} />
        </div>
      )}
      <svg viewBox="0 0 100 100" className="h-full w-full relative z-10">
        <polygon points="50,5 90,35 80,90 20,90 10,35" fill={color} opacity="0.7" />
        <polygon points="50,5 90,35 50,50" fill="white" opacity="0.15" />
        <polygon points="50,5 10,35 50,50" fill="white" opacity="0.25" />
        <polygon points="90,35 80,90 50,50" fill={color} opacity="0.5" />
        <polygon points="10,35 20,90 50,50" fill={color} opacity="0.6" />
        <polygon points="20,90 80,90 50,50" fill="white" opacity="0.1" />
        {sparkle && (
          <>
            <circle cx="30" cy="25" r="1.5" fill="white" opacity={0.3 + glow / 200}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="70" cy="20" r="1" fill="white" opacity={0.5 + glow / 200}>
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}

function GemShowcaseDemo() {
  const gems = [
    { color: "#3b82f6", label: "Sapphire" },
    { color: "#a855f7", label: "Amethyst" },
    { color: "#22c55e", label: "Emerald" },
    { color: "#ef4444", label: "Ruby" },
    { color: "#06b6d4", label: "Aquamarine" },
  ];
  return (
    <div className="flex gap-4">
      {gems.map((g) => (
        <div key={g.label} className="flex flex-col items-center gap-1">
          <GemDemo color={g.color} size={60} />
          <span className="text-[10px] text-muted-foreground">{g.label}</span>
        </div>
      ))}
    </div>
  );
}

function GemSizeDemo() {
  return (
    <div className="flex items-end gap-4">
      {[30, 50, 70, 90, 110].map((s) => (
        <div key={s} className="flex flex-col items-center gap-1">
          <GemDemo color="#a855f7" size={s} sparkle={false} />
          <span className="text-[10px] text-muted-foreground">{s}px</span>
        </div>
      ))}
    </div>
  );
}

function GemCollectionDemo() {
  const inventory = [
    { name: "Diamond", count: 3, color: "#e0f2fe" },
    { name: "Ruby", count: 7, color: "#ef4444" },
    { name: "Emerald", count: 12, color: "#22c55e" },
    { name: "Sapphire", count: 5, color: "#3b82f6" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
      {inventory.map((item) => (
        <div key={item.name} className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
          <GemDemo color={item.color} size={24} sparkle={false} />
          <div className="flex-1">
            <p className="text-xs font-medium">{item.name}</p>
            <p className="text-[10px] text-muted-foreground">×{item.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GemCrystalPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gem Crystal</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          SVG gem crystal visualizations with sparkle effects, color variants, size scaling, and collection display.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Gem Collection</h2>
        <ComponentPreview>
          <GemShowcaseDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Size Variants</h2>
        <ComponentPreview>
          <GemSizeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Inventory Display</h2>
        <ComponentPreview>
          <GemCollectionDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"#3b82f6"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">80</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">sparkle</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
