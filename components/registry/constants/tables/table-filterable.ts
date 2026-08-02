import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { productsSource, statusColorsSource } from "./shared";

export const tableFilterable: RegistryEntry = entry({
    id: "table-filterable",
    title: "Filterable Table",
    description: "Search, filter by category and status to narrow results.",
    source: `import { useState, useMemo } from "react";

${productsSource}

${statusColorsSource}

export default function TableFilterable() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (category !== "All" && p.category !== category) return false;
      if (status !== "All" && p.status !== status) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, category, status]);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const statuses = ["All", ...Array.from(new Set(products.map(p => p.status)))];

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full rounded-md border border-zinc-300 bg-transparent py-2 pl-10 pr-4 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-400" />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-700">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)} className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-700">
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <span className="text-sm text-zinc-400">{filtered.length} results</span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900 sticky top-0">
            <tr>
              {["Product", "Category", "Price", "Stock", "Status"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filtered.length > 0 ? filtered.map(p => (
              <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-zinc-500">{p.category}</td>
                <td className="px-4 py-3">\${p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-zinc-500">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className={\`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium \${statusColors[p.status]}\`}>{p.status}</span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-zinc-400">No products match your filters. <button onClick={() => { setSearch(""); setCategory("All"); setStatus("All"); }} className="text-primary hover:underline dark:text-blue-400">Clear filters</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}`,
  });
