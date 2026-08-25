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
          "inline-flex h-9 items-center gap-0.5 rounded-lg border border-border/60 bg-card p-0.5 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
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
        "inline-flex h-8 cursor-pointer select-none items-center rounded-md px-3 py-1.5 text-sm font-medium",
        "transition-colors duration-150 ease-out",
        "text-muted-foreground hover:bg-muted hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
        isOpen && "bg-accent text-accent-foreground",
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
          "absolute left-0 z-50 mt-1 min-w-[14rem] overflow-hidden rounded-lg border border-border/60 bg-card p-1 shadow-lg",
          "ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "dark:shadow-black/50",
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
        "flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-1.5 text-sm",
        "transition-colors duration-100 ease-out",
        "text-muted-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
        "active:bg-accent/80",
        disabled && "pointer-events-none opacity-40",
        className,
      )}
    >
      <span className="flex-1 text-left">{children}</span>
      {shortcut && (
        <span className="ml-auto font-mono text-[11px] tracking-wider text-muted-foreground/60">
          {shortcut}
        </span>
      )}
    </button>
  );
}

export function MenubarSeparator({ className }: MenubarSeparatorProps) {
  return <div className={cn("-mx-1 my-1 h-px bg-border/60", className)} />;
}
