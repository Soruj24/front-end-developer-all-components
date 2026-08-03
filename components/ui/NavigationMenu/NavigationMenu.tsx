"use client";

import { useState, createContext, useContext } from "react";
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
    <ul className={cn("flex items-center space-x-1", className)}>
      {children}
    </ul>
  );
}

export function NavigationMenuItem({ children, className }: NavigationMenuItemProps) {
  return <li className={cn("relative", className)}>{children}</li>;
}

export function NavigationMenuTrigger({ children, className }: NavigationMenuTriggerProps) {
  const { openItem, setOpenItem } = useContext(NavigationMenuContext);

  return (
    <button
      type="button"
      onClick={() => setOpenItem(openItem ? null : "nav")}
      className={cn(
        "flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800",
        className
      )}
    >
      {children}
      <svg
        className={cn(
          "h-3 w-3 transition-transform",
          openItem && "rotate-180"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function NavigationMenuContent({ children, className }: NavigationMenuContentProps) {
  const { openItem, setOpenItem } = useContext(NavigationMenuContext);

  if (!openItem) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpenItem(null)} />
      <div
        className={cn(
          "absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-md border bg-white p-2 shadow-md dark:bg-zinc-900",
          className
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
      className={cn(
        "block rounded-sm px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800",
        className
      )}
    >
      {children}
    </a>
  );
}
