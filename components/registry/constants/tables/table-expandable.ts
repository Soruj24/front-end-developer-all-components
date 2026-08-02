import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { productsSource } from "./shared";

export const tableExpandable: RegistryEntry = entry({
    id: "table-expandable",
    title: "Expandable Rows",
    description: "Click a row to expand and reveal additional details.",
    source: `import { useState } from "react";

${productsSource}

const details: Record<number, { description: string; specs: string; leadTime: string }> = {
  1: { description: "Premium noise-canceling headphones with 30-hour battery life.", specs: "Bluetooth 5.3, 40mm drivers, USB-C", leadTime: "2-3 days" },
  2: { description: "100% organic cotton, pre-shrunk, available in 12 colors.", specs: "S-3XL, 180gsm, jersey knit", leadTime: "5-7 days" },
  4: { description: "Lightweight running shoes with responsive cushioning.", specs: "Mesh upper, EVA midsole, rubber outsole", leadTime: "3-5 days" },
  6: { description: "Classic denim jacket with modern fit, unisex design.", specs: "100% denim, brass buttons, 2 pockets", leadTime: "7-10 days" },
  10: { description: "Hot-swappable mechanical keyboard with RGB backlighting.", specs: "Cherry MX switches, PBT keycaps, USB-C", leadTime: "2-3 days" },
};

export default function TableExpandable() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th className="w-10 px-4 py-3" />
              {["Product", "Category", "Price", "Stock"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {products.filter(p => [1, 2, 4, 6, 10].includes(p.id)).map(p => (
              <>
                <tr key={p.id} onClick={() => setExpanded(expanded === p.id ? null : p.id)} className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="px-4 py-3">
                    <span className={\`inline-block transition-transform \${expanded === p.id ? "rotate-90" : ""}\`}>
                      <svg className="h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-zinc-500">{p.category}</td>
                  <td className="px-4 py-3">\${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-zinc-500">{p.stock}</td>
                </tr>
                {expanded === p.id && (
                  <tr key={\`\${p.id}-expanded\`}>
                    <td colSpan={5} className="bg-zinc-50 px-10 py-4 dark:bg-zinc-900/50">
                      <div className="grid gap-2 text-sm sm:grid-cols-3">
                        <div><span className="text-xs font-semibold uppercase text-zinc-400">Description</span><p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{details[p.id]?.description}</p></div>
                        <div><span className="text-xs font-semibold uppercase text-zinc-400">Specifications</span><p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{details[p.id]?.specs}</p></div>
                        <div><span className="text-xs font-semibold uppercase text-zinc-400">Lead Time</span><p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{details[p.id]?.leadTime}</p></div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-400">Click any row to expand details.</p>
    </>
  );
}`,
  });
