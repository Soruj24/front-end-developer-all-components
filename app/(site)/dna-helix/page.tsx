"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Dna,
  RotateCw,
  Microscope,
  FlaskConical,
  Heart,
  Activity,
  TrendingUp,
  Users,
  Clock,
  Zap,
} from "lucide-react";

const installCommand = `npx component-library@latest add dna-helix`;
const usageCode = `import { DNAHelix } from "@/components/dna-helix";

<DNAHelix height={200} speed={2} color="primary" />`;

function DNAHelixRenderer({
  numPairs = 12,
  amplitude = 30,
  spacing = 20,
  color1 = "fill-primary",
  color2 = "fill-purple-500",
  size = 6,
  showLabels = false,
}: {
  numPairs?: number;
  amplitude?: number;
  spacing?: number;
  color1?: string;
  color2?: string;
  size?: number;
  showLabels?: boolean;
}) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setOffset((o) => o + 0.1), 30);
    return () => clearInterval(interval);
  }, []);

  const bases = ["A", "T", "C", "G"];

  return (
    <div className="relative h-64 w-full max-w-xs overflow-hidden">
      {[...Array(numPairs)].map((_, i) => {
        const y = i * spacing + 5;
        const phase = offset + i * 0.5;
        const x1 = 80 + amplitude * Math.sin(phase);
        const x2 = 80 - amplitude * Math.sin(phase);
        const z = Math.cos(phase);
        const size1 = size + z * 2;
        const size2 = size - z * 2;
        return (
          <svg key={i} className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeWidth="1" className="text-border" opacity={0.4} />
            <circle cx={x1} cy={y} r={size1} className={color1} opacity={0.6 + z * 0.4} />
            <circle cx={x2} cy={y} r={size2} className={color2} opacity={0.6 - z * 0.4} />
            {showLabels && (
              <>
                <text x={x1} y={y + 1} textAnchor="middle" className="fill-white text-[6px] font-bold">{bases[i % 4]}</text>
                <text x={x2} y={y + 1} textAnchor="middle" className="fill-white text-[6px] font-bold">{bases[(i + 2) % 4]}</text>
              </>
            )}
          </svg>
        );
      })}
    </div>
  );
}

function AnimatedHelixDemo() {
  return <DNAHelixRenderer />;
}

