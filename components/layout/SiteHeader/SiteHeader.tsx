"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";
import { SiteHeaderBrand } from "./SiteHeaderBrand";
import { SiteHeaderNavLinks, SiteHeaderNavDropdown } from "./SiteHeaderNav";
import {
  SiteHeaderSearch,
  SiteHeaderGithub,
  SiteHeaderDiscord,
  SiteHeaderNotifications,
  SiteHeaderLanguage,
  SiteHeaderTheme,
  SiteHeaderUser,
  SiteHeaderCTA,
} from "./SiteHeaderActions";
import { SiteHeaderMobileMenu } from "./SiteHeaderMobile";
import { SiteHeaderSearchOverlay } from "./SiteHeaderSearch";
import {
  useScrollDetection,
  useKeyboardShortcuts,
  useNavIndicator,
  useMobileMenu,
} from "./hooks";
import type { HeaderProps, NavItem } from "./types/header.types";

const primaryNav: NavItem[] = [
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/blocks" },
  { label: "Templates", href: "/templates" },
  { label: "Registry", href: "/registry" },
];

const secondaryNav: NavItem[] = [
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Community", href: "/community" },
];

export function SiteHeader({ navLinks, className }: HeaderProps) {
  const { scrolled } = useScrollDetection({ threshold: 4 });
  const [searchOpen, setSearchOpen] = useState(false);

  const { isMac } = useKeyboardShortcuts({
    onSearchToggle: () => setSearchOpen((prev) => !prev),
    onEscape: () => {
      setSearchOpen(false);
      closeMobileMenu();
    },
  });

  const {
    navRef,
    indicator,
    registerItem,
    updateIndicator,
    hideIndicator,
  } = useNavIndicator();

  const { isOpen: mobileMenuOpen, toggle: toggleMobileMenu, close: closeMobileMenu } = useMobileMenu();

  const links = navLinks?.length ? navLinks : primaryNav;

  const handleSearchToggle = useCallback(() => {
    setSearchOpen((prev) => !prev);
    closeMobileMenu();
  }, [closeMobileMenu]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full h-16",
          "backdrop-blur-xl",
          scrolled
            ? "bg-white/80 dark:bg-black/70 border-b border-zinc-800"
            : "bg-white/80 dark:bg-black/70 border-b border-zinc-800",
          "transition-all duration-200",
          "animate-fade-in-down",
          className
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <SiteHeaderBrand />

            <SiteHeaderNavLinks
              links={links}
              navRef={navRef}
              indicator={indicator}
              onHover={updateIndicator}
              onLeave={hideIndicator}
              registerItem={registerItem}
            />

            <SiteHeaderNavDropdown items={secondaryNav} />
          </div>

          <div className="flex items-center gap-2">
            <SiteHeaderSearch onClick={handleSearchToggle} isMac={isMac} />

            <SiteHeaderGithub />
            <SiteHeaderDiscord />
            <SiteHeaderNotifications count={3} />
            <SiteHeaderTheme />
            <SiteHeaderLanguage />
            <SiteHeaderUser isLoggedIn={false} />
            <SiteHeaderCTA />

            <button
              type="button"
              onClick={toggleMobileMenu}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full",
                "text-zinc-200 transition-all duration-200",
                "hover:bg-zinc-800/60 active:scale-95",
                "lg:hidden",
                mobileMenuOpen && "bg-zinc-800/60"
              )}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <SiteHeaderMobileMenu
        isOpen={mobileMenuOpen}
        links={links}
        onNavigate={closeMobileMenu}
        theme="light"
        onThemeToggle={() => {}}
      />

      <SiteHeaderSearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
