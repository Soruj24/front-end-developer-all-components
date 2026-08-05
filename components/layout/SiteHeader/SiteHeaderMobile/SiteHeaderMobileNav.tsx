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
              ? "bg-zinc-800/60 text-zinc-200"
              : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
          )}
          aria-current={isActive(link.href) ? "page" : undefined}
        >
          {link.label}
          {link.badge && (
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5",
                "text-[10px] font-semibold uppercase",
                link.badge === "new" && "bg-blue-500/10 text-blue-400",
                link.badge === "beta" && "bg-amber-500/10 text-amber-400",
                link.badge === "pro" && "bg-purple-500/10 text-purple-400"
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
