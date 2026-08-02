import { navigationSections } from "@/constants/navigation";

/** Converts heading text into an anchor-safe id. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface DocNavItem {
  label: string;
  href: string;
  description?: string;
  category: string;
  categoryHref: string;
}

export interface DocPage extends DocNavItem {
  prev?: DocNavItem;
  next?: DocNavItem;
}

const flatPages: DocNavItem[] = [];

for (const section of navigationSections) {
  const sectionLinks = section.links.filter((link) => link.href !== "/");
  const sectionHref = sectionLinks[0]?.href ?? section.links[0]?.href ?? "/";
  for (const link of sectionLinks) {
    flatPages.push({
      label: link.label,
      href: link.href,
      description: link.desc,
      category: section.title,
      categoryHref: sectionHref,
    });
  }
}

/** Resolves navigation metadata (breadcrumb, prev/next) for a pathname. */
export function findDocPage(pathname: string): DocPage | null {
  const index = flatPages.findIndex((page) => page.href === pathname);
  if (index === -1) return null;
  const page = flatPages[index];
  return {
    ...page,
    prev: index > 0 ? flatPages[index - 1] : undefined,
    next: index < flatPages.length - 1 ? flatPages[index + 1] : undefined,
  };
}
