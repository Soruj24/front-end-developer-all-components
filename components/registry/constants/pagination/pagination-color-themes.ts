import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const paginationColorThemes: RegistryEntry = entry({
    id: "pagination-color-themes",
    title: "Color Themes",
    description: "Zinc, indigo, emerald, amber, and rose themes.",
    source: `import { useState } from "react";

const themes = [
  { label: "Zinc (Default)", bg: "bg-zinc-900 dark:bg-zinc-100", interactive: true },
  { label: "Indigo", bg: "bg-primary", interactive: false },
  { label: "Emerald", bg: "bg-emerald-600", interactive: false },
  { label: "Amber", bg: "bg-warning", interactive: false },
  { label: "Rose", bg: "bg-rose-600", interactive: false },
];

export default function PaginationColorThemes() {
  const [p1, setP1] = useState(1);

  return (
    <div className="flex w-full flex-col gap-4">
      {themes.map((c) => (
        <div key={c.label} className="flex flex-wrap items-center gap-4">
          <span className="w-24 text-xs text-zinc-500">{c.label}</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <button key={n} onClick={() => { if (c.interactive) setP1(n); }} className={\`flex h-8 min-w-[32px] items-center justify-center rounded-md border px-2 text-xs \${n === p1 && c.interactive ? \`\${c.bg} border-transparent text-white\` : "border-zinc-300 dark:border-zinc-700"}\`}>{n}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}`,
  });
