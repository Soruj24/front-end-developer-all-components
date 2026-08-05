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
  { label: "AI", href: "/ai", badge: "new" },
  { label: "Registry", href: "/registry" },
  { label: "Playground", href: "/playground" },
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

  const links = navLinks || primaryNav;

  const handleSearchToggle = useCallback(() => {
    setSearchOpen((prev) => !prev);
    closeMobileMenu();
  }, [closeMobileMenu]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full",
          "transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/80 shadow-xs backdrop-blur-xl"
            : "border-b border-border/60 bg-background/60 backdrop-blur",
          "animate-fade-in-down",
          className
        )}
      >
        <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-6">
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

          <div className="flex items-center gap-1 sm:gap-1.5">
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
                "text-foreground transition-all duration-200",
                "hover:bg-muted active:scale-95",
                "lg:hidden",
                mobileMenuOpen && "bg-muted"
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
