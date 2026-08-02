import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { productsSource, starSvgSm } from "./shared";

export const tablePaginated: RegistryEntry = entry({
    id: "table-paginated",
    title: "Pagination",
    description: "Navigate through pages with configurable page sizes.",
    source: `import { useState } from "react";

${productsSource}

export default function TablePaginated() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalPages = Math.ceil(products.length / pageSize);
  const paged = products.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              {["Product", "Category", "Price", "Stock", "Rating"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {paged.map(p => (
              <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-zinc-500">{p.category}</td>
                <td className="px-4 py-3">\${p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-zinc-500">{p.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      ${starSvgSm}
                    ))}
                    <span className="ml-1 text-xs text-zinc-400">{p.rating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span>Rows per page:</span>
          <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded border border-zinc-300 bg-transparent px-2 py-1 text-xs dark:border-zinc-700">
            {[3, 5, 10].map(s => <option key={s}>{s}</option>)}
          </select>
          <span>Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, products.length)} of {products.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(1)} disabled={page === 1} className="flex h-8 w-8 items-center justify-center rounded text-xs hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800">{"<<"}</button>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="flex h-8 w-8 items-center justify-center rounded text-xs hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800">{"<"}</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)} className={\`flex h-8 w-8 items-center justify-center rounded text-xs font-medium \${p === page ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}\`}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-8 w-8 items-center justify-center rounded text-xs hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800">{">"}</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex h-8 w-8 items-center justify-center rounded text-xs hover:bg-zinc-100 disabled:opacity-30 dark:hover:bg-zinc-800">{">>"}</button>
        </div>
      </div>
    </>
  );
}`,
  });
