import { products } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function ProductCatalog() {
  return (
    <SectionCard title="Product Catalog" description="CRM products and services">
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.name} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{p.name}</h3>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{p.price}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="default">{p.category}</Badge>
              <Badge variant="new">{p.tier}</Badge>
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{p.features}</p>
            <button className="mt-3 w-full rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700">Add to Quote</button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
