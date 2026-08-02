import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationTotalBadge: RegistryEntry = entry({
    id: "pagination-total-badge",
    title: "Total Count Badge",
    description: "A total-count badge and the disabled single-page state.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationTotalBadge() {
  const [p1, setP1] = useState(1);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">With Total Count Badge</p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">Total:</span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium dark:bg-zinc-800">1,284 items</span>
          </div>
          <PaginationBar current={p1} total={15} onChange={setP1} />
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Disabled State (less than 2 pages)</p>
        <PaginationBar current={1} total={1} onChange={() => {}} />
        <p className="mt-2 text-xs text-zinc-400">Single page — controls are disabled.</p>
      </div>
    </div>
  );
}`,
  });
