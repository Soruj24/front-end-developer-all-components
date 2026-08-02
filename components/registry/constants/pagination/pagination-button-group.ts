import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { chevronSource } from "./shared";

export const paginationButtonGroup: RegistryEntry = entry({
    id: "pagination-button-group",
    title: "Button Group",
    description: "Connected prev/number/next buttons sharing one border.",
    source: `import { useState } from "react";

${chevronSource}

export default function PaginationButtonGroup() {
  const [p1, setP1] = useState(1);

  return (
    <div className="inline-flex -space-x-px overflow-hidden rounded-md border border-zinc-300 shadow-sm dark:border-zinc-700">
      <button onClick={() => setP1(Math.max(1, p1 - 1))} disabled={p1 === 1} className="border-r border-zinc-300 bg-white px-3 py-2 text-sm disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900"><ChevronLeft /></button>
      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
        <button key={n} onClick={() => setP1(n)} className={\`border-r border-zinc-300 px-3 py-2 text-sm last:border-r-0 dark:border-zinc-700 \${n === p1 ? "bg-zinc-900 font-medium text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800"}\`}>{n}</button>
      ))}
      <button onClick={() => setP1(Math.min(7, p1 + 1))} disabled={p1 === 7} className="bg-white px-3 py-2 text-sm disabled:opacity-40 dark:bg-zinc-900"><ChevronRight /></button>
    </div>
  );
}`,
  });
