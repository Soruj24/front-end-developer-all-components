import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const paginationLoadMore: RegistryEntry = entry({
    id: "pagination-load-more",
    title: "Load More",
    description: "Show-more button that reveals additional items.",
    source: `import { useState } from "react";

export default function PaginationLoadMore() {
  const [p1, setP1] = useState(2);

  return (
    <div className="flex w-full flex-col gap-2">
      {Array.from({ length: p1 * 3 }, (_, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-zinc-100 px-3 py-2 text-sm dark:border-zinc-800">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-zinc-100 text-xs font-medium dark:bg-zinc-800">{i + 1}</span>
          Item {i + 1}
        </div>
      ))}
      {p1 < 5 && (
        <button onClick={() => setP1(p1 + 1)} className="mt-3 w-full rounded-lg border border-dashed border-zinc-300 py-2 text-sm text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-600">
          + Load More ({p1 * 3} of 15)
        </button>
      )}
      {p1 >= 5 && <p className="mt-3 text-center text-xs text-zinc-400">All 15 items loaded</p>}
    </div>
  );
}`,
  });
