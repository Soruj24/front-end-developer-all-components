"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { ACCOUNT_NAV } from "../../constants/dashboard";

export function MobileAccountNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/account" ? pathname === "/account" : pathname.startsWith(href);

  const items = ACCOUNT_NAV.flatMap((group) => group.items);

  return (
    <nav
      aria-label="Account sections"
      className="sticky top-14 z-30 border-b border-border bg-background/80 backdrop-blur-xl lg:hidden"
    >
      <div className="flex gap-2 overflow-x-auto px-4 py-2.5 sm:px-6 [scrollbar-width:none]">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
