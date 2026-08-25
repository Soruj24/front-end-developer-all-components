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
  onClick?: () => void;
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
            "fixed z-50 min-w-[10rem] overflow-hidden rounded-lg border border-border/60 bg-card p-1 text-foreground shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08] dark:shadow-black/50",
            "animate-in fade-in-0 zoom-in-95",
          )}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="-mx-1 my-1 h-px bg-border/60" />
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
                      item.onClick?.();
                      setOpen(false);
                      setSubmenu(null);
                      onOpenChange?.(false);
                    }
                  }}
                  disabled={item.disabled}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors duration-100",
                    "text-muted-foreground",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground",
                    item.disabled && "pointer-events-none opacity-40",
                    item.danger && "text-destructive hover:bg-destructive/10 focus:bg-destructive/10",
                  )}
                >
                  {item.icon && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center text-muted-foreground/70">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <span className="ml-auto font-mono text-[11px] tracking-wider text-muted-foreground/50">
                      {item.shortcut}
                    </span>
                  )}
                  {item.children && (
                    <svg
                      className="h-4 w-4 shrink-0 text-muted-foreground/50"
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
                  <div className="absolute left-full top-0 z-50 ml-1 min-w-[10rem] overflow-hidden rounded-lg border border-border/60 bg-card p-1 text-foreground shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08] dark:shadow-black/50 animate-in fade-in-0 zoom-in-95">
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
                          "relative flex w-full cursor-pointer select-none items-center rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors duration-100",
                          "text-muted-foreground",
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
