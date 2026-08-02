import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { productsSource, statusColorsSource } from "./shared";

export const tableSelectable: RegistryEntry = entry({
    id: "table-selectable",
    title: "Row Selection",
    description: "Checkboxes for selecting rows and bulk actions.",
    source: `import { useState } from "react";

${productsSource}

${statusColorsSource}

export default function TableSelectable() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const allSelected = products.length > 0 && products.every(p => selected.has(p.id));

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(products.map(p => p.id)));
  };

  const toggleRow = (id: number) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="w-12 px-4 py-3">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-zinc-300 dark:border-zinc-700" />
              </th>
              {["Product", "Category", "Price", "Stock", "Status"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {products.map(p => (
              <tr key={p.id} className={\`\${selected.has(p.id) ? "bg-primary-soft" : ""} hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors\`}>
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleRow(p.id)} className="rounded border-zinc-300 dark:border-zinc-700" />
                </td>
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-zinc-500">{p.category}</td>
                <td className="px-4 py-3">\${p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-zinc-500">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className={\`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium \${statusColors[p.status]}\`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected.size > 0 && (
        <div className="flex gap-2">
          <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary/90">Bulk Edit</button>
          <button className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger-soft dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20">Delete Selected</button>
          <button onClick={() => setSelected(new Set())} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">Clear</button>
        </div>
      )}
    </>
  );
}`,
  });
