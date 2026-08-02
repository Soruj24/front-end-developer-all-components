import type { RegistryComponent } from "../types/component";

/** Total downloads across the whole catalog. */
export function totalDownloads(components: RegistryComponent[]): number {
  return components.reduce((sum, c) => sum + c.stats.downloads, 0);
}

/** Most-liked components, for the "popular" strip. */
export function topComponents(
  components: RegistryComponent[],
  limit = 6
): RegistryComponent[] {
  return [...components]
    .sort((a, b) => b.stats.likes - a.stats.likes)
    .slice(0, limit);
}

/** Component count per category id. */
export function countsByCategory(components: RegistryComponent[]): Record<string, number> {
  return components.reduce<Record<string, number>>((acc, c) => {
    acc[c.category] = (acc[c.category] ?? 0) + 1;
    return acc;
  }, {});
}

/** Unique tags across the catalog, sorted by usage. */
export function tagCounts(components: RegistryComponent[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const component of components) {
    for (const tag of component.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return counts;
}
