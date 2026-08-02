import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutWizard: RegistryEntry = entry({
    id: "layout-wizard",
    title: "Wizard / Stepper",
    description: "Multi-step form layout with progress.",
    source: `import { useState } from "react";

export default function LayoutWizard() {
  const [step, setStep] = useState(2);

  return (
    <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-zinc-950">
      <div className="flex items-center justify-center gap-2 border-b border-black/[.08] px-3 py-2 dark:border-white/[.145]">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-1">
            <span className={\`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium \${s <= step ? "bg-foreground text-background" : "border border-zinc-300 text-zinc-400 dark:border-zinc-600"}\`}>{s}</span>
            {s < 3 && <div className={\`h-0.5 w-6 \${s < step ? "bg-foreground" : "bg-zinc-200 dark:bg-zinc-700"}\`} />}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-center gap-2 px-4">
        <span className="text-xs font-medium">Step {step} of 3</span>
        <div className="h-2 w-3/4 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-2 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="mt-auto flex items-center justify-between pb-2">
          <button onClick={() => setStep(Math.max(1, step - 1))} className="rounded border border-black/[.08] px-3 py-1 text-[10px] dark:border-white/[.145]">Back</button>
          <button onClick={() => setStep(Math.min(3, step + 1))} className="rounded bg-foreground px-3 py-1 text-[10px] text-background">Next</button>
        </div>
      </div>
    </div>
  );
}`,
  });
