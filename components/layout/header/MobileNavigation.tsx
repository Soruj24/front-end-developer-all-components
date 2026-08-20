"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { X, Menu } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { HeaderSearch } from "./HeaderSearch";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  role?: "user" | "admin";
}

export function MobileNavigation({
  isOpen,
  onClose,
  className,
  role = "user",
}: MobileNavigationProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-black/40 hidden",
        isOpen ? "block" : "none",
        "backdrop-blur-sm"
      )}
      onClick={onClose}
    >
      <div
        ref={ref => {
          if (ref) {
            ref.style.transition = "transform 0.3s ease-out";
          }
        }}
        className={cn(
          "fixed right-0 top-0 bottom-0 z-50 w-80 max-w-full transform translateX(${
            isOpen ? "0" : "100%"
          }) transition-transform border-l border-border bg-popover shadow-lg"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link
            href="/"
            className={cn("font-medium text-foreground hover:text-primary transition-colors")}
            aria-label="Home"
          >
            Component Registry
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={cn("p-1 rounded hover:bg-border transition-colors")}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <HeaderSearch
            onToggle={() => setIsSearchOpen(!isSearchOpen)}
            onClose={() => {
              setIsSearchOpen(false);
              onClose();
            }}
            initialQuery=""
          />
        </div>

        {/* Navigation Items */}
        <nav className="px-4 pt-4 space-y-1">
          <UserMenu role={role} userName="User" onLogout={onClose} />
        </nav>

        {/* Actions */}
        <div className="px-4 pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="w-full justify-between text-sm text-muted-foreground py-2"
          >
            <span>Esc to close</span>
          </button>
        </div>
      </div>
    </div>
  );
}