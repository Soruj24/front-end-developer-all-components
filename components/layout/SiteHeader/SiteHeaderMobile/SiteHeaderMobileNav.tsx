"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { NavItem } from "../types/header.types";

interface SiteHeaderMobileNavProps {
  links: NavItem[];
  onNavigate: () => void;
  className?: string;
}

export function SiteHeaderMobileNav({
  links,
  onNavigate,
  className,
}: SiteHeaderMobileNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className={cn("flex flex-col gap-1", className)} aria-label="Mobile navigation">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5",
            "text-[14px] font-medium transition-colors",
            isActive(link.href)
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-current={isActive(link.href) ? "page" : undefined}
        >
          {link.label}
          {link.badge && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5",
                "text-[10px] font-semibold uppercase",
                link.badge === "new" && "bg-primary/10 text-primary",
                link.badge === "beta" && "bg-warning/10 text-warning",
                link.badge === "pro" && "bg-info/10 text-info"
              )}
            >
              {link.badge}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