function LabDashboardDemo() {
  const metrics = [
    { label: "Samples", value: "1,247", change: "+12%", icon: FlaskConical },
    { label: "Sequences", value: "892", change: "+8%", icon: Dna },
    { label: "Accuracy", value: "99.7%", change: "+0.2%", icon: TrendingUp },
    { label: "Active", value: "24", change: "Now", icon: Activity },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Genomics Lab</h3>
            <Badge variant="secondary" className="text-[10px]">Live</Badge>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex justify-center">
            <DNAHelixRenderer numPairs={8} amplitude={20} spacing={18} color1="fill-emerald-500" color2="fill-teal-500" size={4} />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-lg bg-muted/50 p-2.5 text-center">
                <m.icon className="mx-auto mb-1 h-4 w-4 text-muted-foreground" />
                <p className="text-xs font-bold">{m.value}</p>
                <p className="text-[9px] text-muted-foreground">{m.label}</p>
                <p className="text-[8px] text-emerald-600 dark:text-emerald-400">{m.change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneSequenceDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const pairs = [
    { base1: "A", base2: "T", color1: "fill-blue-500", color2: "fill-red-400" },
    { base1: "C", base2: "G", color1: "fill-emerald-500", color2: "fill-yellow-500" },
    { base1: "T", base2: "A", color1: "fill-red-400", color2: "fill-blue-500" },
    { base1: "G", base2: "C", color1: "fill-yellow-500", color2: "fill-emerald-500" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center gap-2">
          <Dna className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">Base Pair Sequence</h3>
        </div>
        <div className="mb-4 grid grid-cols-4 gap-2">
          {pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-all ${
                selected === i
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-black/[.08] hover:border-black/[.15] dark:border-white/[.145]"
              }`}
            >
              <div className="flex items-center gap-1">
                <span className={`text-lg font-bold ${p.color1.replace("fill-", "text-")}`}>{p.base1}</span>
                <span className="text-xs text-muted-foreground">≡</span>
                <span className={`text-lg font-bold ${p.color2.replace("fill-", "text-")}`}>{p.base2}</span>
              </div>
              <span className="text-[9px] text-muted-foreground">
                {p.base1 === "A" ? "Adenine" : p.base1 === "T" ? "Thymine" : p.base1 === "C" ? "Cytosine" : "Guanine"}
              </span>
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="rounded-lg bg-muted/30 px-4 py-3">
            <p className="text-xs text-muted-foreground">
              {pairs[selected].base1} pairs with {pairs[selected].base2} via{" "}
              {selected % 2 === 0 ? "2 hydrogen bonds" : "3 hydrogen bonds"}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function MedicalCardDemo() {
  const patient = {
    name: "Sarah Chen",
    id: "PT-2024-0892",
    status: "Active Treatment",
    risk: "Low",
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="relative h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="absolute right-4 top-4">
            <DNAHelixRenderer numPairs={6} amplitude={12} spacing={12} color1="fill-blue-500/60" color2="fill-purple-500/60" size={3} />
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className="-mt-6 flex items-end gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-card bg-muted text-sm font-bold">
              SC
            </div>
            <div className="mb-1">
              <p className="text-sm font-bold">{patient.name}</p>
              <p className="text-[10px] text-muted-foreground">{patient.id}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-muted/50 p-2 text-center">
              <Heart className="mx-auto h-3.5 w-3.5 text-red-500" />
              <p className="mt-1 text-[10px] font-medium">72 bpm</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-2 text-center">
              <Activity className="mx-auto h-3.5 w-3.5 text-emerald-500" />
              <p className="mt-1 text-[10px] font-medium">Normal</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-2 text-center">
              <Zap className="mx-auto h-3.5 w-3.5 text-yellow-500" />
              <p className="mt-1 text-[10px] font-medium">Low</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/20">
            <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">{patient.status}</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Risk: {patient.risk}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchStatsDemo() {
  const stats = [
    { label: "Genes Mapped", value: "23,456", icon: Dna, color: "text-blue-500" },
    { label: "Sequencing Runs", value: "1,892", icon: Microscope, color: "text-purple-500" },
    { label: "Research Papers", value: "347", icon: FlaskConical, color: "text-emerald-500" },
    { label: "Team Members", value: "89", icon: Users, color: "text-orange-500" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Research Overview</h3>
          <span className="text-[10px] text-muted-foreground">Last 30 days</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <p className="text-sm font-bold">{s.value}</p>
              <p className="text-[9px] text-center text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <DNAHelixRenderer numPairs={10} amplitude={25} spacing={16} size={4} />
        </div>
      </div>
    </div>
  );
}

function ProteinStructureDemo() {
  const proteins = [
    { name: "Hemoglobin", color1: "fill-red-500", color2: "fill-red-300", count: 10 },
    { name: "Collagen", color1: "fill-blue-500", color2: "fill-blue-300", count: 8 },
    { name: "Keratin", color1: "fill-emerald-500", color2: "fill-emerald-300", count: 8 },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Protein Structures</h3>
        <div className="grid grid-cols-3 gap-4">
          {proteins.map((p) => (
            <div key={p.name} className="flex flex-col items-center gap-2">
              <div className="relative h-24 w-16">
                {[...Array(p.count)].map((_, i) => {
                  const y = i * (240 / p.count) + 10;
                  const phase = i * 0.6;
                  const x1 = 32 + 12 * Math.sin(phase);
                  const x2 = 32 - 12 * Math.sin(phase);
                  return (
                    <svg key={i} className="absolute inset-0 h-full w-full">
                      <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeWidth="0.5" className="text-border" opacity={0.3} />
                      <circle cx={x1} cy={y} r={2.5} className={p.color1} />
                      <circle cx={x2} cy={y} r={2.5} className={p.color2} />
                    </svg>
                  );
                })}
              </div>
              <span className="text-xs font-medium">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingStateDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 3000); }}
        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm hover:bg-foreground/90"
      >
        <RotateCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        {loading ? "Sequencing..." : "Run Sequence"}
      </button>
      <div className="relative h-32 w-48 overflow-hidden rounded-xl border border-black/[.08] bg-card dark:border-white/[.145]">
        {loading ? (
          <div className="flex items-center justify-center">
            <DNAHelixRenderer numPairs={6} amplitude={15} spacing={14} size={3} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/30">
              <span className="text-sm">✓</span>
            </div>
            <span className="text-xs font-medium">Complete</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DNAHelixPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            DNA Helix
          </h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated DNA double helix with rotating base pairs, depth parallax, and color
          variants for science-themed UIs.
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
          <h3 className="text-lg font-medium text-foreground">Animated Helix</h3>
          <p className="text-sm text-muted-foreground">
            Continuously rotating DNA double helix with depth parallax.
          </p>
          <ComponentPreview id="dna-animated">
            <AnimatedHelixDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Lab Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            DNA helix in a genomics lab monitoring dashboard.
          </p>
          <ComponentPreview id="dna-lab">
            <LabDashboardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Gene Sequence</h3>
          <p className="text-sm text-muted-foreground">
            Base pair selector with A-T and C-G labels.
          </p>
          <ComponentPreview id="dna-gene">
            <GeneSequenceDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Medical Card</h3>
          <p className="text-sm text-muted-foreground">
            Patient card with DNA visual and health metrics.
          </p>
          <ComponentPreview id="dna-medical">
            <MedicalCardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Research Stats</h3>
          <p className="text-sm text-muted-foreground">
            Research overview with helix and key metrics.
          </p>
          <ComponentPreview id="dna-research">
            <ResearchStatsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Protein Structure</h3>
          <p className="text-sm text-muted-foreground">
            Multiple helix colors for different protein types.
          </p>
          <ComponentPreview id="dna-protein">
            <ProteinStructureDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Loading State</h3>
          <p className="text-sm text-muted-foreground">
            DNA helix as a sequencing progress indicator.
          </p>
          <ComponentPreview id="dna-loading">
            <LoadingStateDemo />
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
                <td className="px-4 py-3 font-mono text-xs">numPairs</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">12</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">amplitude</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">30</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">spacing</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">20</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color1</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"fill-primary"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color2</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"fill-purple-500"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">6</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">showLabels</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
