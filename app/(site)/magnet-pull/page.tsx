"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Magnet, Zap, ArrowUp, ArrowDown, Target, Sparkles, Move } from "lucide-react";

const installCommand = `npx component-library@latest add magnet-pull`;

const usageCode = `import { MagnetPull } from "@/components/ui/magnet-pull";

export default function Demo() {
  return (
    <MagnetPull strength={0.4}>
      <button>Magnetic Button</button>
    </MagnetPull>
  );
}`;

function MagneticButtonDemo() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setOffset({ x, y });
  };
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className="flex h-16 w-40 cursor-pointer items-center justify-center rounded-lg bg-primary text-primary-foreground font-medium shadow-md transition-transform duration-200"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      >
        <Magnet className="mr-2 h-4 w-4" /> Click Me
      </div>
    </div>
  );
}

function DragDropDemo() {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-40 w-60 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30">
        <div
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
          style={{ transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`, opacity: dragging ? 0.8 : 1 }}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseMove={(e) => { if (dragging) setPos({ x: pos.x + e.movementX, y: pos.y + e.movementY }); }}
        >
          <Move className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function AttractEffectDemo() {
  return (
    <div className="flex items-center justify-center gap-6 p-8">
      {["A", "B", "C"].map((label) => (
        <div key={label} className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg transition-all duration-200 hover:scale-110 hover:bg-primary/20 cursor-pointer">
          {label}
        </div>
      ))}
    </div>
  );
}

function PullTowardsDemo() {
  const [active, setActive] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="relative h-24 w-24 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 border border-primary/30" />
      <button
        className={`rounded-lg px-6 py-2 text-sm font-medium transition-all duration-300 ${active ? "bg-primary text-primary-foreground scale-105 shadow-lg" : "bg-muted text-muted-foreground"}`}
        onClick={() => setActive(!active)}
      >
        <Target className="mr-1 inline h-4 w-4" /> Pull {active ? "Active" : "Inactive"}
      </button>
    </div>
  );
}

function SnapToGridDemo() {
  const [snap, setSnap] = useState({ x: 0, y: 0 });
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative grid h-40 w-60 grid-cols-4 grid-rows-3 gap-1">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded bg-muted/50 border border-muted-foreground/10" />
        ))}
        <div
          className="absolute left-0 top-0 h-10 w-14 cursor-grab rounded-md bg-primary shadow-md transition-all duration-150"
          style={{ transform: `translate(${snap.x}px, ${snap.y}px)` }}
          onClick={() => setSnap({ x: ((snap.x / 15) + 1) * 15 % 60, y: snap.y })}
        />
      </div>
    </div>
  );
}

function MagneticScrollDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="flex h-10 w-48 items-center gap-2 rounded-lg bg-muted/60 px-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:translate-x-1 cursor-pointer">
            <Sparkles className="h-3.5 w-3.5" /> Item {n}
          </div>
        ))}
      </div>
    </div>
  );
}

function HoverPullDemo() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      {[Zap, ArrowUp, ArrowDown].map((Icon, i) => (
        <div
          key={i}
          className={`flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer ${hovered === i ? "bg-primary text-primary-foreground border-primary shadow-md scale-110" : "bg-muted/50 text-muted-foreground border-muted-foreground/20"}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <Icon className="h-5 w-5" />
        </div>
      ))}
    </div>
  );
}

export default function MagnetPullPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Magnet Pull</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A magnetic pull effect component that attracts elements toward the cursor when hovered, creating engaging interactive experiences.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Various magnetic pull effect demonstrations.</p>
        </div>

        <ComponentPreview id="magnet-pull-magnetic-button">
          <MagneticButtonDemo />
        </ComponentPreview>

        <ComponentPreview id="magnet-pull-drag-drop">
          <DragDropDemo />
        </ComponentPreview>

        <ComponentPreview id="magnet-pull-attract-effect">
          <AttractEffectDemo />
        </ComponentPreview>

        <ComponentPreview id="magnet-pull-towards">
          <PullTowardsDemo />
        </ComponentPreview>

        <ComponentPreview id="magnet-pull-snap-grid">
          <SnapToGridDemo />
        </ComponentPreview>

        <ComponentPreview id="magnet-pull-scroll">
          <MagneticScrollDemo />
        </ComponentPreview>

        <ComponentPreview id="magnet-pull-hover-pull">
          <HoverPullDemo />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">strength</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0.3</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
