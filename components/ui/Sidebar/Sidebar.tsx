"use client";

import { createContext, useState } from "react";
import { cn } from "@/lib/cn";
import type { SidebarProps, SidebarHeaderProps, SidebarContentProps, SidebarFooterProps, SidebarItemProps } from "./Sidebar.types";

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  open: true,
  setOpen: () => {},
});

export function Sidebar({ children, open: controlledOpen, onOpenChange, side = "left", className }: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(true);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <aside className={cn("flex h-full flex-col border-r bg-white dark:bg-zinc-900", side === "right" && "border-l border-r-0", !open && "hidden", className)}>
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  return <div className={cn("p-4 border-b", className)}>{children}</div>;
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return <div className={cn("flex-1 overflow-auto p-2", className)}>{children}</div>;
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return <div className={cn("p-4 border-t", className)}>{children}</div>;
}

export function SidebarItem({ children, active, onClick, className }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
        active && "bg-zinc-100 dark:bg-zinc-800",
        className
      )}
    >
      {children}
    </button>
  );
}
