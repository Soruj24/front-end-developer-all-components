export const ANCHOR_LINKS_SOURCE = `"use client";

import { useState } from "react";
import { Hash, Link2 } from "lucide-react";

interface AnchorLink {
  label: string;
  href: string;
  level?: number;
}

interface AnchorLinksProps {
  links: AnchorLink[];
  variant?: "sidebar" | "pills" | "table";
  activeHref?: string;
}

export function AnchorLinks({ links, variant = "pills", activeHref = "" }: AnchorLinksProps) {
  const [active, setActive] = useState(activeHref || links[0]?.href || "");

  if (variant === "sidebar") {
    return (
      <nav className="flex w-48 flex-col gap-1 border-r border-border pr-4">
        {links.filter((link) => (link.level ?? 1) === 1).map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setActive(link.href)}
            className={\`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors \${
              active === link.href
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }\`}
          >
            <Hash className="h-3 w-3" />
            {link.label}
          </a>
        ))}
      </nav>
    );
  }

  if (variant === "table") {
    return (
      <div className="w-full overflow-hidden rounded-lg border border-border">
        <div className="border-b border-border bg-muted/30 px-4 py-2.5">
          <h3 className="text-sm font-semibold text-foreground">On This Page</h3>
        </div>
        <div className="flex flex-col">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={\`flex items-center gap-2 border-b border-border px-4 py-2 text-sm transition-colors last:border-0 hover:bg-muted/50 \${
                (link.level ?? 1) === 2 ? "pl-8" : ""
              } \${active === link.href ? "bg-primary/5 font-medium text-primary" : "text-muted-foreground"}\`}
            >
              {(link.level ?? 1) === 1 && <Hash className="h-3 w-3" />}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {links.filter((link) => (link.level ?? 1) === 1).map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={() => setActive(link.href)}
          className={\`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-all \${
            active === link.href
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }\`}
        >
          <Link2 className="h-3 w-3" />
          {link.label}
        </a>
      ))}
    </div>
  );
}`;

export const SIDEBAR_EXAMPLE = `<AnchorLinks
  variant="sidebar"
  links={[{ label: "Introduction", href: "#introduction" }]}
  activeHref="#introduction"
/>`;

export const PILLS_EXAMPLE = `<AnchorLinks variant="pills" links={links} />`;

export const TABLE_EXAMPLE = `<AnchorLinks variant="table" links={links} />`;

export const BREADCRUMB_EXAMPLE = `<nav className="flex items-center gap-1 text-sm">
  <a href="/docs" className="text-muted-foreground hover:text-foreground">Docs</a>
  <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
  <a href="/docs/components" className="text-muted-foreground hover:text-foreground">Components</a>
  <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
  <span className="font-medium text-foreground">Anchor Links</span>
</nav>`;