import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationComments: RegistryEntry = entry({
    id: "pagination-comments",
    title: "Comment Thread",
    description: "Paged user comments with a compact bar.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationComments() {
  const [p1, setP1] = useState(3);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium dark:bg-zinc-800">
              {["A", "B", "C"][i]}
            </div>
            <div>
              <div className="text-sm font-medium">User {(p1 - 1) * 3 + i + 1}</div>
              <div className="text-xs text-zinc-500">This is a sample comment for demonstration.</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-zinc-400">Page {p1} of 5</span>
        <PaginationBar current={p1} total={5} onChange={setP1} variant="outline" size="sm" />
      </div>
    </div>
  );
}`,
  });
