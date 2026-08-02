import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationPagination: RegistryEntry = entry({
    id: "navigation-pagination",
    title: "Pagination",
    description: "Compact page-number navigation with prev/next.",
    source: `import { useState } from "react";

export default function NavigationPagination() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex w-full items-center gap-2">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors hover:bg-zinc-100 disabled:opacity-40 dark:hover:bg-zinc-800"
      >
        ←
      </button>
      {[1, 2, 3].map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={\`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors \${p === page ? "bg-foreground text-background" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}\`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(3, page + 1))}
        disabled={page === 3}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors hover:bg-zinc-100 disabled:opacity-40 dark:hover:bg-zinc-800"
      >
        →
      </button>
    </div>
  );
}`,
  });
