"use client";

import { useState, createContext, useContext } from "react";
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
}

const MenubarContext = createContext<MenubarContextType>({
  openMenu: null,
  setOpenMenu: () => {},
});

export function Menubar({ className, children }: MenubarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <MenubarContext.Provider value={{ openMenu, setOpenMenu }}>
      <div
        className={cn(
          "flex h-10 items-center space-x-1 rounded-md border bg-white p-1 dark:bg-zinc-900",
          className
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

  return (
    <button
      type="button"
      onClick={() => setOpenMenu(openMenu ? null : "menu")}
      className={cn(
        "flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800",
        openMenu && "bg-zinc-100 dark:bg-zinc-800",
        className
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
      <div
        className="fixed inset-0 z-40"
        onClick={() => setOpenMenu(null)}
      />
      <div
        className={cn(
          "absolute left-0 z-50 mt-1 min-w-[12rem] overflow-hidden rounded-md border bg-white p-1 shadow-md dark:bg-zinc-900",
          className
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
      disabled={disabled}
      className={cn(
        "flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800",
        disabled && "opacity-50",
        className
      )}
    >
      <span className="flex-1 text-left">{children}</span>
      {shortcut && (
        <span className="ml-4 text-xs tracking-widest text-zinc-400">
          {shortcut}
        </span>
      )}
    </button>
  );
}

export function MenubarSeparator({ className }: MenubarSeparatorProps) {
  return <div className={cn("-mx-1 my-1 h-px bg-zinc-200 dark:bg-zinc-700", className)} />;
}
