import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationPagination: RegistryEntry = entry({
    id: "navigation-pagination",
    title: "Pagination",
    description: "Compact page-number navigation with icon buttons and a filled active page.",
    source: `import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function NavigationPagination() {
  const [page, setPage] = useState(1);

  const base =
    "inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-medium tabular-nums transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-40";
  const ghost = \`\${base} border border-transparent text-muted-foreground hover:bg-muted hover:text-foreground\`;

  return (
    <nav aria-label="Pagination" className="flex w-fit items-center gap-1 rounded-xl border border-border bg-background p-1 shadow-xs">
      <button type="button" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} aria-label="Previous page" className={\`\${ghost} mr-1\`}>
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      {[1, 2, 3].map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setPage(p)}
          aria-current={p === page ? "page" : undefined}
          aria-label={\`Page \${p}\`}
          className={\`\${base} \${p === page ? "bg-primary text-primary-foreground shadow-xs" : ghost}\`}
        >
          {p}
        </button>
      ))}
      <button type="button" onClick={() => setPage(Math.min(3, page + 1))} disabled={page === 3} aria-label="Next page" className={\`\${ghost} ml-1\`}>
        <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}`,
    });
