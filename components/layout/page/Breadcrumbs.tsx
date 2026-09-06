"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { FOCUS, TEXT } from "@/constants/tokens";
import { navigationSections } from "@/constants/navigation";

function prettify(segment: string): string {
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();

  const crumbs = useMemo(() => {
    if (!pathname || pathname === "/") return [];
    const labelByHref = new Map<string, string>();
    for (const section of navigationSections) {
      for (const link of section.links) {
        labelByHref.set(link.href, link.label);
        for (const child of link.children ?? []) {
          labelByHref.set(child.href, child.label);
        }
      }
    }
    const segments = pathname.split("/").filter(Boolean);
    const items: Array<{ label: string; href: string }> = [];
    let acc = "";
    for (const segment of segments) {
      if (segment.startsWith("(") && segment.endsWith(")")) continue;
      acc += `/${segment}`;
      items.push({ label: labelByHref.get(acc) ?? prettify(segment), href: acc });
    }
    return items;
  }, [pathname]);

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex min-w-0 flex-wrap items-center gap-1.5">
        <li className="flex items-center">
          <Link
            href="/"
            className={cn(
              "rounded text-muted-foreground transition-colors hover:text-foreground",
              TEXT.small,
              FOCUS.ring,
            )}
          >
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex min-w-0 items-center gap-1.5">
              <span aria-hidden="true" className="select-none text-border">
                /
              </span>
              {isLast ? (
                <span aria-current="page" className={cn("truncate text-foreground", TEXT.small)}>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={cn(
                    "truncate rounded text-muted-foreground transition-colors hover:text-foreground",
                    TEXT.small,
                    FOCUS.ring,
                  )}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
