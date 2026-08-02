import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationCardGrid: RegistryEntry = entry({
    id: "pagination-card-grid",
    title: "Card Grid",
    description: "A paged grid of numbered cards.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationCardGrid() {
  const [p1, setP1] = useState(1);

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="rounded-lg border border-zinc-200 p-3 text-center dark:border-zinc-800">
            <div className="text-lg font-bold text-zinc-400">#{i + 1 + (p1 - 1) * 5}</div>
            <div className="text-xs text-zinc-500">Item</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <PaginationBar current={p1} total={6} onChange={setP1} variant="pill" size="sm" />
      </div>
    </div>
  );
}`,
  });
