import type { RegistryComponent } from "../types/component";
import { categoryBySlug } from "../constants";

/** Slim, wire-safe shape for list endpoints. */
export function toSummary(component: RegistryComponent) {
  return {
    slug: component.slug,
    name: component.name,
    description: component.description,
    category: component.category,
    categoryLabel: categoryBySlug[component.category]?.label ?? component.category,
    tags: component.tags,
    status: component.status,
    version: component.version,
    author: component.author,
    license: component.license,
    updatedAt: component.updatedAt,
    stats: component.stats,
    cli: component.cli,
  };
}

/** Full, wire-safe shape for the single-component endpoint. */
export function toDetail(component: RegistryComponent) {
  return {
    slug: component.slug,
    name: component.name,
    description: component.description,
    longDescription: component.longDescription,
    category: component.category,
    categoryLabel: categoryBySlug[component.category]?.label ?? component.category,
    tags: component.tags,
    status: component.status,
    author: component.author,
    license: component.license,
    version: component.version,
    createdAt: component.createdAt,
    updatedAt: component.updatedAt,
    stats: component.stats,
    dependencies: component.dependencies,
    files: component.files,
    variants: component.variants,
    sizes: component.sizes,
    features: component.features,
    tailwindClasses: component.tailwindClasses,
    props: component.props,
    releases: component.releases,
    install: component.install,
    cli: component.cli,
    source: component.source,
  };
}

export function paginate<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
