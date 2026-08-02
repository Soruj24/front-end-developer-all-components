import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationThumbnails: RegistryEntry = entry({
    id: "pagination-thumbnails",
    title: "Thumbnail Grid",
    description: "A paged grid of numbered thumbnails.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationThumbnails() {
  const [p1, setP1] = useState(1);

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex aspect-square items-center justify-center rounded-lg bg-zinc-100 text-2xl font-bold text-zinc-300 dark:bg-zinc-800">
            {i + 1 + (p1 - 1) * 8}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-zinc-400">Page {p1} of 4</span>
        <PaginationBar current={p1} total={4} onChange={setP1} variant="pill" size="sm" />
      </div>
    </div>
  );
}`,
  });
