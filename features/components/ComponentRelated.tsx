import Link from "next/link";
import type { RegistryComponent } from "@/features/registry";
import { categoryBySlug, formatNumber } from "@/features/registry";
import { cn } from "@/lib/cn";
import { thumbnailGradient } from "./thumbnail";

export function ComponentRelated({
  component,
  related,
}: {
  component: RegistryComponent;
  related: RegistryComponent[];
}) {
  if (related.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">
        More in {categoryBySlug[component.category]?.label}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <Link
            key={item.slug}
            href={`/components/${item.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-ring/50"
          >
            <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-bold text-white", thumbnailGradient(item.category))}>
              {categoryBySlug[item.category]?.icon}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-foreground">
                {item.name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {item.description}
              </span>
            </span>
            <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
              {formatNumber(item.stats.likes)}♥
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
