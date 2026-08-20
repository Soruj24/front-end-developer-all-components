"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderActions } from "./HeaderActions";
import { MobileNavigation } from "./MobileNavigation";

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
    document.body.style.overflow =
      searchOpen || mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen, mobileMenuOpen]);

  return (
    <>
      <header
        role="banner"
        className={cn(
          "sticky top-0 z-50 w-full",
          "border-b transition-colors duration-200",
          scrolled
            ? "border-border/60 bg-background/80 backdrop-blur-xl"
            : "border-transparent bg-background/50 backdrop-blur-md",
          className,
        )}
      >
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <HeaderLogo version={version} />
          </div>

          <div className="flex items-center gap-2">
            <HeaderSearch
              isOpen={searchOpen}
              onToggle={handleSearchToggle}
              onClose={handleSearchClose}
            />

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
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md",
                  "text-muted-foreground hover:text-foreground hover:bg-muted",
                  "transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
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
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md",
                  "text-muted-foreground hover:text-foreground hover:bg-muted",
                  "transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
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

      {searchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
          onClick={handleSearchClose}
          aria-hidden="true"
        />
      )}

      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        role={role}
        userName={userName}
      />
    </>
  );
}
