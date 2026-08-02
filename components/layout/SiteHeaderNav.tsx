"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { useActivePath } from "@/hooks";

/** Desktop primary navigation rendered inside the site header. */
export function SiteHeaderNav({
  links,
}: {
  links?: { label: string; href: string }[];
}) {
  const isActive = useActivePath();
  const items = links ?? siteConfig.navLinks;

  return (
    <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
      {items.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.label}
            href={link.href}
               className={cn(
              "group relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-[color,background-color,transform] duration-200 ease-out active:scale-[0.97]",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
            <span
              className={cn(
                "absolute inset-x-3.5 -bottom-px h-[2px] origin-center rounded-full bg-accent transition-transform duration-300 ease-out",
                active ? "scale-x-100" : "scale-x-0"
              )}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
}
