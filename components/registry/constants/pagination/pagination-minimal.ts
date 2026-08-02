import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationMinimal: RegistryEntry = entry({
    id: "pagination-minimal",
    title: "Minimal & Aligned",
    description: "Prev/next only, centered, and right-aligned bars.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationMinimal() {
  const [p1, setP1] = useState(2);
  const [p2, setP2] = useState(4);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Minimal (Only Prev/Next)</p>
        <div className="flex items-center justify-between">
          <button disabled className="flex items-center gap-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm disabled:opacity-40 dark:border-zinc-700">
            <ChevronLeft /> Previous
          </button>
          <span className="text-sm text-zinc-500">Page 1 of 8</span>
          <button className="flex items-center gap-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
            Next <ChevronRight />
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 text-center dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Centered</p>
        <div className="flex justify-center">
          <PaginationBar current={p1} total={8} onChange={setP1} />
        </div>
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Right-Aligned</p>
        <div className="flex justify-end">
          <PaginationBar current={p2} total={8} onChange={setP2} />
        </div>
      </div>
    </div>
  );
}`,
  });
