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
      {open && (
        <div
          style={{ width, minWidth: 180 }}
          className={`absolute z-50 mt-1 overflow-hidden rounded-md border border-[#3a3a41] bg-[#252526] py-1 text-[13px] shadow-2xl ${
            align === "end" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="my-1 border-t border-[#333338]" />
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
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-left transition-colors disabled:opacity-40 ${
                  item.danger
                    ? "text-[#f48771] hover:bg-[#4d2020]"
                    : "text-[#d4d4d8] hover:bg-[#37373d]"
                }`}
              >
                {item.icon && (
                  <Icon name={item.icon} width={14} height={14} className="text-[#9ca3af]" />
                )}
                <span className="flex-1 truncate">{item.label}</span>
                {item.shortcut && <span className="text-[11px] text-[#6a6a72]">{item.shortcut}</span>}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
