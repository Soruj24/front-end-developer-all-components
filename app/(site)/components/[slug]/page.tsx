import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getComponentBySlug,
  getAllComponentSlugs,
  getComponents,
} from "@/features/registry/server";
import { ComponentDetail } from "@/features/components";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllComponentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = await getComponentBySlug(slug);
  if (!component) return { title: "Not Found" };
  return {
    title: component.name,
    description: component.description,
  };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = await getComponentBySlug(slug);
  if (!component) notFound();

  const sameCategory = await getComponents({
    category: component.category,
    pageSize: 4,
  });
  const related = sameCategory.filter((item) => item.slug !== component.slug).slice(0, 3);

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        <ComponentDetail component={component} related={related} />
      </div>
    </div>
  );
}
