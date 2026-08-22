"use client";

import { Badge } from "@/components/design-system/Badge";
import { Activity, Dna, FlaskConical, Heart, Microscope, TrendingUp, Users, Zap } from "lucide-react";
import { DNAHelix } from "./dna-helix";

export function LabDashboardDemo() {
  const metrics = [
    { label: "Samples", value: "1,247", change: "+12%", icon: FlaskConical },
    { label: "Sequences", value: "892", change: "+8%", icon: Dna },
    { label: "Accuracy", value: "99.7%", change: "+0.2%", icon: TrendingUp },
    { label: "Active", value: "24", change: "Now", icon: Activity },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">Genomics Lab</h3>
          <Badge variant="secondary" className="text-[10px]">
            Live
          </Badge>
        </div>
        <div className="p-4">
          <div className="mb-4 flex justify-center">
            <DNAHelix numPairs={8} amplitude={20} spacing={18} color1="fill-emerald-500" color2="fill-teal-500" size={4} className="h-40" />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-lg bg-muted/50 p-2.5 text-center transition-colors hover:bg-muted">
                <m.icon className="mx-auto mb-1 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <p className="text-xs font-bold tabular-nums text-foreground">{m.value}</p>
                <p className="text-[9px] text-muted-foreground">{m.label}</p>
                <p className="text-[8px] font-medium text-emerald-600 dark:text-emerald-400">{m.change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MedicalCardDemo() {
  const patient = { name: "Sarah Chen", id: "PT-2024-0892", status: "Active Treatment", risk: "Low" };

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="relative h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <DNAHelix
            numPairs={6}
            amplitude={12}
            spacing={12}
            size={3}
            color1="fill-blue-500/60"
            color2="fill-purple-500/60"
            ariaLabel="Decorative DNA helix"
            className="absolute inset-x-0 top-3 mx-auto h-[72px] max-w-none"
          />
        </div>
        <div className="px-5 pb-5">
          <div className="-mt-6 flex items-end gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-card bg-muted text-sm font-bold text-foreground">
              SC
            </span>
            <div className="mb-1">
              <p className="text-sm font-bold text-foreground">{patient.name}</p>
              <p className="text-[10px] tabular-nums text-muted-foreground">{patient.id}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { icon: Heart, tint: "text-red-500", value: "72 bpm" },
              { icon: Activity, tint: "text-emerald-500", value: "Normal" },
              { icon: Zap, tint: "text-yellow-500", value: patient.risk },
            ].map((v) => (
              <div key={v.value} className="rounded-lg bg-muted/50 p-2 text-center transition-colors hover:bg-muted">
                <v.icon className={cnIcon(v.tint)} aria-hidden="true" />
                <p className="mt-1 text-[10px] font-medium text-foreground">{v.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/20">
            <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">{patient.status}</span>
            <span className="text-[10px] tabular-nums text-emerald-600 dark:text-emerald-400">Risk: {patient.risk}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function cnIcon(tint: string) {
  return `mx-auto h-3.5 w-3.5 ${tint}`;
}

export function ResearchStatsDemo() {
  const stats = [
    { label: "Genes Mapped", value: "23,456", icon: Dna, tint: "text-blue-500" },
    { label: "Sequencing Runs", value: "1,892", icon: Microscope, tint: "text-purple-500" },
    { label: "Research Papers", value: "347", icon: FlaskConical, tint: "text-emerald-500" },
    { label: "Team Members", value: "89", icon: Users, tint: "text-orange-500" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-tight text-foreground">Research Overview</h3>
          <span className="text-[10px] text-muted-foreground">Last 30 days</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-2 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
            >
              <s.icon className={`h-5 w-5 ${s.tint}`} aria-hidden="true" />
              <p className="text-sm font-bold tabular-nums text-foreground">{s.value}</p>
              <p className="text-center text-[9px] leading-tight text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <DNAHelix numPairs={10} amplitude={25} spacing={16} size={4} className="h-44" />
        </div>
      </div>
    </div>
  );
}

export function ProteinStructureDemo() {
  const proteins = [
    { name: "Hemoglobin", color1: "fill-red-500", color2: "fill-red-300", count: 10 },
    { name: "Collagen", color1: "fill-blue-500", color2: "fill-blue-300", count: 8 },
    { name: "Keratin", color1: "fill-emerald-500", color2: "fill-emerald-300", count: 8 },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold tracking-tight text-foreground">Protein Structures</h3>
        <div className="grid grid-cols-3 gap-4">
          {proteins.map((p) => (
            <div key={p.name} className="group flex flex-col items-center gap-2">
              <DNAHelix
                numPairs={p.count}
                amplitude={12}
                spacing={(96 / p.count)}
                size={2.5}
                paused
                intervalMs={30}
                color1={p.color1}
                color2={p.color2}
                ariaLabel={`${p.name} structure`}
                className="h-24 max-w-none transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-xs font-medium text-foreground">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
