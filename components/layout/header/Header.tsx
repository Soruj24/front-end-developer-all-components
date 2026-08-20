"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";
import { Menu, X } from "lucide-react";

import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderActions } from "./HeaderActions";
import { MobileHeader } from "./MobileHeader";
import { MobileNavigation } from "./MobileNavigation";
import { UserMenu } from "./UserMenu";

interface HeaderProps {
  className?: string;
  navLinks?: Array<{ label: string; href: string }>;
  showVersion?: boolean;
  version?: string;
  onThemeToggle?: (theme: "light" | "dark" | "system") => void;
  userName?: string;
  userAvatar?: string;
  role?: "user" | "admin";
}

export function Header({ className, navLinks, showVersion = true, version = "v2.0", onThemeToggle, userName, userAvatar, role = "user" }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleSearchToggle = useCallback(() => {
    setSearchOpen((prev) => !prev);
  }, []);

  const handleMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleScrolled = useCallback(() => {
    setScrolled(true);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full h-16",
          "backdrop-blur-xl",
          "transition-all duration-200",
          scrolled
            ? "bg-white/90 dark:bg-black/80 border-b border-border"
            : "bg-white/80 dark:bg-black/80 border-b border-zinc-800",
          "animate-fade-in-down",
          className
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <HeaderLogo showVersion={showVersion} version={version} />

            <nav className="hidden sm:block">
              <ul className="flex flex-col sm:flex-row gap-2">
                {navLinks?.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={cn("text-sm text-muted-foreground hover:text-foreground transition-colors")}
                      aria-label={link.label}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <HeaderSearch onToggle={handleSearchToggle} />

            <div className="flex items-center gap-2">
              <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="relative">
                <MobileHeader
                  onSearchToggle={handleSearchToggle}
                  onMenuToggle={handleMenuToggle}
                  isMenuOpen={mobileMenuOpen}
                  theme="system"
                  onThemeToggle={onThemeToggle}
                />
              </div>

              {mobileMenuOpen && (
                <MobileNavigation
                  isOpen={mobileMenuOpen}
                  onClose={() => setMobileMenuOpen(false)}
                  role={role}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Panel */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        role={role}
      />

      {/* Search Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 hidden",
          isOpen ? "block" : "none",
          "backdrop-blur-sm"
        )}
        onClick={() => setSearchOpen(false)}
      />
    </>
  );
}