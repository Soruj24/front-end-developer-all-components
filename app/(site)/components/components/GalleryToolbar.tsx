"use client";

import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import { registryCategories } from "@/features/registry";

export type SortOption = "popular" | "name" | "newest" | "downloads";

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "popular", label: "Popular" },
  { value: "name", label: "Name" },
  { value: "newest", label: "Newest" },
  { value: "downloads", label: "Downloads" },
];

interface GalleryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  categoryCounts: Record<string, number>;
}

export function GalleryToolbar({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  categoryCounts,
}: GalleryToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="search" className="relative w-full lg:max-w-md">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search components…"
            aria-label="Search components"
            className={cn(
              "h-11 w-full rounded-lg border border-border bg-background pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground transition-colors hover:border-muted-foreground/30 lg:h-10",
              FOCUS.ringInput,
            )}
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className={cn(
                "absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:text-foreground",
                FOCUS.ring,
              )}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div
          role="radiogroup"
          aria-label="Sort components"
          className="flex w-full items-center gap-1 overflow-x-auto rounded-lg border border-border/60 bg-muted/30 p-1 [scrollbar-width:none] lg:w-auto"
        >
          {SORT_OPTIONS.map((option) => {
            const checked = sortBy === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() => onSortChange(option.value)}
                className={cn(
                  "min-h-[44px] shrink-0 rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors lg:min-h-0",
                  FOCUS.ring,
                  checked
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <CategoryPill
          active={selectedCategory === "all"}
          onClick={() => onCategoryChange("all")}
          label="All"
          count={categoryCounts.all}
        />
        {registryCategories.map((cat) => (
          <CategoryPill
            key={cat.id}
            active={selectedCategory === cat.id}
            onClick={() => onCategoryChange(cat.id)}
            label={cat.label}
            icon={cat.icon}
            count={categoryCounts[cat.id]}
          />
        ))}
      </div>
    </div>
  );
}

function CategoryPill({
  active,
  onClick,
  label,
  icon,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors sm:min-h-0",
        FOCUS.ring,
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "border border-border/60 bg-background text-muted-foreground hover:border-ring/40 hover:text-foreground",
      )}
    >
      {icon && (
        <span className="flex h-4 w-4 items-center justify-center text-[13px]" aria-hidden="true">
          {icon}
        </span>
      )}
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px]",
            active ? "bg-primary-foreground/20" : "bg-muted",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
