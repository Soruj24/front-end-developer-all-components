/**
 * Search index for the documentation search experience.
 *
 * Items are derived from `navigationSections` so the index never drifts from
 * the site's navigation, then enriched with curated sub-sections for popular
 * components, category shortcuts, and quick actions.
 */

import { navigationSections } from "@/constants/navigation";
import { fuzzyMatch, type FuzzyMatch } from "./fuzzy";

export interface DocItem {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryIcon: string;
  href: string;
  icon: string;
  keywords: string[];
  popular: boolean;
  badge?: "Page" | "Section" | "Category" | "Action";
}

const POPULAR_HREFS = new Set([
  "/buttons",
  "/cards",
  "/inputs",
  "/forms",
  "/table",
  "/pagination",
  "/timeline",
  "/badge",
  "/avatar",
  "/modal",
  "/dialog",
  "/drawer",
  "/popover",
  "/tooltip",
  "/toast",
  "/dropdown",
  "/accordion",
  "/carousel",
  "/command-menu",
  "/tabs",
  "/navigation",
  "/navbar",
  "/header",
  "/sidebar",
  "/footer",
]);

/** Turns a URL into loose keyword tokens, e.g. "/command-menu" → "command menu". */
function hrefKeywords(href: string): string[] {
  return [href.replace(/[^a-z0-9]+/g, " ")];
}

function buildItems(): DocItem[] {
  const items: DocItem[] = [];

  for (const section of navigationSections) {
    for (const link of section.links) {
      items.push({
        id: `page:${link.href}`,
        title: link.label,
        description: link.desc ?? `${section.title} · ${link.label}`,
        category: section.title,
        categoryIcon: section.icon ?? "▣",
        href: link.href,
        icon: link.icon ?? "›",
        keywords: [
          link.label.toLowerCase(),
          section.title.toLowerCase(),
          ...hrefKeywords(link.href),
        ],
        popular: POPULAR_HREFS.has(link.href),
        badge: "Page",
      });
    }
  }

  for (const section of navigationSections) {
    items.push({
      id: `category:${section.title}`,
      title: section.title,
      description: `${section.links.length} pages`,
      category: "Categories",
      categoryIcon: "✦",
      href: section.links[0]?.href ?? "/",
      icon: section.icon ?? "▣",
      keywords: [
        "category",
        "section",
        "browse",
        ...section.links.map((link) => link.label.toLowerCase()),
      ],
      popular: false,
      badge: "Category",
    });
  }

  const sectionsByHref = new Map(
    navigationSections
      .flatMap((section) => section.links)
      .map((link) => [link.href, link.label])
  );

  const SUB_SECTIONS: Array<{
    title: string;
    description: string;
    href: string;
    keywords: string[];
  }> = [
    { title: "Button Variants", description: "Primary, secondary, outline, ghost, destructive", href: "/buttons", keywords: ["button", "variants"] },
    { title: "Button Sizes", description: "Small, medium, large, and icon-only", href: "/buttons", keywords: ["button", "sizes"] },
    { title: "Button Loading", description: "Inline spinners that keep the layout stable", href: "/buttons", keywords: ["button", "loading", "spinner"] },
    { title: "Button Group", description: "Segmented controls sharing one rounded border", href: "/buttons", keywords: ["button", "group", "segmented"] },
    { title: "Button With Icons", description: "Icons before or after the label", href: "/buttons", keywords: ["button", "icons"] },
    { title: "Card Actions", description: "Interactive card with hover effects", href: "/cards", keywords: ["card", "actions", "hover"] },
    { title: "Card Pricing", description: "Pricing plans presented as cards", href: "/cards", keywords: ["card", "pricing", "plans"] },
    { title: "Card Blog", description: "Blog and profile card layouts", href: "/cards", keywords: ["card", "blog", "post"] },
    { title: "Input Password", description: "Password input with show/hide toggle", href: "/inputs", keywords: ["input", "password", "toggle"] },
    { title: "Input With Icon", description: "Leading icons anchored to the input edge", href: "/inputs", keywords: ["input", "icon", "search"] },
    { title: "Input Character Counter", description: "Live countdown toward the max length", href: "/inputs", keywords: ["input", "counter", "character"] },
    { title: "Textarea", description: "Multi-line text input", href: "/inputs", keywords: ["textarea", "input", "text"] },
    { title: "Switch Toggle", description: "On/off toggle switch", href: "/inputs", keywords: ["switch", "toggle", "input"] },
    { title: "Form Validation", description: "Inline validation states", href: "/forms", keywords: ["form", "validation", "error"] },
    { title: "Table Sorting", description: "Sortable data table", href: "/table", keywords: ["table", "sort", "data"] },
    { title: "Modal Interactive", description: "Configurable modal with focus trap", href: "/modal", keywords: ["modal", "dialog", "popup"] },
    { title: "Confirm Dialog", description: "Confirm, alert, and form dialogs", href: "/dialog", keywords: ["dialog", "confirm", "alert"] },
    { title: "Dropdown Menu", description: "Menu and select dropdowns", href: "/dropdown", keywords: ["dropdown", "menu", "select"] },
    { title: "Toast Notifications", description: "Success, error, and info toasts", href: "/toast", keywords: ["toast", "notification", "message"] },
    { title: "Tooltip Position", description: "Top, bottom, and rich tooltips", href: "/tooltip", keywords: ["tooltip", "hover", "hint"] },
    { title: "Accordion FAQ", description: "Single and multiple accordions", href: "/accordion", keywords: ["accordion", "faq", "collapse"] },
    { title: "Carousel Cards", description: "Image, card, and testimonial carousels", href: "/carousel", keywords: ["carousel", "slider", "gallery"] },
    { title: "Tabs Underline", description: "Underline, pills, and icon tabs", href: "/tabs", keywords: ["tabs", "tab", "pills"] },
    { title: "Command Palette", description: "Cmd+K palette with grouped actions", href: "/command-menu", keywords: ["command", "palette", "cmd"] },
    { title: "Avatar Status", description: "Presence dot on the avatar ring", href: "/avatar", keywords: ["avatar", "status", "presence"] },
    { title: "Badge Variants", description: "Tinted, solid, and outline badges", href: "/badge", keywords: ["badge", "status", "tag"] },
  ];

  const categoryByHref = (href: string): string => {
    for (const section of navigationSections) {
      if (section.links.some((link) => link.href === href)) return section.title;
    }
    return "Components";
  };

  for (const sub of SUB_SECTIONS) {
    const parent = sectionsByHref.get(sub.href);
    items.push({
      id: `section:${sub.title.toLowerCase().replace(/\s+/g, "-")}`,
      title: sub.title,
      description: sub.description,
      category: categoryByHref(sub.href),
      categoryIcon:
        navigationSections.find((s) => s.title === categoryByHref(sub.href))
          ?.icon ?? "▣",
      href: sub.href,
      icon: parent ?? "›",
      keywords: [sub.title.toLowerCase(), ...sub.keywords, ...hrefKeywords(sub.href)],
      popular: true,
      badge: "Section",
    });
  }

  items.push(
    {
      id: "action:toggle-theme",
      title: "Toggle dark mode",
      description: "Switch between light and dark themes",
      href: "",
      icon: "◐",
      category: "Actions",
      categoryIcon: "⚡",
      keywords: ["theme", "dark", "light", "mode", "appearance"],
      popular: false,
      badge: "Action",
    },
    {
      id: "action:copy-url",
      title: "Copy current URL",
      description: "Copy this page's link to the clipboard",
      href: "",
      icon: "⧉",
      category: "Actions",
      categoryIcon: "⚡",
      keywords: ["copy", "url", "link", "share", "clipboard"],
      popular: false,
      badge: "Action",
    },
    {
      id: "action:print",
      title: "Print this page",
      description: "Open the browser print dialog",
      href: "",
      icon: "⎙",
      category: "Actions",
      categoryIcon: "⚡",
      keywords: ["print", "export", "pdf"],
      popular: false,
      badge: "Action",
    }
  );

  return items;
}

