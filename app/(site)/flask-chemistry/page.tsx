"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  FlaskConical,
  Beaker,
  TestTube,
  Atom,
  FlaskRound,
  Droplets,
  Thermometer,
  Clock,
  Check,
  AlertTriangle,
} from "lucide-react";

const installCommand = `npx component-library@latest add flask-chemistry`;
const usageCode = `import { FlaskChemistry } from "@/components/flask-chemistry";

<FlaskChemistry
  liquid="blue"
  bubbles={true}
  fillLevel={60}
/>`;

function FlaskRenderer({
  color = "#3b82f6",
  fillLevel = 60,
  bubbles = true,
  size = "md",
}: {
  color?: string;
  fillLevel?: number;
  bubbles?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "h-24 w-14", md: "h-32 w-20", lg: "h-40 w-24" };
  return (
    <div className={`relative ${sizes[size]}`}>
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

function FlaskVariantsDemo() {
  const colors = [
    { color: "#3b82f6", label: "Water" },
    { color: "#22c55e", label: "Acid" },
    { color: "#ef4444", label: "Base" },
    { color: "#a855f7", label: "Indicator" },
    { color: "#eab308", label: "Copper" },
  ];
  return (
    <div className="flex gap-4">
      {colors.map((c) => (
        <div key={c.label} className="flex flex-col items-center gap-1">
          <FlaskRenderer color={c.color} fillLevel={50 + Math.random() * 40} />
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

function LabDashboardDemo() {
  const experiments = [
    { id: "EXP-001", name: "Acid-Base Titration", status: "complete", color: "#22c55e" },
    { id: "EXP-002", name: "pH Measurement", status: "running", color: "#3b82f6" },
    { id: "EXP-003", name: "Crystal Growth", status: "pending", color: "#eab308" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Lab Dashboard</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <FlaskRenderer color="#3b82f6" fillLevel={65} size="sm" />
            <div className="flex-1">
              <p className="text-sm font-bold">Active Experiments</p>
              <p className="text-[10px] text-muted-foreground">3 running today</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold">3</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400">+2 from yesterday</p>
            </div>
          </div>
          <div className="space-y-2">
            {experiments.map((exp) => (
              <div key={exp.id} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: exp.color }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{exp.name}</p>
                  <p className="text-[9px] text-muted-foreground">{exp.id}</p>
                </div>
                <span className={`text-[10px] font-medium capitalize ${
                  exp.status === "complete" ? "text-emerald-600 dark:text-emerald-400" :
                  exp.status === "running" ? "text-blue-600 dark:text-blue-400" :
                  "text-yellow-600 dark:text-yellow-400"
                }`}>{exp.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperimentLogDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const steps = [
    { step: 1, label: "Prepare Solution", desc: "Mix 50ml H₂O with 10ml HCl", done: true },
    { step: 2, label: "Add Indicator", desc: "Add 3 drops phenolphthalein", done: true },
    { step: 3, label: "Titrate", desc: "Add NaOH dropwise until color change", done: false },
    { step: 4, label: "Record Volume", desc: "Note the volume of NaOH used", done: false },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center gap-2 mb-4">
          <TestTube className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Experiment Steps</h3>
        </div>
        <div className="space-y-3">
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => setSelected(selected === s.step ? null : s.step)}
              className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all ${
                selected === s.step
                  ? "border-primary bg-primary/5"
                  : "border-black/[.08] hover:border-black/[.15] dark:border-white/[.145]"
              }`}
            >
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                s.done ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"
              }`}>
                {s.done ? "✓" : s.step}
              </div>
              <div>
                <p className="text-xs font-bold">{s.label}</p>
                <p className="text-[10px] text-muted-foreground">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChemicalFormulaDemo() {
  const formulas = [
    { name: "Water", formula: "H₂O", atoms: [{ symbol: "H", color: "#ef4444" }, { symbol: "O", color: "#3b82f6" }] },
    { name: "Salt", formula: "NaCl", atoms: [{ symbol: "Na", color: "#a855f7" }, { symbol: "Cl", color: "#22c55e" }] },
    { name: "Glucose", formula: "C₆H₁₂O₆", atoms: [{ symbol: "C", color: "#6b7280" }, { symbol: "H", color: "#ef4444" }, { symbol: "O", color: "#3b82f6" }] },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Chemical Formulas</h3>
        <div className="space-y-3">
          {formulas.map((f) => (
            <div key={f.name} className="flex items-center gap-3 rounded-lg bg-muted/30 px-4 py-3">
              <div className="flex gap-1">
                {f.atoms.map((a, i) => (
                  <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: a.color }}>
                    {a.symbol}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold font-mono">{f.formula}</p>
                <p className="text-[10px] text-muted-foreground">{f.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PHIndicatorDemo() {
  const [ph, setPh] = useState(7);
  const getColor = (p: number) => {
    if (p < 3) return "#ef4444";
    if (p < 5) return "#f97316";
    if (p < 6) return "#eab308";
    if (p <= 8) return "#22c55e";
    if (p <= 10) return "#3b82f6";
    return "#8b5cf6";
  };
  const getLabel = (p: number) => {
    if (p < 4) return "Strong Acid";
    if (p < 6) return "Weak Acid";
    if (p <= 8) return "Neutral";
    if (p <= 10) return "Weak Base";
    return "Strong Base";
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center gap-2 mb-4">
          <Droplets className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">pH Indicator</h3>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <FlaskRenderer color={getColor(ph)} fillLevel={70} size="sm" />
          <div>
            <p className="text-2xl font-extrabold font-mono">{ph}.0</p>
            <p className="text-xs text-muted-foreground">{getLabel(ph)}</p>
          </div>
        </div>
        <div className="mb-3">
          <div className="h-3 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-purple-500" />
          <div className="mt-1 flex justify-between text-[8px] text-muted-foreground">
            <span>0</span><span>7</span><span>14</span>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={14}
          step={0.1}
          value={ph}
          onChange={(e) => setPh(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>
    </div>
  );
}

export default function FlaskChemistryPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Flask Chemistry
          </h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Chemistry flask visualizations with bubbling liquids, test tube racks, and molecule
          displays for science UIs.
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
          <h3 className="text-lg font-medium text-foreground">Flask Variants</h3>
          <p className="text-sm text-muted-foreground">
            Different colored liquid flasks with bubbles.
          </p>
          <ComponentPreview id="chem-flasks">
            <FlaskVariantsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Test Tube Rack</h3>
          <p className="text-sm text-muted-foreground">
            Multiple test tubes with different chemicals.
          </p>
          <ComponentPreview id="chem-tubes">
            <TestTubeRackDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Molecule Display</h3>
          <p className="text-sm text-muted-foreground">
            Water molecule structure with atoms and bonds.
          </p>
          <ComponentPreview id="chem-molecule">
            <MoleculeDisplayDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Lab Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Chemistry lab monitoring with active experiments.
          </p>
          <ComponentPreview id="chem-lab">
            <LabDashboardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Experiment Log</h3>
          <p className="text-sm text-muted-foreground">
            Step-by-step experiment procedure tracker.
          </p>
          <ComponentPreview id="chem-log">
            <ExperimentLogDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Chemical Formula</h3>
          <p className="text-sm text-muted-foreground">
            Common chemical formulas with atom display.
          </p>
          <ComponentPreview id="chem-formula">
            <ChemicalFormulaDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">pH Indicator</h3>
          <p className="text-sm text-muted-foreground">
            Interactive pH level testing with color feedback.
          </p>
          <ComponentPreview id="chem-ph">
            <PHIndicatorDemo />
          </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"#3b82f6"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">fillLevel</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">60</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">bubbles</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"sm\" | \"md\" | \"lg\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"md\""}</td>
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
