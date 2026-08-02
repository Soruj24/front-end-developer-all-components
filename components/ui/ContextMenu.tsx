"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

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
          className="fixed z-50 min-w-[180px] overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-popover"
        >
          {items.map((item, i) =>
            item.divider ? (
              <div
                key={i}
                className="my-1 border-t border-border"
              />
            ) : (
              <div
                key={i}
                className="relative"
                onMouseEnter={() =>
                  item.children ? setSubmenu(item.label) : setSubmenu(null)
                }
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
                  className={`flex w-full items-center gap-2 px-3 py-2 text-sm ${
                    item.disabled
                      ? "cursor-not-allowed opacity-40"
                      : item.danger
                      ? "text-danger hover:bg-danger-soft"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.icon && (
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                      {item.icon}
                    </span>
                  )}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <span className="text-[11px] text-muted-foreground">
                      {item.shortcut}
                    </span>
                  )}
                  {item.children && (
                    <svg
                      className="h-3 w-3 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>
                {item.children && submenu === item.label && (
                  <div className="absolute left-full top-0 ml-1 min-w-[160px] overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-popover">
                    {item.children.map((child, ci) => (
                      <button
                        key={ci}
                        onClick={() => {
                          child.onClick();
                          setOpen(false);
                          setSubmenu(null);
                          onOpenChange?.(false);
                        }}
                        className="flex w-full items-center px-3 py-2 text-sm text-foreground hover:bg-muted"
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
