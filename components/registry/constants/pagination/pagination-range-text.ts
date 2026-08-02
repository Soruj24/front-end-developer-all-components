import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationRangeText: RegistryEntry = entry({
    id: "pagination-range-text",
    title: "Showing Range Text",
    description: "A live \"Showing X–Y of Z\" range next to the bar.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationRangeText() {
  const [p1, setP1] = useState(5);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4">
      <span className="text-sm text-zinc-500">Showing {(p1 - 1) * 10 + 1}–{Math.min(p1 * 10, 87)} of 87</span>
      <PaginationBar current={p1} total={9} onChange={setP1} />
    </div>
  );
}`,
  });
