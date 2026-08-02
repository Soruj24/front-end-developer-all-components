"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

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
}

const Dropdown = ({ trigger, items, align = "start" }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>
      {open && (
        <div
          className={`absolute z-50 mt-1 min-w-[180px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-popover ${align === "end" ? "right-0" : "left-0"}`}
        >
          {items.map((item, i) => {
            if (item.divider) {
              return (
                <div
                  key={i}
                  className="my-1 border-t border-border"
                />
              );
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
                className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors disabled:opacity-50 disabled:pointer-events-none ${
                  item.danger
                    ? "text-danger hover:bg-danger-soft"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.icon && (
                  <span className="flex h-4 w-4 items-center justify-center shrink-0">
                    {item.icon}
                  </span>
                )}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && (
                  <span className="text-xs text-muted-foreground">
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
