import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationSearchResults: RegistryEntry = entry({
    id: "pagination-search-results",
    title: "Search Results",
    description: "Paged search results with a result count line.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationSearchResults() {
  const [p1, setP1] = useState(4);

  return (
    <div className="w-full">
      <p className="mb-3 text-sm text-zinc-500">Showing results {(p1 - 1) * 10 + 1}–{Math.min(p1 * 10, 142)} of 142 for &ldquo;design&rdquo;</p>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
            <div className="text-sm font-medium">Result {(p1 - 1) * 3 + i + 1}</div>
            <div className="text-xs text-zinc-500">Description of search result item.</div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <PaginationBar current={p1} total={15} onChange={setP1} />
      </div>
    </div>
  );
}`,
  });
