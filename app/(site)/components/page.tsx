"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import { registryCategories } from "@/features/registry";
import { registryCatalog } from "@/features/registry/data";
import { GalleryCard } from "./components/GalleryCard";
import { GalleryToolbar, type SortOption } from "./components/GalleryToolbar";

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

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
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

        <div className="mb-6">
          <GalleryToolbar
            search={search}
            onSearchChange={setSearch}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            categoryCounts={categoryCounts}
          />
        </div>

        <p role="status" aria-live="polite" className="mb-4 text-sm text-muted-foreground">
          Showing {filteredComponents.length} of {registryCatalog.length}{" "}
          components
          {search.trim() && (
            <>
              {" "}for &ldquo;
              <span className="font-medium text-foreground">{search.trim()}</span>
              &rdquo;
            </>
          )}
        </p>

        {filteredComponents.length > 0 ? (
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredComponents.map((component) => (
              <GalleryCard key={component.slug} component={component} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={
              <svg
                className="h-full w-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            }
            title="No components found"
            description="Try adjusting your search or filter criteria."
            action={
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Clear filters
              </button>
            }
          />
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Can&apos;t find what you need?{" "}
            <Link
              href="/docs"
              className="rounded font-medium text-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Read the docs
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
