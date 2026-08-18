"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add fence-pattern`;
const usageCode = `import { FencePattern } from "@/components/fence-pattern";

<FencePattern color="primary" spacing={20} angle={45} />`;

function FencePatternDemo() {
  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-lg border bg-card">
      <svg className="h-full w-full">
        {[...Array(20)].map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1={0} x2={i * 20} y2={150} stroke="currentColor" strokeWidth="1" className="text-primary/20" />
        ))}
        {[...Array(10)].map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 16} x2={400} y2={i * 16} stroke="currentColor" strokeWidth="1" className="text-primary/20" />
        ))}
      </svg>
    </div>
  );
}

function DiagonalFenceDemo() {
  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-lg border bg-card">
      <svg className="h-full w-full">
        {[...Array(30)].map((_, i) => (
          <line key={`d1-${i}`} x1={i * 20 - 50} y1={0} x2={i * 20 + 100} y2={150} stroke="currentColor" strokeWidth="0.5" className="text-primary/15" />
        ))}
        {[...Array(30)].map((_, i) => (
          <line key={`d2-${i}`} x1={i * 20 + 50} y1={0} x2={i * 20 - 100} y2={150} stroke="currentColor" strokeWidth="0.5" className="text-primary/15" />
        ))}
      </svg>
    </div>
  );
}

function DiamondFenceDemo() {
  const size = 24;
  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-lg border bg-card">
      <svg className="h-full w-full">
        {[...Array(20)].map((_, row) =>
          [...Array(20)].map((_, col) => {
            const x = col * size + (row % 2 ? size / 2 : 0);
            const y = row * size;
            return (
              <polygon key={`${row}-${col}`} points={`${x},${y - size / 2} ${x + size / 2},${y} ${x},${y + size / 2} ${x - size / 2},${y}`} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
            );
          })
        )}
      </svg>
    </div>
  );
}

function HatchPatternDemo() {
  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-lg border bg-card">
      <svg className="h-full w-full">
        {[...Array(25)].map((_, i) => (
          <line key={i} x1={i * 16} y1={0} x2={0} y2={i * 16} stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/20" />
        ))}
        {[...Array(25)].map((_, i) => (
          <line key={`r-${i}`} x1={i * 16} y1={150} x2={400} y2={150 - i * 16} stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/20" />
        ))}
      </svg>
    </div>
  );
}

export default function FencePatternPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Fence Pattern</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          SVG fence patterns with grid, diagonal, diamond, and hatch variants for decorative backgrounds and borders.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Grid Pattern</h2>
        <ComponentPreview>
          <FencePatternDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Diagonal Pattern</h2>
        <ComponentPreview>
          <DiagonalFenceDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Diamond Pattern</h2>
        <ComponentPreview>
          <DiamondFenceDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Hatch Pattern</h2>
        <ComponentPreview>
          <HatchPatternDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">{'"grid" | "diagonal" | "diamond" | "hatch"'}</td><td className="px-4 py-3 text-muted-foreground">{'"grid"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"primary"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">spacing</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">20</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
