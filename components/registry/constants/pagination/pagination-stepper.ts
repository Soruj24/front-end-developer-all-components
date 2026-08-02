import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const paginationStepper: RegistryEntry = entry({
    id: "pagination-stepper",
    title: "Stepper Variant",
    description: "A five-step progress stepper with continue control.",
    source: `import { useState } from "react";

export default function PaginationStepper() {
  const [p1, setP1] = useState(1);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex flex-1 items-center">
            <button onClick={() => setP1(s)} className={\`relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all \${s === p1 ? "bg-zinc-900 text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900" : s < p1 ? "bg-zinc-700 text-white dark:bg-zinc-300" : "border border-zinc-300 bg-white text-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"}\`}>
              {s < p1 ? <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> : s}
            </button>
            {s < 5 && <div className={\`h-0.5 flex-1 \${s < p1 ? "bg-zinc-700 dark:bg-zinc-300" : "bg-zinc-200 dark:bg-zinc-700"}\`} />}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
        <span>{["Start", "Details", "Review", "Confirm", "Done"][p1 - 1]}</span>
        <button onClick={() => setP1(Math.min(5, p1 + 1))} disabled={p1 === 5} className="rounded-md bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900">Continue</button>
      </div>
    </div>
  );
}`,
  });
