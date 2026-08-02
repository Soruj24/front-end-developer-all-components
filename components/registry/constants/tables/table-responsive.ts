import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { productsSource, starSvgSm, statusColorsSource } from "./shared";

export const tableResponsive: RegistryEntry = entry({
    id: "table-responsive",
    title: "Responsive Card Layout",
    description: "On small screens, each row becomes a card for better readability.",
    source: `${productsSource}

${statusColorsSource}

export default function TableResponsive() {
  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800 lg:overflow-visible">
        <table className="min-w-full text-sm hidden lg:table">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              {["Product", "Category", "Price", "Stock", "Status", "Rating"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {products.slice(0, 5).map(p => (
              <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-zinc-500">{p.category}</td>
                <td className="px-4 py-3">\${p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-zinc-500">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className={\`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium \${statusColors[p.status]}\`}>{p.status}</span>
                </td>
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
        <div className="flex flex-col gap-3 p-4 lg:hidden">
          {products.slice(0, 5).map(p => (
            <div key={p.id} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-700">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-zinc-500">{p.category}</p>
                </div>
                <span className={\`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium \${statusColors[p.status]}\`}>{p.status}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="font-mono font-medium">\${p.price.toFixed(2)}</span>
                <span className="text-zinc-500">{p.stock} in stock</span>
              </div>
              <div className="mt-1 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <svg key={s} className={\`h-3 w-3 \${s <= Math.floor(p.rating) ? "text-warning" : "text-zinc-200"}\`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-xs text-zinc-400">{p.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-zinc-400">Resize browser to see card layout at mobile widths.</p>
    </>
  );
}`,
  });
