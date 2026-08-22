"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { SourceCodeViewer } from "@/components/docs";
import { Dna, Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { DNAHelix } from "./dna-helix";
import { AnimatedHelixDemo, GeneSequenceDemo, LoadingStateDemo } from "./demos";
import {
  LabDashboardDemo,
  MedicalCardDemo,
  ProteinStructureDemo,
  ResearchStatsDemo,
} from "./showcase";
import { PlaygroundDemo } from "./playground";
import { DNA_HELIX_SOURCE } from "./dna-helix-source";

const installCommand = `npx component-library@latest add dna-helix`;
const usageCode = `import { DNAHelix } from "@/components/dna-helix";

<DNAHelix numPairs={12} amplitude={30} spacing={20} color1="fill-primary" color2="fill-purple-500" />`;

const EXAMPLES = [
  { id: "dna-animated", title: "Animated Helix", description: "Continuously rotating DNA double helix with depth parallax.", Demo: AnimatedHelixDemo },
  { id: "dna-lab", title: "Lab Dashboard", description: "DNA helix in a genomics lab monitoring dashboard.", Demo: LabDashboardDemo },
  { id: "dna-gene", title: "Gene Sequence", description: "Base pair selector with A-T and C-G labels.", Demo: GeneSequenceDemo },
  { id: "dna-medical", title: "Medical Card", description: "Patient card with DNA visual and health metrics.", Demo: MedicalCardDemo },
  { id: "dna-research", title: "Research Stats", description: "Research overview with helix and key metrics.", Demo: ResearchStatsDemo },
  { id: "dna-protein", title: "Protein Structure", description: "Multiple helix colors for different protein types.", Demo: ProteinStructureDemo },
  { id: "dna-loading", title: "Loading State", description: "DNA helix as a sequencing progress indicator.", Demo: LoadingStateDemo },
];

function PreviewHero() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary-soft text-primary"
          >
            <Dna className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">DNA Helix</p>
            <p className="text-xs text-muted-foreground">Rotating base pairs with depth parallax</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={!paused}
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]",
            paused
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border bg-background text-foreground hover:bg-muted",
          )}
        >
          {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
          {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className="flex justify-center border-t border-border bg-background py-8">
        <DNAHelix paused={paused} showLabels />
      </div>
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
          Animated DNA double helix with rotating base pairs, depth parallax, pause/resume
          controls, reduced-motion support, and color variants for science-themed UIs.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Live Preview</h2>
        <PreviewHero />
      </section>

      <SourceCodeViewer
        source={DNA_HELIX_SOURCE}
        filename="components/ui/DNAHelix/DNAHelix.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
        {EXAMPLES.map(({ id, title, description, Demo }) => (
          <div key={id} className="flex flex-col gap-3">
            <h3 className="text-lg font-medium text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            <ComponentPreview id={id}>
              <Demo />
            </ComponentPreview>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Playground</h2>
        <PlaygroundDemo />
      </section>

      <ApiReference />
    </div>
  );
}

const API_ROWS = [
  ["numPairs", "number", "12"], ["amplitude", "number", "30"], ["spacing", "number", "20"],
  ["color1", "string", '"fill-primary"'], ["color2", "string", '"fill-purple-500"'],
  ["size", "number", "6"], ["showLabels", "boolean", "false"],
  ["paused", "boolean", "false"], ["intervalMs", "number", "30"], ["className", "string", "-"],
];

function ApiReference() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
      <div className="overflow-x-auto overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th scope="col" className="px-4 py-3 text-left font-medium">Prop</th>
              <th scope="col" className="px-4 py-3 text-left font-medium">Type</th>
              <th scope="col" className="px-4 py-3 text-left font-medium">Default</th>
            </tr>
          </thead>
          <tbody>
            {API_ROWS.map(([prop, type, def], i) => (
              <tr key={prop} className={i < API_ROWS.length - 1 ? "border-b" : ""}>
                <td className="px-4 py-3 font-mono text-xs">{prop}</td>
                <td className="px-4 py-3 text-muted-foreground">{type}</td>
                <td className="px-4 py-3 tabular-nums text-muted-foreground">{def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
