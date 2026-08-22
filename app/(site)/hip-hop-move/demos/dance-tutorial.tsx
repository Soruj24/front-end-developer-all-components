"use client";

import { useState } from "react";
import { Mic } from "lucide-react";
import { DanceMoveRenderer } from "./dance-move-renderer";

export function DanceTutorialDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { name: "Starting Position", desc: "Feet shoulder-width apart", move: "bounce" },
    { name: "The Bounce", desc: "Bend knees to the beat", move: "bounce" },
    { name: "Add Arms", desc: "Swing arms with the rhythm", move: "wave" },
    { name: "Full Move", desc: "Combine bounce with arms", move: "pop" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Dance Tutorial</h3>
            <span className="ml-auto text-[10px] text-zinc-500 dark:text-zinc-400">Step {step + 1}/{steps.length}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex justify-center">
            <DanceMoveRenderer move={steps[step].move} size={100} />
          </div>
          <div className="mb-4 text-center">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{steps[step].name}</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{steps[step].desc}</p>
          </div>
          <div className="mb-4 flex justify-center gap-1">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i <= step ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-700"}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="flex-1 rounded-lg bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200 disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">
              Previous
            </button>
            <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
