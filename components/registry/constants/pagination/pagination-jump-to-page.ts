import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationJumpToPage: RegistryEntry = entry({
    id: "pagination-jump-to-page",
    title: "Jump to Page",
    description: "Jump-to-page, inline page input, and typed-jump inputs.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationJumpToPage() {
  const [p1, setP1] = useState(3);
  const [p2, setP2] = useState(5);
  const [p3, setP3] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Jump-to-Page</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <PaginationBar current={p1} total={12} onChange={setP1} />
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Go to:</span>
            <input type="number" min={1} max={12} className="w-14 rounded-md border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800" placeholder="#" />
            <button className="rounded-md bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Go</button>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Page Input (Inline)</p>
        <div className="flex flex-wrap items-center gap-4">
          <PaginationBar current={p2} total={12} onChange={setP2} />
          <div className="flex items-center gap-1 text-sm">
            <span className="text-zinc-500">Page</span>
            <input type="number" min={1} max={12} className="w-12 rounded border border-zinc-300 px-2 py-1 text-center text-sm dark:border-zinc-700 dark:bg-zinc-800" value={p2} onChange={(e) => { const v = parseInt(e.target.value); if (v >= 1 && v <= 12) setP2(v); }} />
            <span className="text-zinc-500">of 12</span>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Typed Input (Jump)</p>
        <div className="flex flex-wrap items-center gap-4">
          <PaginationBar current={p3} total={10} onChange={setP3} />
          <div className="flex items-center gap-1">
            <input type="number" min={1} max={10} placeholder="Page #" className="w-16 rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800" />
            <button className="rounded bg-zinc-900 px-2 py-1 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Jump</button>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
