import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { productsSource, starSvg, statusColorsSource } from "./shared";

export const tableBasicStatus: RegistryEntry = entry({
    id: "table-basic-status",
    title: "Status Badges & Icons",
    description: "Rich visual indicators for status, ratings, and stock levels.",
    source: `${productsSource}

${statusColorsSource}

export default function TableBasicStatus() {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            {["Product", "Price", "Rating", "Stock", "Status"].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {products.slice(0, 6).map(p => (
            <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <td className="px-4 py-3 font-medium">{p.name}</td>
              <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300">\${p.price.toFixed(2)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    ${starSvg}
                  ))}
                  <span className="ml-1 text-xs text-zinc-400">{p.rating}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700">
                    <div className={\`h-full rounded-full \${p.stock > 100 ? "bg-emerald-500" : p.stock > 0 ? "bg-warning" : "bg-danger"}\`} style={{ width: \`\${Math.min(p.stock / 5, 100)}%\` }} />
                  </div>
                  <span className="text-xs text-zinc-500">{p.stock}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={\`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium \${statusColors[p.status]}\`}>{p.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
  });
