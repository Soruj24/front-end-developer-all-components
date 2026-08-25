"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface DropdownItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
  shortcut?: string;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
  className?: string;
}

const Dropdown = ({ trigger, items, align = "start", className }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>
      <div
        data-state={open ? "open" : "closed"}
        className={cn(
          "pointer-events-none absolute z-50 mt-1.5 min-w-[10rem] overflow-hidden rounded-lg border border-border/60 bg-card p-1 text-foreground shadow-lg ring-1 ring-black/[0.04] dark:ring-white/[0.08] dark:shadow-black/50",
          "data-[state=open]:pointer-events-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          align === "end" ? "right-0" : "left-0",
          className,
        )}
      >
        {items.map((item, i) => {
          if (item.divider) {
            return <div key={i} className="-mx-1 my-1 h-px bg-border/60" />;
          }
          return (
            <button
              key={i}
              type="button"
              disabled={item.disabled}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick?.();
                  setOpen(false);
                }
              }}
              className={cn(
                "relative flex w-full cursor-pointer select-none items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm outline-none transition-colors duration-100",
                "text-muted-foreground",
                "hover:bg-accent hover:text-accent-foreground",
                "focus:bg-accent focus:text-accent-foreground",
                item.danger && "text-destructive hover:bg-destructive/10 focus:bg-destructive/10",
                item.disabled && "pointer-events-none opacity-40",
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
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
