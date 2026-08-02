import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { chevronSource } from "./shared";

export const paginationGradient: RegistryEntry = entry({
    id: "pagination-gradient",
    title: "Gradient & Counter Badge",
    description: "A gradient active page and a badge on the active page.",
    source: `import { useState } from "react";

${chevronSource}

export default function PaginationGradient() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(3);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Gradient Active Page</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setP1(Math.max(1, p1 - 1))} disabled={p1 === 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 text-sm disabled:opacity-40 dark:border-zinc-700"><ChevronLeft /></button>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <button key={n} onClick={() => setP1(n)} className={\`flex h-9 min-w-[36px] items-center justify-center rounded-lg text-sm font-medium \${n === p1 ? "bg-gradient-to-br from-zinc-800 to-zinc-600 text-white shadow dark:from-zinc-200 dark:to-zinc-400" : "border border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"}\`}>{n}</button>
          ))}
          <button onClick={() => setP1(Math.min(7, p1 + 1))} disabled={p1 === 7} className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 text-sm disabled:opacity-40 dark:border-zinc-700"><ChevronRight /></button>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Counter Badge on Active</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setP2(Math.max(1, p2 - 1))} disabled={p2 === 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 text-sm disabled:opacity-40 dark:border-zinc-700"><ChevronLeft /></button>
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <button key={n} onClick={() => setP2(n)} className={\`relative flex h-9 min-w-[36px] items-center justify-center rounded-lg border text-sm \${n === p2 ? "border-zinc-900 bg-zinc-900 font-medium text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900" : "border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"}\`}>
              {n}
              {n === p2 && <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-[14px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">●</span>}
            </button>
          ))}
          <button onClick={() => setP2(Math.min(7, p2 + 1))} disabled={p2 === 7} className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 text-sm disabled:opacity-40 dark:border-zinc-700"><ChevronRight /></button>
        </div>
      </div>
    </div>
  );
}`,
  });
