import Link from "next/link";
import type { RegistryComponent } from "@/features/registry";
import { categoryBySlug, formatNumber } from "@/features/registry";
import { cn } from "@/lib/cn";
import { ComponentStatusBadge } from "./ComponentStatusBadge";
import { thumbnailGradient, componentInitials } from "./thumbnail";
import { DownloadIcon, HeartIcon, BookmarkIcon } from "./icons";

export function ComponentCard({ component }: { component: RegistryComponent }) {
  const category = categoryBySlug[component.category];
  const href = `/components/${component.slug}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-[border-color,box-shadow,transform] duration-200 hover:border-ring/50 hover:shadow-card"
    >
      <div className={cn("relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br", thumbnailGradient(component.category))}>
        <span className="text-4xl font-bold text-white/90 transition-transform duration-300 group-hover:scale-110">
          {componentInitials(component.name)}
        </span>
        <span className="absolute left-3 top-3 rounded-full bg-black/20 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
          {category?.label ?? component.category}
        </span>
        <span className="absolute right-3 top-3 text-white/80">{category?.icon}</span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold text-foreground">{component.name}</h3>
          <ComponentStatusBadge status={component.status} />
        </div>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
          {component.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {component.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
          <span className="font-mono text-xs">v{component.version}</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <DownloadIcon className="h-3.5 w-3.5" />
              {formatNumber(component.stats.downloads)}
            </span>
            <span className="flex items-center gap-1">
              <HeartIcon className="h-3.5 w-3.5" />
              {formatNumber(component.stats.likes)}
            </span>
            <span className="flex items-center gap-1">
              <BookmarkIcon className="h-3.5 w-3.5" />
              {formatNumber(component.stats.bookmarks)}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
