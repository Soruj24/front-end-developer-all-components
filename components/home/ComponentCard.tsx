import Link from "next/link";
import { cn } from "@/lib/cn";
import type { RegistryComponent } from "@/features/registry";
import { formatNumber, categoryBySlug } from "@/features/registry";

interface ComponentCardProps {
  component: RegistryComponent;
  className?: string;
}

const statusColors: Record<string, string> = {
  stable: "bg-success/10 text-success",
  beta: "bg-warning/10 text-warning",
  new: "bg-info/10 text-info",
  deprecated: "bg-danger/10 text-danger",
};

export function ComponentCard({ component, className }: ComponentCardProps) {
  const cat = categoryBySlug[component.category];

  return (
    <div
      className={cn(
        "group flex flex-col rounded-lg border border-border/60 bg-background transition-all duration-200",
        "hover:border-ring/40 hover:shadow-sm",
        className,
      )}
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-border/40 bg-muted/20 px-4">
        <div className="flex items-center gap-2 text-muted-foreground/60">
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          <span className="text-sm font-medium">{component.name}</span>
        </div>
        <span className={cn("absolute right-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-medium", statusColors[component.status] ?? "bg-muted text-muted-foreground")}>
          {component.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">{component.name}</h3>
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{component.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cat && (
            <span className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {cat.label}
            </span>
          )}
          {component.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2 border-t border-border/40">
          <Link
            href={`/components/${component.slug}`}
            className="flex h-7 flex-1 items-center justify-center rounded-md bg-muted/60 text-[11px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            View
          </Link>
          <span className="text-[10px] text-muted-foreground/60">
            {formatNumber(component.stats.downloads)}
          </span>
        </div>
      </div>
    </div>
  );
}
