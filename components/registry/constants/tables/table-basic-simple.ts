import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { productsSource, statusColorsSource } from "./shared";

export const tableBasicSimple: RegistryEntry = entry({
    id: "table-basic-simple",
    title: "Simple Data Table",
    description: "A clean, minimal table for displaying data without interactivity.",
    source: `${productsSource}

${statusColorsSource}

export default function TableBasicSimple() {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            {["Product", "Category", "Price", "Stock", "Status"].map(h => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
  });
