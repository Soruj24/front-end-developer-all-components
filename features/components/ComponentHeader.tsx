import type { RegistryComponent } from "@/features/registry";
import { categoryBySlug, formatDate, statusLabel } from "@/features/registry";
import { ComponentStatusBadge } from "./ComponentStatusBadge";
import { ComponentTags } from "./ComponentTags";
import { ComponentStats } from "./ComponentStats";

export function ComponentHeader({ component }: { component: RegistryComponent }) {
  const category = categoryBySlug[component.category];

  return (
    <div className="flex flex-col gap-5">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <span>Registry</span>
        <span className="text-muted-foreground/50">/</span>
        <span>{category?.label ?? component.category}</span>
        <span className="text-muted-foreground/50">/</span>
        <span className="font-medium text-foreground">{component.name}</span>
      </nav>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {component.name}
          </h1>
          <ComponentStatusBadge status={component.status} />
          <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
            v{component.version}
          </span>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {component.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>
            By <span className="font-medium text-foreground">{component.author}</span>
          </span>
          <span>Updated {formatDate(component.updatedAt)}</span>
          <span>{statusLabel[component.status]}</span>
        </div>
        <ComponentTags tags={component.tags} />
      </div>

      <ComponentStats stats={component.stats} />
    </div>
  );
}
