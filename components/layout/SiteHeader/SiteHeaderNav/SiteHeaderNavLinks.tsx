"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { SiteHeaderNavIndicator } from "./SiteHeaderNavIndicator";
import type { NavItem, NavIndicatorStyle } from "../types/header.types";

interface SiteHeaderNavLinksProps {
  links: NavItem[];
  navRef: React.RefObject<HTMLDivElement | null>;
  indicator: NavIndicatorStyle;
  onHover: (key: string) => void;
  onLeave: () => void;
  registerItem: (key: string, element: HTMLAnchorElement | null) => void;
  className?: string;
}

export function SiteHeaderNavLinks({
  links,
  navRef,
  indicator,
  onHover,
  onLeave,
  registerItem,
  className,
}: SiteHeaderNavLinksProps) {
  const pathname = usePathname();

  const isActive = useCallback(
    (href: string) => pathname === href || pathname.startsWith(href + "/"),
    [pathname]
  );

  return (
    <nav
      ref={navRef}
      className={cn("relative hidden items-center gap-1 lg:flex", className)}
      aria-label="Primary navigation"
      onMouseLeave={onLeave}
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          ref={(el) => registerItem(link.href, el)}
          onMouseEnter={() => onHover(link.href)}
          className={cn(
            "relative px-3 py-2 text-[13px] font-medium rounded-lg",
            "transition-colors duration-200",
            isActive(link.href)
              ? "text-zinc-200"
              : "text-zinc-400 hover:text-zinc-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2"
          )}
          aria-current={isActive(link.href) ? "page" : undefined}
        >
          {link.label}
          {link.badge && (
            <span
              className={cn(
                "ml-1.5 inline-flex items-center rounded-full px-1.5 py-0.5",
                "text-[10px] font-semibold uppercase leading-none",
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
      <SiteHeaderNavIndicator indicator={indicator} />
    </nav>
  );
}
