"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Menu, X, Sun, Moon } from "lucide-react";

interface MobileHeaderProps {
  className?: string;
  onSearchToggle: () => void;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  theme: "light" | "dark" | "system";
  onThemeToggle?: () => void;
}

export function MobileHeader({
  className,
  onSearchToggle,
  onMenuToggle,
  isMenuOpen,
  theme,
  onThemeToggle,
}: MobileHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        onMenuToggle();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onMenuToggle]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full h-16 bg-background/80 backdrop-blur-xl border-b border-border",
        "transition-all duration-200",
        scrolled
          ? "bg-white/90 dark:bg-black/80"
          : "bg-white/80 dark:bg-black/80",
        className
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 px-2 sm:px-4 lg:hidden">
        {/* Logo */}
        <Link
          href="/"
          className={cn("flex items-center gap-2", "hover:opacity-80 transition-opacity")}
          aria-label="Home"
        >
          <span
            className={cn(
              "relative h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center",
              "shadow-sm"
            )}
          >
            <Star className="h-3 w-3" />
          </span>
          <span className="text-xs font-medium tracking-tight text-foreground">
            Component Registry
          </span>
        </Link>

        {/* Search Button (mobile only) */}
        <button
          type="button"
          onClick={onSearchToggle}
          className={cn(
            "flex items-center gap-1.5 rounded-full bg-border p-1.5",
            "hover:bg-border/70 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          )}
          aria-label="Search"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" strokeCurrent>
            <circle cx="11" cy="11" r="8" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>

        {/* Theme Switcher (mobile) */}
        {onThemeToggle && (
          <button
            type="button"
            onClick={onThemeToggle}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full bg-border hover:bg-border/70 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            )}
            aria-label="Switch theme"
          >
            {theme === "dark" ? (
              <Sun className="h-3 w-3" />
            ) : (
              <Moon className="h-3 w-3" />
            )}
          </button>
        )}

        {/* Menu Button */}
        <button
          type="button"
          onClick={onMenuToggle}
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full bg-border hover:bg-border/70 transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          )}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-3 w-3" />
          ) : (
            <Menu className="h-3 w-3" />
          )}
        </button>
      </div>
    </header>
  );
}