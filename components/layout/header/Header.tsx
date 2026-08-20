"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import {
  LAYOUT,
  BORDER,
  BG,
  BACKDROP,
  TRANSITION,
  Z,
  INTERACTIVE,
  FOCUS,
} from "@/constants/tokens";
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
  onThemeToggle?: (theme: "light" | "dark" | "system") => void;
}

export function Header({
  className,
  version = "v2.0",
  userName = "User",
  userAvatar,
  role = "user",
  onThemeToggle,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchToggle = useCallback(() => setSearchOpen((p) => !p), []);
  const handleSearchClose = useCallback(() => setSearchOpen(false), []);
  const handleMobileMenuToggle = useCallback(
    () => setMobileMenuOpen((p) => !p),
    [],
  );
  const handleMobileMenuClose = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((p) => !p);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        role="banner"
        className={cn(
          "sticky top-0 w-full",
          Z.chrome,
          `${LAYOUT.headerHeight} flex items-center`,
          BORDER.default,
          `${TRANSITION.colors} duration-200`,
          scrolled
            ? `${BG.headerScrolled} ${BACKDROP.heavy}`
            : `${BG.headerIdle} ${BACKDROP.medium} ${BORDER.transparent}`,
          className,
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-full w-full items-center justify-between gap-4",
            LAYOUT.maxWidth,
            LAYOUT.px,
          )}
        >
          <div className="flex items-center gap-4">
            <HeaderLogo version={version} />
          </div>

          <div className="flex items-center gap-2">
            <HeaderSearch onClick={handleSearchToggle} />

            <div className="hidden lg:block">
              <HeaderActions
                userName={userName}
                userAvatar={userAvatar}
                role={role}
                onThemeToggle={onThemeToggle}
              />
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <button
                type="button"
                onClick={handleSearchToggle}
                className={cn(INTERACTIVE.iconButton, FOCUS.ring)}
                aria-label="Search"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleMobileMenuToggle}
                className={cn(INTERACTIVE.iconButton, FOCUS.ring)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={handleSearchClose} />

      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        role={role}
        userName={userName}
      />
    </>
  );
}
