"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContextSubMenu {
  label: string;
  onClick: () => void;
}

interface ContextMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
  shortcut?: string;
  children?: ContextSubMenu[];
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  trigger: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const ContextMenu = ({ items, trigger, onOpenChange }: ContextMenuProps) => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<string | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSubmenu(null);
        onOpenChange?.(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSubmenu(null);
        onOpenChange?.(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const handleContext = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setOpen(true);
    setSubmenu(null);
    onOpenChange?.(true);
  };

  return (
    <div>
      <div onContextMenu={handleContext}>{trigger}</div>
      {open && (
        <div
          ref={menuRef}
          style={{ left: position.x, top: position.y }}
          className={cn(
            "fixed z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
            "animate-in fade-in-0 zoom-in-95",
          )}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="-mx-1 my-1 h-px bg-muted" />
            ) : (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => item.children ? setSubmenu(item.label) : setSubmenu(null)}
                onMouseLeave={() => setSubmenu(null)}
              >
                <button
                  onClick={() => {
                    if (!item.disabled && !item.children) {
                      item.onClick();
                      setOpen(false);
                      setSubmenu(null);
                      onOpenChange?.(false);
                    }
                  }}
                  disabled={item.disabled}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground",
                    item.disabled && "pointer-events-none opacity-50",
                    item.danger && "text-destructive focus:bg-destructive/10 focus:text-destructive",
                  )}
                >
                  {item.icon && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <span className="ml-auto text-xs tracking-widest opacity-60">
                      {item.shortcut}
                    </span>
                  )}
                  {item.children && (
                    <svg
                      className="h-4 w-4 shrink-0 opacity-60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
                {item.children && submenu === item.label && (
                  <div className="absolute left-full top-0 z-50 ml-1 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
                    {item.children.map((child, ci) => (
                      <button
                        key={ci}
                        onClick={() => {
                          child.onClick();
                          setOpen(false);
                          setSubmenu(null);
                          onOpenChange?.(false);
                        }}
                        className={cn(
                          "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                          "hover:bg-accent hover:text-accent-foreground",
                          "focus:bg-accent focus:text-accent-foreground",
                        )}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ContextMenu;
