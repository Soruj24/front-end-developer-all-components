"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./icons";

export interface MenuItem {
  label: string;
  icon?: IconName;
  shortcut?: string;
  onSelect?: () => void;
  divider?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export interface MenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  align?: "start" | "end";
  width?: number;
}

/** Dark-themed dropdown menu for the IDE chrome. */
export function Menu({ trigger, items, align = "start", width = 200 }: MenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-flex">
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      <div
        data-state={open ? "open" : "closed"}
        style={{ width, minWidth: 180 }}
        className={`pointer-events-none absolute z-50 mt-1 overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md ${
          align === "end" ? "right-0" : "left-0"
        } data-[state=open]:pointer-events-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95`}
      >
        {items.map((item, i) =>
          item.divider ? (
            <div key={i} className="-mx-1 my-1 h-px bg-muted" />
          ) : (
            <button
              key={i}
              type="button"
              disabled={item.disabled}
              onClick={() => {
                if (!item.disabled) {
                  item.onSelect?.();
                  setOpen(false);
                }
              }}
              className={`flex w-full select-none items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors disabled:pointer-events-none disabled:opacity-50 ${
                item.danger
                  ? "text-destructive hover:bg-destructive/10"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {item.icon && (
                <Icon name={item.icon} width={14} height={14} className="shrink-0 opacity-60" />
              )}
              <span className="flex-1 truncate">{item.label}</span>
              {item.shortcut && <span className="ml-auto text-xs tracking-widest opacity-60">{item.shortcut}</span>}
            </button>
          )
        )}
      </div>
    </div>
  );
}
