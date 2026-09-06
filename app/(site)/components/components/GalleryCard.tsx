import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import { categoryBySlug } from "@/features/registry";
import type { registryCatalog } from "@/features/registry/data";

type CatalogItem = (typeof registryCatalog)[number];

const STATUS_STYLES: Record<string, string> = {
  stable: "bg-success/10 text-success",
  beta: "bg-warning/10 text-warning",
  new: "bg-info/10 text-info",
  deprecated: "bg-danger/10 text-danger",
};

export function GalleryCard({ component }: { component: CatalogItem }) {
  const cat = categoryBySlug[component.category];

  return (
    <Link
      href={`/components/${component.slug}`}
      aria-label={`${component.name} — ${component.description}`}
      className={cn(
        "group flex min-w-0 flex-col rounded-lg border border-border/60 bg-background transition-colors duration-200 hover:border-ring/40 hover:shadow-sm",
        FOCUS.ring,
      )}
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-border/40 bg-muted/20 px-4">
        <div className="flex min-w-0 flex-col items-center gap-2 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground/70">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          <span className="max-w-full truncate text-xs font-medium">{component.name}</span>
        </div>
        <span
          className={cn(
            "absolute right-2.5 top-2.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
            STATUS_STYLES[component.status] ?? "bg-muted text-muted-foreground",
          )}
        >
          {component.status}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {component.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {component.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cat && (
            <span className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {cat.label}
            </span>
          )}
          {component.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1" title={`${component.stats.downloads.toLocaleString()} downloads`}>
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              {component.stats.downloads.toLocaleString()}
            </span>
            <span className="flex items-center gap-1" title={`${component.stats.likes} likes`}>
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {component.stats.likes}
            </span>
          </span>
          <span className="text-muted-foreground/60">v{component.version}</span>
        </div>
      </div>
    </Link>
  );
}
