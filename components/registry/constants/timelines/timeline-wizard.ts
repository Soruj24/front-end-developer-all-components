import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineWizard: RegistryEntry = entry({
    id: "timeline-wizard",
    title: "Wizard Steps",
    description: "Interactive clickable stepper with back and next controls.",
    source: `import { useState } from "react";

export default function TimelineWizard() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center">
        {["Info", "Payment", "Confirm"].map((s, i) => (
          <div key={s} className="flex items-center">
            <button onClick={() => setStep(i + 1)} className={\`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors \${
              i + 1 <= step ? "bg-foreground text-background" : "border-2 border-zinc-300 text-zinc-400 dark:border-zinc-600"
            }\`}>{i + 1}</button>
            {i < 2 && <div className={\`h-0.5 w-8 \${i + 1 < step ? "bg-foreground" : "bg-zinc-200 dark:bg-zinc-700"}\`} />}
          </div>
        ))}
      </div>
      <div className="text-xs text-zinc-500">Step {step} of 3</div>
      <div className="flex gap-2">
        <button onClick={() => setStep(Math.max(1, step - 1))} className="rounded border border-black/[.08] px-3 py-1 text-xs dark:border-white/[.145]">Back</button>
        <button onClick={() => setStep(Math.min(3, step + 1))} className="rounded bg-foreground px-3 py-1 text-xs text-background">Next</button>
      </div>
    </div>
  );
}`,
  });
