import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationBreadcrumbs: RegistryEntry = entry({
    id: "navigation-breadcrumbs",
    title: "Breadcrumbs",
    description: "Current location trail with muted separators and an aria-current page.",
    source: `import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

const crumbs = [
  { label: "Home", href: "#" },
  { label: "Products", href: "#" },
];

export default function NavigationBreadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {crumbs.map((crumb) => (
          <li key={crumb.label} className="flex items-center gap-1">
            <a
              href={crumb.href}
              className="rounded-md px-1.5 py-0.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              {crumb.label}
            </a>
            <ChevronRightIcon className="h-3.5 w-3.5 text-muted-foreground/50" aria-hidden="true" />
          </li>
        ))}
        <li aria-current="page">
          <span className="px-1.5 py-0.5 font-medium text-foreground">Shoes</span>
        </li>
      </ol>
    </nav>
  );
}`,
    });
