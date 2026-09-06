"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { LAYOUT, FOCUS } from "@/constants/tokens";
import { navigationSections } from "@/constants/navigation";
import type { NavSection } from "@/types/navigation";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderActions } from "./HeaderActions";
import { MobileNavigation } from "./MobileNavigation";
import { SearchDialog } from "@/components/search/SearchDialog";

interface HeaderProps {
  className?: string;
  version?: string;
  userName?: string;
  userAvatar?: string;
  role?: "user" | "admin";
  sections?: NavSection[];
  onThemeToggle?: (theme: "light" | "dark" | "system") => void;
}

const PRIMARY_LINKS = [
  { label: "Components", href: "/components" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs" },
];

export function Header({
  className,
  version = "v2.0",
  userName = "User",
  userAvatar,
  role = "user",
  sections,
  onThemeToggle,
}: HeaderProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearchToggle = useCallback(() => setSearchOpen((p) => !p), []);
  const handleSearchClose = useCallback(() => setSearchOpen(false), []);
  const handleMobileOpen = useCallback(() => setMobileOpen(true), []);
  const handleMobileClose = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navSections = sections?.length ? sections : navigationSections;
  const isPrimaryActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        role="banner"
        className={cn(
          "sticky top-0 z-50 h-14 w-full border-b border-border/60 bg-background",
          className,
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-full w-full items-center gap-2",
            LAYOUT.maxWidth,
            LAYOUT.px,
          )}
        >
          <div className="flex min-w-0 items-center gap-1">
            <button
              type="button"
              onClick={handleMobileOpen}
              aria-label="Open navigation menu"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden",
                FOCUS.ring,
              )}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="4" x2="20" y1="7" y2="7" />
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="17" y2="17" />
              </svg>
            </button>
            <HeaderLogo version={version} />
          </div>

          <nav aria-label="Primary" className="ml-4 hidden items-center gap-1 xl:flex">
            {PRIMARY_LINKS.map((link) => {
              const active = isPrimaryActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
                    FOCUS.ring,
                    active
                      ? "bg-primary-soft text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <HeaderSearch onClick={handleSearchToggle} />
            <button
              type="button"
              onClick={handleSearchToggle}
              aria-label="Search"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden",
                FOCUS.ring,
              )}
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <HeaderActions
              userName={userName}
              userAvatar={userAvatar}
              role={role}
              onThemeToggle={onThemeToggle}
            />
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={handleSearchClose} />

      <MobileNavigation
        isOpen={mobileOpen}
        onClose={handleMobileClose}
        sections={navSections}
        userName={userName}
        role={role}
        onSearch={handleSearchToggle}
      />
    </>
  );
}
