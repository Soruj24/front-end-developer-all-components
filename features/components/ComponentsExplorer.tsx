"use client";

import { useMemo, useState } from "react";
import type { RegistryComponent } from "@/features/registry";
import { filterComponents } from "@/features/registry";
import { ComponentFilters } from "./ComponentFilters";
import { ComponentGrid } from "./ComponentGrid";
import { ComponentCard } from "./ComponentCard";

export function ComponentsExplorer({ components }: { components: RegistryComponent[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(
    () => filterComponents(components, { query, category, tag, sort }),
    [components, query, category, tag, sort]
  );

  return (
    <div className="flex flex-col gap-6">
      <ComponentFilters
        components={components}
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
        tag={tag}
        onTag={setTag}
        sort={sort}
        onSort={setSort}
      />

      <p className="text-xs text-muted-foreground" role="status">
        Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
        {components.length} components
      </p>

      {filtered.length > 0 ? (
        <ComponentGrid>
          {filtered.map((component) => (
            <ComponentCard key={component.slug} component={component} />
          ))}
        </ComponentGrid>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-20 text-center">
          <p className="text-sm font-medium text-foreground">No components found</p>
          <p className="text-xs text-muted-foreground">
            Try a different search term or clear the filters.
          </p>
        </div>
      )}
    </div>
  );
}
