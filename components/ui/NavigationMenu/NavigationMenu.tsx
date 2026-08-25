"use client";

import { useState, createContext, useContext, useEffect } from "react";
import { cn } from "@/lib/cn";
import type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
} from "./NavigationMenu.types";

interface NavigationMenuContextType {
  openItem: string | null;
  setOpenItem: (id: string | null) => void;
}

const NavigationMenuContext = createContext<NavigationMenuContextType>({
  openItem: null,
  setOpenItem: () => {},
});

export function NavigationMenu({ className, children }: NavigationMenuProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    if (!openItem) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenItem(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [openItem]);

  return (
    <NavigationMenuContext.Provider value={{ openItem, setOpenItem }}>
      <nav className={cn("relative", className)}>
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  );
}

export function NavigationMenuList({ children, className }: NavigationMenuListProps) {
  return (
    <ul
      role="menubar"
      className={cn("flex items-center gap-0.5", className)}
    >
      {children}
    </ul>
  );
}

export function NavigationMenuItem({ children, className }: NavigationMenuItemProps) {
  return (
    <li role="none" className={cn("relative", className)}>
      {children}
    </li>
  );
}

export function NavigationMenuTrigger({ children, className }: NavigationMenuTriggerProps) {
  const { openItem, setOpenItem } = useContext(NavigationMenuContext);
  const isOpen = openItem !== null;

  return (
    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={() => setOpenItem(isOpen ? null : "nav")}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium",
        "transition-colors duration-150 ease-out",
        "text-muted-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
        "active:bg-accent/80",
        isOpen && "bg-accent text-accent-foreground",
        className,
      )}
    >
      {children}
      <svg
        className={cn(
          "h-3.5 w-3.5 transition-transform duration-200",
          isOpen && "rotate-180",
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function NavigationMenuContent({ children, className }: NavigationMenuContentProps) {
  const { openItem, setOpenItem } = useContext(NavigationMenuContext);

  if (!openItem) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => setOpenItem(null)}
        aria-hidden="true"
      />
      <div
        role="menu"
        className={cn(
          "absolute left-0 top-full z-50 mt-1.5 min-w-[16rem] overflow-hidden rounded-lg border border-border/60 bg-card p-1 shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08] dark:shadow-black/50",
          "animate-in fade-in-0 zoom-in-95",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

export function NavigationMenuLink({ href, children, className }: NavigationMenuLinkProps) {
  return (
    <a
      href={href}
      role="menuitem"
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm",
        "transition-colors duration-100 ease-out",
        "text-muted-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
        "active:bg-accent/80",
        className,
      )}
    >
      {children}
    </a>
  );
}
