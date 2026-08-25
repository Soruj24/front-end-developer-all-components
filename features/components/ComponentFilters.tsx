import type { RegistryComponent } from "@/features/registry";
import { registryCategories, registrySortOptions, tagCounts } from "@/features/registry";
import { cn } from "@/lib/cn";
import { InlineSelect } from "@/components/ui/InlineSelect";
import { ComponentSearch } from "./ComponentSearch";

export interface FiltersProps {
  components: RegistryComponent[];
  query: string;
  onQuery: (value: string) => void;
  category: string;
  onCategory: (value: string) => void;
  tag: string;
  onTag: (value: string) => void;
  sort: string;
  onSort: (value: string) => void;
}

export function ComponentFilters(props: FiltersProps) {
  const tags = Object.entries(tagCounts(props.components))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="flex flex-col gap-4">
      <ComponentSearch value={props.query} onChange={props.onQuery} />

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Category filters">
        {["all", ...registryCategories.map((category) => category.id)].map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => props.onCategory(id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              props.category === id
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {id === "all" ? "All" : (registryCategories.find((c) => c.id === id)?.label ?? id)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags.map(([name, count]) => (
            <button
              key={name}
              type="button"
              onClick={() => props.onTag(props.tag === name ? "all" : name)}
              className={cn(
                "rounded-md px-2 py-1 text-[11px] transition-colors",
                props.tag === name
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              #{name} {count}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Sort
          <InlineSelect
            options={registrySortOptions.map((option) => ({ value: option.value, label: option.label }))}
            value={props.sort}
            onChange={(val) => props.onSort(val)}
            size="sm"
          />
        </label>
      </div>
    </div>
  );
}
