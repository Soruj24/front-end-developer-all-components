"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Vacuum } from "lucide-react";

const installCommand = `npx component-library@latest add vacuum-clean`;
const usageCode = `import { VacuumClean } from "@/components/_vacuum-clean";

<VacuumClean status="cleaning" progress={65} />`;

function ProgressRing({ progress }: { progress: number }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const offset = c - (progress / 100) * c;
  return (
    <svg width="100" height="100" className="rotate-[-90deg]">
      <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
      <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="6" className="text-primary" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="central" className="fill-foreground text-sm font-semibold" transform="rotate(90 50 50)">{progress}%</text>
    </svg>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3 text-center">
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default function VacuumCleanPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Vacuum Clean</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Cleaning status displays with progress rings, stats cards, and status indicators.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Progress Ring</h2>
        <div className="flex items-center gap-8">
          <ProgressRing progress={25} />
          <ProgressRing progress={65} />
          <ProgressRing progress={100} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Cleaning Stats</h2>
        <div className="grid grid-cols-4 gap-3">
          <StatCard label="Area Cleaned" value="850 sq ft" />
          <StatCard label="Time Elapsed" value="12:34" />
          <StatCard label="Battery" value="72%" />
          <StatCard label="Dust Collected" value="1.2 L" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Status States</h2>
        <div className="flex gap-3">
          {["idle", "cleaning", "charging", "error"].map((s) => (
            <div key={s} className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium capitalize">
              <div className={`h-2 w-2 rounded-full ${s === "cleaning" ? "bg-success animate-pulse" : s === "charging" ? "bg-warning" : s === "error" ? "bg-danger" : "bg-muted"}`} />
              {s}
            </div>
          ))}
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
                <td className="px-4 py-3 font-mono text-xs">status</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;idle&quot; | &quot;cleaning&quot; | &quot;charging&quot; | &quot;error&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;idle&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">progress</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
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
