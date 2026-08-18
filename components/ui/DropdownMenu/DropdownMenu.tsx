"use client";

import { useState, useRef, useEffect, createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { DropdownAlign, DropdownMenuProps } from "./DropdownMenu.types";

interface MenuCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
  align: DropdownAlign;
}

const MenuContext = createContext<MenuCtx>({
  open: false,
  setOpen: () => {},
  align: "start",
});

function useClickOutside(onClose: () => void, enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!enabled) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose, enabled]);
  return ref;
}

export function DropdownMenu({ trigger, children, align = "start", className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useClickOutside(() => setOpen(false), open);

  return (
    <MenuContext.Provider value={{ open, setOpen, align }}>
      <div ref={containerRef} className={cn("relative inline-block", className)}>
        <div onClick={() => setOpen(!open)} className="outline-none">
          {typeof trigger === "function" ? trigger(open) : trigger}
        </div>
        <div
          data-state={open ? "open" : "closed"}
          className={cn(
            "pointer-events-none absolute z-50 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
            "data-[state=open]:pointer-events-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </MenuContext.Provider>
  );
}

export function DropdownMenuTrigger({ children }: { children: ReactNode }) {
  const { setOpen, open } = useContext(MenuContext);
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      data-state={open ? "open" : "closed"}
      className="outline-none"
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, className }: { children: ReactNode; className?: string }) {
  const { align } = useContext(MenuContext);
  const alignClass = align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";
  return (
    <div
      data-state="open"
      className={cn(
        "min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        alignClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, shortcut, icon, disabled, destructive, onClick, className }: {
  children: ReactNode; shortcut?: string; icon?: ReactNode; disabled?: boolean; destructive?: boolean; onClick?: () => void; className?: string;
}) {
  const { setOpen } = useContext(MenuContext);
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => { onClick?.(); setOpen(false); }}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        "focus:bg-accent focus:text-accent-foreground",
        destructive && "text-destructive focus:bg-destructive/10 focus:text-destructive",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{children}</span>
      {shortcut && <span className="ml-auto text-xs tracking-widest opacity-60">{shortcut}</span>}
    </button>
  );
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />;
}

export function DropdownMenuLabel({ children, className, inset }: { children: ReactNode; className?: string; inset?: boolean }) {
  return (
    <div className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}>
      {children}
    </div>
  );
}

export function DropdownMenuGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("p-1", className)}>{children}</div>;
}
