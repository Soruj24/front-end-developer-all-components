import { cn } from "@/lib/cn";
import { CloseIcon, SearchIcon } from "./icons";

export interface HeaderProps {
  title?: string;
  description?: string;
  searchable: boolean;
  filterable: boolean;
  search: string;
  onSearch: (value: string) => void;
  filter: string | null;
  onFilter: (tag: string | null) => void;
  tagStats: { tags: string[]; counts: Map<string, number> };
  cellCount: number;
  filteredCount: number;
}

export function VariantMatrixHeader({
  title,
  description,
  searchable,
  filterable,
  search,
  onSearch,
  filter,
  onFilter,
  tagStats,
  cellCount,
  filteredCount,
}: HeaderProps) {
  if (!title && !description && !searchable && !filterable) return null;

  return (
    <>
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}

      {(searchable || filterable) && cellCount > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {searchable && (
              <div className="relative w-full max-w-xs">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder="Search variants…"
                  spellCheck={false}
                  aria-label="Search variants"
                  className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-9 text-sm text-foreground outline-none transition-colors placeholder:text-subtle focus:border-ring"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => onSearch("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
            {searchable && (
              <span className="text-xs tabular-nums text-muted-foreground">
                {filteredCount} of {cellCount} shown
              </span>
            )}
          </div>

          {filterable && tagStats.tags.length > 0 && (
            <FilterChips filter={filter} tags={tagStats.tags} counts={tagStats.counts} onFilter={onFilter} />
          )}
        </div>
      )}
    </>
  );
}

interface FilterChipsProps {
  filter: string | null;
  tags: string[];
  counts: Map<string, number>;
  onFilter: (tag: string | null) => void;
}

function FilterChips({ filter, tags, counts, onFilter }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        type="button"
        onClick={() => onFilter(null)}
        aria-pressed={filter === null}
        className={cn(
          "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
          filter === null
            ? "border-transparent bg-foreground text-background"
            : "border-border bg-surface text-muted-foreground hover:text-foreground"
        )}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onFilter(filter === tag ? null : tag)}
          aria-pressed={filter === tag}
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium transition-colors",
            filter === tag
              ? "border-transparent bg-foreground text-background"
              : "border-border bg-surface text-muted-foreground hover:text-foreground"
          )}
        >
          {tag}
          <span className="text-[11px] opacity-60">{counts.get(tag)}</span>
        </button>
      ))}
    </div>
  );
}
