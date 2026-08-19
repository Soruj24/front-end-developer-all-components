export const BREADCRUMB_SOURCE = `"use client";

import type { ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

interface BreadcrumbBarProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  variant?: "default" | "pill" | "muted";
  compact?: boolean;
}

export function BreadcrumbBar({
  items,
  separator = "/",
  variant = "default",
  compact = false,
}: BreadcrumbBarProps) {
  const isPill = variant === "pill";
  const isMuted = variant === "muted";

  return (
    <nav className={"flex items-center " + (compact ? "gap-1 text-xs" : "gap-1.5 text-sm")}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className={"px-0.5 " + (isPill ? "text-muted-foreground/50" : "text-muted-foreground")}>
                {separator}
              </span>
            )}
            {item.href && !isLast ? (
              <a
                href={item.href}
                className={
                  "flex items-center gap-1 rounded transition-colors " +
                  (isPill
                    ? "px-2 py-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    : isMuted
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {item.icon}
                {item.label}
              </a>
            ) : (
              <span
                className={
                  "flex items-center gap-1 " +
                  (isLast ? "font-medium text-foreground" : "text-muted-foreground") +
                  (isPill && isLast ? " rounded bg-muted px-2 py-0.5" : "")
                }
              >
                {item.icon}
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}`;

export const ICONS_EXAMPLE = `<BreadcrumbBar
  items={[
    { label: "Home", href: "/", icon: <Home className="h-3.5 w-3.5" /> },
    { label: "Documents", href: "/docs", icon: <Folder className="h-3.5 w-3.5" /> },
    { label: "Report.pdf", icon: <FileText className="h-3.5 w-3.5" /> },
  ]}
/>`;

export const SEPARATORS_EXAMPLE = `const separators = [
  { label: "Slash", sep: "/" },
  { label: "Chevron", sep: <ChevronRight className="h-3.5 w-3.5" /> },
  { label: "Arrow", sep: "→" },
  { label: "Dot", sep: "•" },
  { label: "Pipe", sep: "|" },
];

{separators.map((item) => (
  <BreadcrumbBar key={item.label} items={items} separator={item.sep} />
))}`;

export const DEEP_EXAMPLE = `<BreadcrumbBar
  items={[
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Website", href: "/projects/website" },
    { label: "Assets", href: "/projects/website/assets" },
    { label: "Images" },
  ]}
/>`;

export const PILL_EXAMPLE = `<BreadcrumbBar
  items={[
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings" },
  ]}
  variant="pill"
/>`;

export const COMPACT_EXAMPLE = `<BreadcrumbBar
  items={[
    { label: "Home", href: "/" },
    { label: "Settings", href: "/settings" },
    { label: "Account" },
  ]}
  compact
/>`;

export const OVERFLOW_EXAMPLE = `<BreadcrumbBar
  items={[
    { label: "Home", href: "/" },
    { label: "...", href: "#" },
    { label: "Deeply", href: "/a/b/c/deeply" },
    { label: "Nested Page" },
  ]}
/>`;
