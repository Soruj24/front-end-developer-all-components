import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationSkeleton: RegistryEntry = entry({
    id: "pagination-skeleton",
    title: "Loading Skeleton",
    description: "Skeleton rows that shimmer while data loads.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationSkeleton() {
  const [p1, setP1] = useState(2);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="h-4 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <PaginationBar current={p1} total={10} onChange={setP1} />
      </div>
    </div>
  );
}`,
  });
