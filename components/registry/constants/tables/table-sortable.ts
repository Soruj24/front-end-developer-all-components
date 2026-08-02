import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { productsSource, statusColorsSource } from "./shared";

export const tableSortable: RegistryEntry = entry({
    id: "table-sortable",
    title: "Sortable Table",
    description: "Click any column header to sort ascending or descending.",
    source: `import { useState, useMemo } from "react";

${productsSource}

${statusColorsSource}

function SortArrows({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  return (
    <span className="ml-1 inline-flex flex-col leading-none">
      <svg className={\`h-2.5 w-2.5 \${active && dir === "asc" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-300 dark:text-zinc-600"}\`} fill="currentColor" viewBox="0 0 10 6"><path d="M5 0L10 6H0z" /></svg>
      <svg className={\`h-2.5 w-2.5 \${active && dir === "desc" ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-300 dark:text-zinc-600"}\`} fill="currentColor" viewBox="0 0 10 6"><path d="M5 6L0 0h10z" /></svg>
    </span>
  );
}

export default function TableSortable() {
  const [sortKey, setSortKey] = useState<"name" | "category" | "price" | "stock">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      const cmp = a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir]);

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const cols = [
    { key: "name" as const, label: "Product" },
    { key: "category" as const, label: "Category" },
    { key: "price" as const, label: "Price" },
    { key: "stock" as const, label: "Stock" },
  ];

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              {cols.map(c => (
                <th key={c.key} onClick={() => handleSort(c.key)} className="cursor-pointer px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                  <span className="inline-flex items-center">
                    {c.label}
                    <SortArrows active={sortKey === c.key} dir={sortDir} />
                  </span>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {sorted.map(p => (
              <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-zinc-500">{p.category}</td>
                <td className="px-4 py-3 font-mono">\${p.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={\`font-medium \${p.stock < 20 ? "text-danger dark:text-red-400" : "text-zinc-700 dark:text-zinc-300"}\`}>{p.stock}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={\`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium \${statusColors[p.status]}\`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-400">Sorted by {sortKey} ({sortDir}ending)</p>
    </>
  );
}`,
  });
