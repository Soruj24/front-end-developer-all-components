import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationMobile: RegistryEntry = entry({
    id: "pagination-mobile",
    title: "Mobile & Full Featured",
    description: "A compact mobile bar and a full featured toolbar.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationMobile() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(4);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Mobile Optimized (Compact)</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setP1(Math.max(1, p1 - 1))} disabled={p1 === 1} className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-300 text-sm font-medium disabled:opacity-40 dark:border-zinc-700">
            <ChevronLeft /> Prev
          </button>
          <span className="flex h-10 min-w-[80px] items-center justify-center text-sm font-medium">{p1} of 8</span>
          <button onClick={() => setP1(Math.min(8, p1 + 1))} disabled={p1 === 8} className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-300 text-sm font-medium disabled:opacity-40 dark:border-zinc-700">
            Next <ChevronRight />
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Full Featured Example</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <select className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800">
              <option>10 / page</option><option>20 / page</option><option>50 / page</option>
            </select>
            <span className="text-xs text-zinc-500">1–10 of 247</span>
          </div>
          <PaginationBar current={p2} total={25} onChange={setP2} />
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <span>Go to</span>
            <input type="number" min={1} max={25} className="w-12 rounded border border-zinc-300 px-2 py-1 text-center text-xs dark:border-zinc-700 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
