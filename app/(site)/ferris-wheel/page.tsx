"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { RotateCw } from "lucide-react";

const installCommand = `npx component-library@latest add ferris-wheel`;
const usageCode = `import { FerrisWheel } from "@/components/ferris-wheel";

<FerrisWheel
  cabins={8}
  size={250}
  autoRotate
/>`;

function FerrisWheelDemo() {
  const [rotation, setRotation] = useState(0);
  const cabins = 8;
  const radius = 100;

  useEffect(() => {
    const interval = setInterval(() => setRotation((r) => r + 0.3), 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center" style={{ perspective: 800 }}>
      <div className="relative" style={{ width: radius * 2 + 60, height: radius * 2 + 80 }}>
        <svg viewBox="0 0 260 280" className="h-full w-full">
          <circle cx="130" cy="130" r={radius} fill="none" stroke="currentColor" strokeWidth="3" className="text-primary/30" />
          <circle cx="130" cy="130" r={radius - 15} fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/15" />
          <circle cx="130" cy="130" r="5" className="fill-primary" />
          {[...Array(cabins)].map((_, i) => {
            const angle = ((360 / cabins) * i + rotation) * (Math.PI / 180);
            const x = 130 + radius * Math.sin(angle);
            const y = 130 - radius * Math.cos(angle);
            const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"];
            return (
              <g key={i}>
                <line x1="130" y1="130" x2={x} y2={y} stroke="currentColor" strokeWidth="1" className="text-border" />
                <rect x={x - 10} y={y - 8} width="20" height="16" rx="3" fill={colors[i % colors.length]} opacity="0.85" />
              </g>
            );
          })}
          <line x1="130" y1={130 + radius} x2="90" y2="270" stroke="currentColor" strokeWidth="3" className="text-foreground" />
          <line x1="130" y1={130 + radius} x2="170" y2="270" stroke="currentColor" strokeWidth="3" className="text-foreground" />
          <rect x="70" y="268" width="120" height="6" rx="3" className="fill-foreground" />
        </svg>
      </div>
    </div>
  );
}

function CabinShowcaseDemo() {
  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"];
  return (
    <div className="flex gap-3">
      {colors.map((c, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="relative">
            <svg width="40" height="50" viewBox="0 0 40 50">
              <line x1="20" y1="0" x2="20" y2="15" stroke="currentColor" strokeWidth="1" className="text-border" />
              <rect x="5" y="15" width="30" height="25" rx="4" fill={c} opacity="0.85" />
              <rect x="10" y="20" width="8" height="10" rx="1" fill="white" opacity="0.3" />
              <rect x="22" y="20" width="8" height="10" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span className="text-[10px] text-muted-foreground">Cabin {i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function MiniWheelRowDemo() {
  return (
    <div className="flex gap-6">
      {["sm", "md", "lg"].map((size) => {
        const r = size === "sm" ? 30 : size === "md" ? 50 : 70;
        return (
          <div key={size} className="flex flex-col items-center gap-1">
            <svg viewBox="0 0 160 160" className="h-20 w-20" style={{ width: r * 2.4, height: r * 2.4 }}>
              <circle cx="80" cy="80" r={r} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/30" />
              {[...Array(6)].map((_, i) => {
                const angle = (i * 60) * (Math.PI / 180);
                return <circle key={i} cx={80 + r * Math.sin(angle)} cy={80 - r * Math.cos(angle)} r={4} className="fill-primary" opacity="0.7" />;
              })}
            </svg>
            <span className="text-[10px] text-muted-foreground">{size}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function FerrisWheelPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Ferris Wheel</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated Ferris wheel with colored cabins, auto-rotation, and multiple size variants for amusement-themed UIs.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Animated Wheel</h2>
        <ComponentPreview>
          <FerrisWheelDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Cabin Colors</h2>
        <ComponentPreview>
          <CabinShowcaseDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Size Variants</h2>
        <ComponentPreview>
          <MiniWheelRowDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">cabins</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">8</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">200</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">autoRotate</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
