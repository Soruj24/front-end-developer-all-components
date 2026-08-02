import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationPageCounts: RegistryEntry = entry({
    id: "pagination-page-counts",
    title: "Page Count Variants",
    description: "Few, medium, many, and very many pages.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationPageCounts() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(3);
  const [p3, setP3] = useState(6);
  const [p4, setP4] = useState(2);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[
        { label: "Few Pages (3)", t: 3, s: [p1, setP1] as const },
        { label: "Medium (8)", t: 8, s: [p2, setP2] as const },
        { label: "Many (15)", t: 15, s: [p3, setP3] as const },
        { label: "Very Many (25)", t: 25, s: [p4, setP4] as const },
      ].map((item) => (
        <div key={item.label} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="mb-3 text-sm font-medium">{item.label}</p>
          <PaginationBar current={item.s[0]} total={item.t} onChange={item.s[1]} />
        </div>
      ))}
    </div>
  );
}`,
  });
