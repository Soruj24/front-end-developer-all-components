import type { Metadata } from "next";
import { getComponents, getCategories, getTotalDownloads } from "@/features/registry/server";
import { ComponentsExplorer } from "@/features/components";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Browse the component registry — production-ready, dependency-free components built with Next.js, React, and Tailwind CSS.",
};

export default async function ComponentsPage() {
  const [components, categories, totalDownloads] = await Promise.all([
    getComponents({ pageSize: 100 }),
    getCategories(),
    getTotalDownloads(),
  ]);

  return (
    <div className="flex flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Component Registry
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Production-ready, dependency-free components. Browse, copy, install, and
          customize every entry — each with its own documentation, source, props,
          and changelog.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span>
            <strong className="text-foreground">{components.length}</strong> components
          </span>
          <span>
            <strong className="text-foreground">{categories.length}</strong> categories
          </span>
          <span>
            <strong className="text-foreground">{totalDownloads.toLocaleString()}</strong>{" "}
            total downloads
          </span>
        </div>
      </header>

      <ComponentsExplorer components={components} />
    </div>
  );
}
