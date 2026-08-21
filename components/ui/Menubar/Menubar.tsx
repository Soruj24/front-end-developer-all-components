"use client";

import { useState, createContext, useContext, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import type {
  MenubarProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarSeparatorProps,
} from "./Menubar.types";

interface MenubarContextType {
  openMenu: string | null;
  setOpenMenu: (id: string | null) => void;
  triggerRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>;
}

const MenubarContext = createContext<MenubarContextType>({
  openMenu: null,
  setOpenMenu: () => {},
  triggerRefs: { current: new Map() },
});

let menuCounter = 0;

export function Menubar({ className, children }: MenubarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (!openMenu) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openMenu]);

  return (
    <MenubarContext.Provider value={{ openMenu, setOpenMenu, triggerRefs }}>
      <div
        role="menubar"
        className={cn(
          "flex h-10 items-center gap-0.5 rounded-xl border border-border bg-card p-1 shadow-sm",
          "dark:bg-card dark:shadow-none",
          className,
        )}
      >
        {children}
      </div>
    </MenubarContext.Provider>
  );
}

export function MenubarMenu({ children }: MenubarMenuProps) {
  return <div className="relative">{children}</div>;
}

export function MenubarTrigger({ children, className }: MenubarTriggerProps) {
  const { openMenu, setOpenMenu } = useContext(MenubarContext);
  const isOpen = openMenu !== null;
  const menuIdRef = useRef(`menu-${++menuCounter}`);
  const menuId = menuIdRef.current;

  return (
    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={isOpen}
      onClick={() => setOpenMenu(isOpen ? null : menuId)}
      className={cn(
        "inline-flex h-8 cursor-pointer select-none items-center rounded-lg px-3 py-1.5 text-sm font-medium",
        "transition-colors duration-150",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
        isOpen && "bg-muted text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function MenubarContent({ children, className }: MenubarContentProps) {
  const { openMenu, setOpenMenu } = useContext(MenubarContext);

  if (!openMenu) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
      <div
        role="menu"
        className={cn(
          "absolute left-0 z-50 mt-1 min-w-[14rem] overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-lg",
          "animate-in fade-in-0 zoom-in-95",
          "dark:shadow-black/40",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

export function MenubarItem({
  children,
  className,
  shortcut,
  disabled,
}: MenubarItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cn(
        "flex w-full cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-2 text-sm",
        "transition-colors duration-150",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
        "active:bg-muted/80",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
    >
      <span className="flex-1 text-left">{children}</span>
      {shortcut && (
        <span className="ml-auto font-mono text-xs text-muted-foreground/70">
          {shortcut}
        </span>
      )}
    </button>
  );
}

export function MenubarSeparator({ className }: MenubarSeparatorProps) {
  return <div className={cn("my-1 h-px bg-border", className)} />;
}
