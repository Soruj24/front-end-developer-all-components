import type { NavLink, NavSection } from "@/types/navigation";
import { navigationSections } from "@/constants/navigation";

/**
 * Returns the navigation sections whose links match a search query.
 * Sections with no matching links are dropped.
 */
export function filterNavigationSections(
  sections: NavSection[],
  query: string
): NavSection[] {
  const q = query.trim().toLowerCase();
  if (!q) return sections;

  const filterLink = (link: NavLink): NavLink | null => {
    const selfMatches =
      link.label.toLowerCase().includes(q) || link.href.toLowerCase().includes(q);
    const children =
      link.children
        ?.map(filterLink)
        .filter((child): child is NavLink => child !== null) ?? [];

    if (!selfMatches && children.length === 0) return null;
    return { ...link, children: children.length > 0 ? children : undefined };
  };

  return sections
    .map((section) => ({
      ...section,
      links: section.links
        .map(filterLink)
        .filter((link): link is NavLink => link !== null),
    }))
    .filter((section) => section.links.length > 0);
}

/** Shape consumed by the home page category grid. */
export interface HomeCategory {
  title: string;
  description: string;
  links: NavLink[];
}

/**
 * Derives the home page categories from the canonical navigation tree.
 * The sidebar "Home" entry is intentionally excluded from the landing grid.
 */
export function getHomeCategories(): HomeCategory[] {
  return navigationSections
    .filter((section) => section.links.some((link) => link.href !== "/"))
    .map((section) => ({
      title: section.title,
      description: section.description ?? "",
      links: section.links
        .filter((link) => link.href !== "/")
        .map(({ label, href, desc }) => ({ label, href, desc })),
    }));
}
