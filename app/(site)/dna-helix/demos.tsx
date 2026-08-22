"use client";

import { useState } from "react";
import { Check, RotateCw } from "lucide-react";
import { cn } from "@/lib/cn";
import { Dna } from "lucide-react";
import { DNAHelix } from "./dna-helix";

export function AnimatedHelixDemo() {
  return <DNAHelix className="mx-auto" showLabels />;
}

const PAIRS = [
  { base1: "A", base2: "T", text1: "text-blue-500", text2: "text-red-400", bonds: 2 },
  { base1: "C", base2: "G", text1: "text-emerald-500", text2: "text-yellow-500", bonds: 3 },
  { base1: "T", base2: "A", text1: "text-red-400", text2: "text-blue-500", bonds: 2 },
  { base1: "G", base2: "C", text1: "text-yellow-500", text2: "text-emerald-500", bonds: 3 },
];

const BASE_NAMES: Record<string, string> = {
  A: "Adenine",
  T: "Thymine",
  C: "Cytosine",
  G: "Guanine",
};

export function GeneSequenceDemo() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Dna className="h-4 w-4 text-primary" aria-hidden="true" />
          <h3 className="text-sm font-semibold tracking-tight text-foreground">Base Pair Sequence</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PAIRS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(selected === i ? null : i)}
              aria-pressed={selected === i}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg border p-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]",
                selected === i
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/40 hover:bg-muted/50",
              )}
            >
              <span className="flex items-center gap-1.5">
                <span className={cn("text-lg font-bold tabular-nums", p.text1)}>{p.base1}</span>
                <span className="text-xs text-muted-foreground">≡</span>
                <span className={cn("text-lg font-bold tabular-nums", p.text2)}>{p.base2}</span>
              </span>
              <span className="text-[9px] text-muted-foreground">{BASE_NAMES[p.base1]}</span>
            </button>
          ))}
        </div>
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-in-out",
            selected !== null ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div
              aria-live="polite"
              className="mt-3 rounded-lg border border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground"
            >
              {selected !== null && (
                <p>
                  <span className="font-medium text-foreground">{PAIRS[selected].base1}</span> pairs with{" "}
                  <span className="font-medium text-foreground">{PAIRS[selected].base2}</span> via{" "}
                  {PAIRS[selected].bonds} hydrogen bonds.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingStateDemo() {
  const [loading, setLoading] = useState(true);

  const run = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={run}
        aria-busy={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm transition-all hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]"
      >
        <RotateCw className={cn("h-4 w-4", loading && "animate-spin")} aria-hidden="true" />
        {loading ? "Sequencing..." : "Run Sequence"}
      </button>
      <div className="relative flex h-32 w-48 items-center justify-center overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {loading ? (
          <DNAHelix numPairs={6} amplitude={15} spacing={14} size={3} className="h-full max-w-none" />
        ) : (
          <div aria-live="polite" className="flex flex-col items-center justify-center gap-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/30">
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            </span>
            <span className="text-xs font-medium text-foreground">Complete</span>
          </div>
        )}
      </div>
    </div>
  );
}
