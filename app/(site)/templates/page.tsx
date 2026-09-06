"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import EmptyState from "@/components/ui/EmptyState";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "./templates-data";
import { TemplateGalleryCard } from "./components/TemplateGalleryCard";

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const terms = search.trim().toLowerCase();
    return TEMPLATES.filter((t) => {
      const matchesCategory = category === "All" || t.category === category;
      if (!matchesCategory) return false;
      if (!terms) return true;
      const haystack = [t.title, t.description, t.category].join(" ").toLowerCase();
      return terms.split(/\s+/).every((term) => haystack.includes(term));
    });
  }, [search, category]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {TEMPLATES.length} Templates
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Templates
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Start with a complete, working template and customize it to your needs.
            Every template below opens a live preview.
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4">
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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates…"
              aria-label="Search templates"
              className={cn(
                "h-11 w-full rounded-lg border border-border bg-background pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground transition-colors hover:border-muted-foreground/30 lg:h-10",
                FOCUS.ringInput,
              )}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
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

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {TEMPLATE_CATEGORIES.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex min-h-[44px] items-center rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors sm:min-h-0",
                    FOCUS.ring,
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border/60 bg-background text-muted-foreground hover:border-ring/40 hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <p role="status" aria-live="polite" className="mb-4 text-sm text-muted-foreground">
          Showing {filtered.length} of {TEMPLATES.length} templates
          {search.trim() && (
            <>
              {" "}for &ldquo;
              <span className="font-medium text-foreground">{search.trim()}</span>
              &rdquo;
            </>
          )}
        </p>

        {filtered.length > 0 ? (
          <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((template) => (
              <TemplateGalleryCard key={template.title} template={template} />
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
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
              </svg>
            }
            title="No templates found"
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
            New to templates?{" "}
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
