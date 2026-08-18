"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add flower-pattern`;
const usageCode = `import { FlowerPattern } from "@/components/flower-pattern";

<FlowerPattern petals={6} color="pink" size={100} />`;

function FlowerDemo({ petals = 6, color = "#ec4899", size = 80 }: { petals?: number; color?: string; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
      {[...Array(petals)].map((_, i) => {
        const angle = (360 / petals) * i;
        return (
          <ellipse
            key={i}
            cx="50"
            cy="25"
            rx="12"
            ry="20"
            fill={color}
            opacity="0.6"
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
      <circle cx="50" cy="50" r="8" fill="#fbbf24" />
      <circle cx="50" cy="50" r="4" fill="#f59e0b" />
    </svg>
  );
}

function FlowerGardenDemo() {
  const flowers = [
    { petals: 5, color: "#ec4899", size: 60, x: "10%", y: "30%" },
    { petals: 8, color: "#a855f7", size: 80, x: "30%", y: "20%" },
    { petals: 6, color: "#f43f5e", size: 70, x: "55%", y: "35%" },
    { petals: 7, color: "#d946ef", size: 55, x: "75%", y: "15%" },
    { petals: 4, color: "#fb7185", size: 65, x: "90%", y: "40%" },
  ];

  return (
    <div className="relative h-40 w-full max-w-lg bg-gradient-to-t from-green-200 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-lg overflow-hidden">
      {flowers.map((f, i) => (
        <div key={i} className="absolute" style={{ left: f.x, top: f.y }}>
          <FlowerDemo petals={f.petals} color={f.color} size={f.size} />
        </div>
      ))}
    </div>
  );
}

function FlowerPatternTiledDemo() {
  return (
    <div className="h-32 w-full max-w-md rounded-lg overflow-hidden bg-pink-50 dark:bg-pink-950/20" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\"><circle cx=\"20\" cy=\"20\" r=\"8\" fill=\"%23ec4899\" opacity=\"0.15\"/><circle cx=\"20\" cy=\"20\" r=\"3\" fill=\"%23fbbf24\" opacity=\"0.2\"/></svg>')", backgroundSize: "40px 40px" }} />
  );
}

function FlowerSizeScaleDemo() {
  const sizes = [30, 50, 70, 90, 110];
  return (
    <div className="flex items-end gap-4">
      {sizes.map((s) => (
        <div key={s} className="flex flex-col items-center gap-1">
          <FlowerDemo petals={6} color="#ec4899" size={s} />
          <span className="text-[10px] text-muted-foreground">{s}px</span>
        </div>
      ))}
    </div>
  );
}

export default function FlowerPatternPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Flower Pattern</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          SVG flower patterns with configurable petals, colors, tiling, and garden scene composition.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Flower Garden</h2>
        <ComponentPreview>
          <FlowerGardenDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Tiled Pattern</h2>
        <ComponentPreview>
          <FlowerPatternTiledDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Size Scale</h2>
        <ComponentPreview>
          <FlowerSizeScaleDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">petals</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">6</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"pink"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">80</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
