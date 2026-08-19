import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getComponentBySlug as getDbComponentBySlug,
  getComponents as getDbComponents,
} from "@/features/registry/server";
import {
  getComponentBySlug as getStaticComponentBySlug,
  registryCatalog,
  categoryBySlug,
} from "@/features/registry";
import { ComponentDetail } from "@/features/components";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = (await getDbComponentBySlug(slug)) ?? getStaticComponentBySlug(slug);
  if (!component) return { title: "Not Found" };
  return {
    title: `${component.name} — Component Registry`,
    description: component.description,
  };
}

export default async function ShowcaseFallbackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = (await getDbComponentBySlug(slug)) ?? getStaticComponentBySlug(slug);
  if (!component) notFound();

  const dbSameCategory = await getDbComponents({ category: component.category, pageSize: 4 });
  const sameCategory = dbSameCategory.length
    ? dbSameCategory
    : registryCatalog.filter((c) => c.category === component.category).slice(0, 4);
  const related = sameCategory.filter((item) => item.slug !== component.slug).slice(0, 3);

  const category = categoryBySlug[component.category];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/components" className="transition-colors hover:text-foreground">
            Registry
          </Link>
          <span className="text-muted-foreground/50">/</span>
          {category && (
            <>
              <Link
                href={`/components?category=${component.category}`}
                className="transition-colors hover:text-foreground"
              >
                {category.label}
              </Link>
              <span className="text-muted-foreground/50">/</span>
            </>
          )}
          <span className="font-medium text-foreground">{component.name}</span>
        </nav>

        <ComponentDetail component={component} related={related} />
      </div>
    </div>
  );
}
