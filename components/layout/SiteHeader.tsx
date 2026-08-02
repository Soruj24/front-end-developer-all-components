"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { Kbd } from "@/features/design";
import { SiteHeaderNav } from "./SiteHeaderNav";
import { SiteHeaderMobileMenu } from "./SiteHeaderMobileMenu";
import { SiteHeaderSearch } from "./SiteHeaderSearch";
import { ThemeToggle } from "./ThemeToggle";
import { GithubIcon, CommandIcon, MenuIcon, SearchIcon, CloseIcon } from "./icons";

/** Global site header: glass brand bar, primary nav, search, GitHub, theme and mobile menu. */
export function SiteHeader({
  navLinks,
}: {
  navLinks?: { label: string; href: string }[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsMac(navigator.platform.toUpperCase().includes("MAC"));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setMenuOpen(false);
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((open) => !open);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 h-14 w-full border-b transition-[box-shadow,border-color,background-color] duration-300 animate-fade-in-down",
          scrolled ? "border-border bg-background/80 shadow-xs backdrop-blur-xl" : "border-border/60 bg-background/60 backdrop-blur",
        )}
      >
          <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-6">
            <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Go to home">
              <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-[11px] font-bold text-accent-foreground shadow-sm transition-transform duration-300 group-hover:scale-105 animate-logo-glow">
                {siteConfig.shortName}
              </span>
              <span className="hidden text-[15px] font-semibold tracking-tight text-foreground sm:inline">
                {siteConfig.name}
              </span>
            </Link>
            <SiteHeaderNav links={navLinks} />
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => {
                setSearchOpen(true);
                setMenuOpen(false);
              }}
              className="group hidden h-9 w-44 items-center gap-2.5 rounded-full border border-border bg-muted/40 px-3 text-left text-[13px] text-muted-foreground transition-all duration-200 hover:border-ring/60 hover:bg-muted/60 hover:text-foreground active:scale-[0.98] sm:flex"
              aria-label="Search"
            >
              <SearchIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1 truncate">Search...</span>
              <Kbd className="shrink-0">
                {isMac ? (
                  <>
                    <CommandIcon className="h-2.5 w-2.5" />
                    K
                  </>
                ) : (
                  <>Ctrl K</>
                )}
              </Kbd>
            </button>

            <button
              type="button"
              onClick={() => {
                setSearchOpen(true);
                setMenuOpen(false);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-200 ease-out hover:bg-muted hover:text-foreground active:scale-95 sm:hidden"
              aria-label="Open search"
            >
              <SearchIcon className="h-4 w-4" />
            </button>

            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-200 ease-out hover:bg-muted hover:text-foreground active:scale-95 sm:flex"
              aria-label="GitHub repository"
            >
              <GithubIcon className="h-[17px] w-[17px]" />
            </Link>

            <ThemeToggle />

            <Link
              href={siteConfig.getStartedHref}
              className="hidden h-9 items-center rounded-full bg-foreground px-4 text-[13px] font-medium text-background shadow-sm transition-all hover:shadow-md hover:opacity-90 active:scale-[0.98] lg:inline-flex"
            >
              Get Started
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-[background-color,transform] duration-200 ease-out hover:bg-muted active:scale-95 lg:hidden",
                menuOpen && "bg-muted"
              )}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <CloseIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <SiteHeaderMobileMenu open={menuOpen} onNavigate={closeMenu} links={navLinks} />
      <SiteHeaderSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
