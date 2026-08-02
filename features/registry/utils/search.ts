import type { RegistryComponent } from "../types/component";

export interface ComponentFilter {
  query: string;
  category: string;
  tag: string;
  sort: string;
}

export const emptyFilter: ComponentFilter = {
  query: "",
  category: "all",
  tag: "all",
  sort: "popular",
};

/** Filters the catalog by query, category and tag, then sorts. */
export function filterComponents(
  components: RegistryComponent[],
  filter: ComponentFilter
): RegistryComponent[] {
  const terms = filter.query.trim().toLowerCase();
  const byQuery = terms ? components.filter((c) => matchesQuery(c, terms)) : components;
  const byCategory =
    filter.category === "all"
      ? byQuery
      : byQuery.filter((c) => c.category === filter.category);
  const byTag =
    filter.tag === "all" ? byCategory : byCategory.filter((c) => c.tags.includes(filter.tag));
  return [...byTag].sort(bySort(filter.sort));
}

export function matchesQuery(component: RegistryComponent, terms: string): boolean {
  const haystack = [
    component.name,
    component.slug,
    component.description,
    component.category,
    ...component.tags,
  ]
    .join(" ")
    .toLowerCase();
  return terms.split(/\s+/).every((term) => haystack.includes(term));
}

export function bySort(sort: string): (a: RegistryComponent, b: RegistryComponent) => number {
  return (a, b) => {
    switch (sort) {
      case "name":
        return a.name.localeCompare(b.name);
      case "newest":
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      case "downloads":
        return b.stats.downloads - a.stats.downloads;
      default:
        return b.stats.likes - a.stats.likes;
    }
  };
}
