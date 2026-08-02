import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationCondensed: RegistryEntry = entry({
    id: "pagination-condensed",
    title: "Condensed & Minimal",
    description: "Compact bars: no labels, icons only, ghost, and dividers.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationCondensed() {
  const [p1, setP1] = useState(4);
  const [p2, setP2] = useState(5);
  const [p3, setP3] = useState(2);
  const [p4, setP4] = useState(3);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Condensed (No Label)</p>
        <PaginationBar current={p1} total={10} onChange={setP1} size="sm" />
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Icons Only (No Labels)</p>
        <div className="flex items-center gap-2">
          <button onClick={() => setP2(Math.max(1, p2 - 1))} disabled={p2 === 1} className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 disabled:opacity-40 dark:border-zinc-700"><ChevronLeft /></button>
          <div className="flex items-center gap-1 text-sm font-medium text-zinc-500">Page {p2} of 10</div>
          <button onClick={() => setP2(Math.min(10, p2 + 1))} disabled={p2 === 10} className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 disabled:opacity-40 dark:border-zinc-700"><ChevronRight /></button>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Ghost / Minimal (No Borders)</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setP3(Math.max(1, p3 - 1))} disabled={p3 === 1} className="flex h-8 w-8 items-center justify-center rounded text-sm text-zinc-400 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"><ChevronLeft /></button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <button key={n} onClick={() => setP3(n)} className={\`flex h-8 min-w-[32px] items-center justify-center rounded text-sm \${n === p3 ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}\`}>{n}</button>
          ))}
          <button onClick={() => setP3(Math.min(8, p3 + 1))} disabled={p3 === 8} className="flex h-8 w-8 items-center justify-center rounded text-sm text-zinc-400 hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800"><ChevronRight /></button>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Vertical Dividers</p>
        <div className="inline-flex items-center rounded-md border border-zinc-300 dark:border-zinc-700">
          <button onClick={() => setP4(Math.max(1, p4 - 1))} disabled={p4 === 1} className="flex h-9 w-9 items-center justify-center disabled:opacity-40"><ChevronLeft /></button>
          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n, i) => (
            <span key={n} className="flex items-center">
              <button onClick={() => setP4(n)} className={\`flex h-9 min-w-[36px] items-center justify-center text-sm \${n === p4 ? "font-medium text-zinc-900 dark:text-zinc-100" : "text-zinc-500"}\`}>{n}</button>
              {i < 7 && <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700" />}
            </span>
          ))}
          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
          <button onClick={() => setP4(Math.min(8, p4 + 1))} disabled={p4 === 8} className="flex h-9 w-9 items-center justify-center disabled:opacity-40"><ChevronRight /></button>
        </div>
      </div>
    </div>
  );
}`,
  });
