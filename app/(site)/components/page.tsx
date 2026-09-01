"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { registryCategories, categoryBySlug } from "@/features/registry";
import { registryCatalog } from "@/features/registry/data";

type SortOption = "popular" | "name" | "newest" | "downloads";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "name", label: "Name" },
  { value: "newest", label: "Newest" },
  { value: "downloads", label: "Downloads" },
];

const statusColors: Record<string, string> = {
  stable: "bg-success/10 text-success",
  beta: "bg-warning/10 text-warning",
  new: "bg-info/10 text-info",
  deprecated: "bg-danger/10 text-danger",
};

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ComponentCard({
  component,
}: {
  component: (typeof registryCatalog)[number];
}) {
  const cat = categoryBySlug[component.category];

  return (
    <Link
      href={`/components/${component.slug}`}
      className="group flex flex-col rounded-xl border border-border/60 bg-background transition-all duration-200 hover:border-ring/40 hover:shadow-md"
    >
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-border/40 bg-gradient-to-br from-muted/30 via-background to-muted/20 px-4">
        <div className="flex flex-col items-center gap-2 text-muted-foreground/50 transition-colors group-hover:text-muted-foreground/70">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          <span className="text-xs font-medium">{component.name}</span>
        </div>
        <span
          className={cn(
            "absolute right-2.5 top-2.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium",
            statusColors[component.status] ?? "bg-muted text-muted-foreground",
          )}
        >
          {component.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {component.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
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

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/40">
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              {component.stats.downloads.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {component.stats.likes}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground/60">
            v{component.version}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ComponentsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const filteredComponents = useMemo(() => {
    let result = [...registryCatalog];

    if (search.trim()) {
      const terms = search.toLowerCase();
      result = result.filter((c) => {
        const haystack = [c.name, c.slug, c.description, ...c.tags]
          .join(" ")
          .toLowerCase();
        return terms.split(/\s+/).every((term) => haystack.includes(term));
      });
    }

    if (selectedCategory !== "all") {
      result = result.filter((c) => c.category === selectedCategory);
    }

    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        break;
      case "downloads":
        result.sort((a, b) => b.stats.downloads - a.stats.downloads);
        break;
      default:
        result.sort((a, b) => b.stats.likes - a.stats.likes);
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: registryCatalog.length };
    for (const cat of registryCategories) {
      counts[cat.id] = registryCatalog.filter(
        (c) => c.category === cat.id,
      ).length;
    }
    return counts;
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {registryCatalog.length} Components
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Component Library
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Browse, search, and copy production-ready UI components for your
            next project.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search components..."
                className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Sort:</span>
              <div className="flex gap-1 rounded-lg border border-border bg-muted/30 p-0.5">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSortBy(option.value)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                      sortBy === option.value
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-background text-muted-foreground hover:text-foreground hover:border-ring/40",
              )}
            >
              All
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px]",
                  selectedCategory === "all"
                    ? "bg-primary-foreground/20"
                    : "bg-muted",
                )}
              >
                {categoryCounts.all}
              </span>
            </button>
            {registryCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-background text-muted-foreground hover:text-foreground hover:border-ring/40",
                )}
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px]",
                    selectedCategory === cat.id
                      ? "bg-primary-foreground/20"
                      : "bg-muted",
                  )}
                >
                  {categoryCounts[cat.id]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredComponents.length} of {registryCatalog.length}{" "}
          components
          {search && (
            <span>
              {" "}
              for &ldquo;
              <span className="font-medium text-foreground">{search}</span>
              &rdquo;
            </span>
          )}
        </div>

        {/* Components Grid */}
        {filteredComponents.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredComponents.map((component) => (
              <ComponentCard key={component.slug} component={component} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border/60 bg-muted/20 py-20">
            <svg
              className="h-12 w-12 text-muted-foreground/30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p className="mt-4 text-sm font-medium text-foreground">
              No components found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-sm font-medium text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Can&apos;t find what you need?{" "}
            <Link
              href="/docs"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              Read the docs
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
