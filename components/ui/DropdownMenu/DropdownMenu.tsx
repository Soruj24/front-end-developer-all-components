"use client";

import { useState, useRef, useEffect, createContext, useContext, cloneElement, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { DropdownAlign, DropdownMenuProps } from "./DropdownMenu.types";

interface MenuCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
  align: DropdownAlign;
}

const MenuContext = createContext<MenuCtx>({ open: false, setOpen: () => {}, align: "start" });

export function DropdownMenu({ trigger, children, align = "start", className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ open, setOpen, align }}>
      <div ref={useClickOutside(() => setOpen(false))} className={cn("relative inline-block", className)}>
        {trigger}
        {open && children}
      </div>
    </MenuContext.Provider>
  );
}

function useClickOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

export function DropdownMenuTrigger({ children }: { children: ReactNode }) {
  const { setOpen, open } = useContext(MenuContext);
  if (isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>;
    return cloneElement(children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>, {
      onClick: (e: React.MouseEvent) => {
        setOpen(!open);
        if (typeof childProps.onClick === "function") childProps.onClick(e);
      },
    });
  }
  return <button type="button" onClick={() => setOpen(!open)}>{children}</button>;
}

export function DropdownMenuContent({ children, className }: { children: ReactNode; className?: string }) {
  const { align } = useContext(MenuContext);
  const alignClass = align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";
  return (
    <div className={cn("absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md dark:bg-zinc-900 dark:border-zinc-700", alignClass, className)}>
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, shortcut, icon, disabled, destructive, onClick }: {
  children: ReactNode; shortcut?: string; icon?: ReactNode; disabled?: boolean; destructive?: boolean; onClick?: () => void;
}) {
  const { setOpen } = useContext(MenuContext);
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => { onClick?.(); setOpen(false); }}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800",
        destructive && "text-red-600 dark:text-red-400",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      {icon && <span className="h-4 w-4">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
      {shortcut && <span className="text-xs text-muted-foreground ml-4">{shortcut}</span>}
    </button>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("-mx-1 my-1 h-px bg-zinc-200 dark:bg-zinc-700", className)} />;
}
