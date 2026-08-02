import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationPageSize: RegistryEntry = entry({
    id: "pagination-page-size",
    title: "Page Size Selector",
    description: "Rows-per-page text and a dropdown per-page control.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationPageSize() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(3);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Page Size Selector</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-zinc-500">Rows: 10</label>
            <span className="text-sm text-zinc-500">1–10 of 143</span>
          </div>
          <PaginationBar current={p1} total={15} onChange={setP1} />
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Dropdown Per-Page</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500">Per page:</span>
            <select className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800">
              <option>10</option><option>20</option><option>50</option>
            </select>
          </div>
          <PaginationBar current={p2} total={10} onChange={setP2} variant="pill" />
        </div>
      </div>
    </div>
  );
}`,
  });
