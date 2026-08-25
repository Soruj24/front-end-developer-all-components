import { cn } from "@/lib/cn";
import { products } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function ProductCatalog() {
  return (
    <SectionCard title="Product Catalog" description="CRM products and services">
      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.name}
            className={cn(
              "rounded-lg border border-border/60 p-4",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{p.price}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="default">{p.category}</Badge>
              <Badge variant="new">{p.tier}</Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{p.features}</p>
            <button
              className={cn(
                "mt-3 w-full rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white",
                "transition-all hover:bg-blue-700",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                "active:scale-[0.97]"
              )}
            >
              Add to Quote
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}