export const docItems: DocItem[] = buildItems();

export interface DocCategory {
  title: string;
  icon: string;
  description: string;
  count: number;
}

/** Categories surfaced on the search dialog's home view. */
export const docCategories: DocCategory[] = navigationSections.map(
  (section) => ({
    title: section.title,
    icon: section.icon ?? "▣",
    description: section.description ?? "",
    count: section.links.length,
  })
);

/** Curated, ordered list of the most popular component pages. */
const POPULAR_ORDER = [
  "/buttons",
  "/inputs",
  "/cards",
  "/forms",
  "/modal",
  "/dialog",
  "/dropdown",
  "/accordion",
  "/table",
  "/tabs",
  "/tooltip",
  "/toast",
  "/command-menu",
  "/avatar",
  "/badge",
  "/navbar",
];

export function getPopularComponents(
  items: DocItem[] = docItems
): DocItem[] {
  const byHref = new Map(
    items.filter((item) => item.badge === "Page").map((item) => [item.href, item])
  );
  return POPULAR_ORDER.map((href) => byHref.get(href)).filter(
    (item): item is DocItem => Boolean(item)
  );
}

export interface SearchResult {
  item: DocItem;
  score: number;
  titleMatch: FuzzyMatch;
}

export interface SearchGroup {
  category: string;
  icon: string;
  results: SearchResult[];
}

/**
 * Fuzzy-search the documentation index. Results are scored across the item
 * title, keywords, category, and URL, then grouped by category and sorted.
 */
export function searchDocs(
  items: DocItem[],
  query: string,
  limit = 30
): SearchGroup[] {
  const q = query.trim();
  if (!q) return [];

  const results: SearchResult[] = [];
  for (const item of items) {
    const titleMatch = fuzzyMatch(q, item.title);
    let score = titleMatch.score;

    let matched = titleMatch.score !== -Infinity;

    const keywordMatch = fuzzyMatch(
      q,
      [item.keywords.join(" "), item.category, item.href].join(" ")
    );
    if (keywordMatch.score !== -Infinity) {
      matched = true;
      score =
        titleMatch.score !== -Infinity
          ? Math.max(score, keywordMatch.score * 0.45 + titleMatch.score)
          : keywordMatch.score * 0.6;
    }

    if (!matched) continue;
    results.push({
      item,
      score,
      titleMatch:
        titleMatch.score === -Infinity
          ? { score: 0, indices: [] }
          : titleMatch,
    });
  }

  results.sort((a, b) => b.score - a.score);
  const top = results.slice(0, limit);

  const groups = new Map<string, SearchGroup>();
  for (const result of top) {
    const key = result.item.category;
    if (!groups.has(key)) {
      groups.set(key, {
        category: key,
        icon: result.item.categoryIcon,
        results: [],
      });
    }
    groups.get(key)?.results.push(result);
  }

  return Array.from(groups.values());
}
