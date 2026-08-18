"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { NavItem } from "../types/header.types";

interface SiteHeaderNavDropdownProps {
  items: NavItem[];
  label?: string;
  className?: string;
}

export function SiteHeaderNavDropdown({
  items,
  label = "More",
  className,
}: SiteHeaderNavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors",
          "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isOpen && "bg-accent text-accent-foreground",
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "pointer-events-none absolute left-0 top-full z-50 mt-1",
          "min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
          "data-[state=open]:pointer-events-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "focus-visible:outline-none",
        )}
        role="menu"
        aria-orientation="vertical"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:bg-accent focus:text-accent-foreground",
            )}
            role="menuitem"
          >
            {item.icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center">{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span
                className={cn(
                  "ml-auto rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                  item.badge === "new" && "bg-primary/10 text-primary",
                  item.badge === "beta" && "bg-warning/10 text-warning",
                  item.badge === "pro" && "bg-info/10 text-info",
                )}
              >
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
