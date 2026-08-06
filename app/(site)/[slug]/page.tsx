import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getComponentBySlug as getDbComponentBySlug,
  getComponents as getDbComponents,
} from "@/features/registry/server";
import {
  getComponentBySlug as getStaticComponentBySlug,
  registryCatalog,
} from "@/features/registry";
import { ComponentDetail } from "@/features/components";

export const dynamicParams = true;

/** Generic DB-driven showcase fallback for components with no bespoke demo page. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = (await getDbComponentBySlug(slug)) ?? getStaticComponentBySlug(slug);
  if (!component) return { title: "Not Found" };
  return {
    title: component.name,
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

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        <ComponentDetail component={component} related={related} />
      </div>
    </div>
  );
}
