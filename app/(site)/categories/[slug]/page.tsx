import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug as getDbCategoryBySlug,
  getComponents as getDbComponents,
  countComponents,
} from "@/features/registry/server";
import {
  registryCategories,
  registryCatalog,
} from "@/features/registry";
import { ComponentGrid, ComponentCard } from "@/features/components";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dbCategory = await getDbCategoryBySlug(slug);
  const staticCategory = registryCategories.find((c) => c.id === slug);
  const category = dbCategory ?? staticCategory;
  if (!category) return { title: "Not Found" };
  return {
    title: `${category.label} components`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbCategory = await getDbCategoryBySlug(slug);
  const staticCategory = registryCategories.find((c) => c.id === slug);
  const category = dbCategory ?? staticCategory;
  if (!category) notFound();

  const dbComponents = await getDbComponents({ category: slug, pageSize: 100 });
  const components = dbComponents.length
    ? dbComponents
    : registryCatalog.filter((c) => c.category === slug);
  const count = dbComponents.length || components.length;

  return (
    <div className="flex flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/40 text-lg text-foreground">
            <span aria-hidden="true">{category.icon}</span>
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {category.label} components
          </h1>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {category.description}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span>
            <strong className="text-foreground">{count}</strong> components
          </span>
        </div>
      </header>

      {components.length > 0 ? (
        <ComponentGrid>
          {components.map((component) => (
            <ComponentCard key={component.slug} component={component} />
          ))}
        </ComponentGrid>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-20 text-center">
          <p className="text-sm font-medium text-foreground">No components in this category</p>
          <Link
            href="/components"
            className="text-sm text-primary hover:underline dark:text-blue-400"
          >
            Browse all components
          </Link>
        </div>
      )}
    </div>
  );
}
