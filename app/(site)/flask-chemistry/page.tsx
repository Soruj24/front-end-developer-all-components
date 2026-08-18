"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { FlaskConical, Beaker, TestTube } from "lucide-react";

const installCommand = `npx component-library@latest add flask-chemistry`;
const usageCode = `import { FlaskChemistry } from "@/components/flask-chemistry";

<FlaskChemistry
  liquid="blue"
  bubbles={true}
  fillLevel={60}
/>`;

function FlaskDemo({ color = "#3b82f6", fillLevel = 60, bubbles = true }: { color?: string; fillLevel?: number; bubbles?: boolean }) {
  return (
    <div className="relative h-32 w-20">
      <svg viewBox="0 0 80 120" className="h-full w-full">
        <path d="M25 10 L25 50 L10 100 Q8 110 18 115 L62 115 Q72 110 70 100 L55 50 L55 10" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground" />
        <path d={`M25 ${110 - fillLevel} L25 50 L10 100 Q8 110 18 115 L62 115 Q72 110 70 100 L55 50 L55 ${110 - fillLevel}`} fill={color} opacity="0.4" />
        {bubbles && [...Array(5)].map((_, i) => (
          <circle key={i} cx={30 + Math.random() * 20} cy={80 - i * 10} r={1 + Math.random() * 2} fill={color} opacity="0.6">
            <animate attributeName="cy" from={80 + i * 5} to={60 - i * 5} dur={`${1 + Math.random()}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur={`${1 + Math.random()}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
}

function FlaskRowDemo() {
  const colors = [
    { color: "#3b82f6", label: "Water" },
    { color: "#22c55e", label: "Acid" },
    { color: "#ef4444", label: "Base" },
    { color: "#a855f7", label: "Indicator" },
  ];
  return (
    <div className="flex gap-4">
      {colors.map((c) => (
        <div key={c.label} className="flex flex-col items-center gap-1">
          <FlaskDemo color={c.color} fillLevel={50 + Math.random() * 40} />
          <span className="text-[10px] text-muted-foreground">{c.label}</span>
        </div>
      ))}
    </div>
  );
}

function TestTubeRackDemo() {
  const liquids = [
    { color: "#ef4444", label: "HCl", fill: 40 },
    { color: "#3b82f6", label: "H₂O", fill: 80 },
    { color: "#22c55e", label: "NaOH", fill: 60 },
    { color: "#eab308", label: "CuSO₄", fill: 50 },
    { color: "#a855f7", label: "KMnO₄", fill: 70 },
    { color: "#ec4899", label: "Litmus", fill: 45 },
  ];
  return (
    <div className="flex items-end gap-2">
      <div className="h-2 w-32 rounded bg-amber-800" />
      <div className="flex gap-1.5 -mb-0.5">
        {liquids.map((l) => (
          <div key={l.label} className="relative h-24 w-5 rounded-b-md border border-t-0 bg-white/10 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 rounded-b-md" style={{ height: `${l.fill}%`, backgroundColor: l.color, opacity: 0.5 }} />
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-muted-foreground whitespace-nowrap">{l.label}</span>
          </div>
        ))}
      </div>
      <div className="h-2 w-32 rounded bg-amber-800" />
    </div>
  );
}

function MoleculeDisplayDemo() {
  const atoms = [
    { symbol: "H", x: 20, y: 50, color: "#ef4444" },
    { symbol: "O", x: 50, y: 30, color: "#3b82f6" },
    { symbol: "H", x: 80, y: 50, color: "#ef4444" },
  ];
  const bonds = [
    { x1: 20, y1: 50, x2: 50, y2: 30 },
    { x1: 50, y1: 30, x2: 80, y2: 50 },
  ];
  return (
    <svg viewBox="0 0 100 80" className="h-24 w-32">
      {bonds.map((b, i) => (
        <line key={i} x1={b.x1} y1={b.y1} x2={b.x2} y2={b.y2} stroke="currentColor" strokeWidth="2" className="text-border" />
      ))}
      {atoms.map((a, i) => (
        <g key={i}>
          <circle cx={a.x} cy={a.y} r="10" fill={a.color} opacity="0.8" />
          <text x={a.x} y={a.y + 3} textAnchor="middle" className="fill-white text-[8px] font-bold">{a.symbol}</text>
        </g>
      ))}
    </svg>
  );
}

export default function FlaskChemistryPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Flask Chemistry</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Chemistry flask visualizations with bubbling liquids, test tube racks, and molecule displays for science UIs.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Flask Variants</h2>
        <ComponentPreview>
          <FlaskRowDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Test Tube Rack</h2>
        <ComponentPreview>
          <TestTubeRackDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Molecule Display</h2>
        <ComponentPreview>
          <MoleculeDisplayDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">liquid</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"blue"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">bubbles</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">fillLevel</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">60</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
