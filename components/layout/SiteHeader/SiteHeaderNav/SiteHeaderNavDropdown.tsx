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
          "flex items-center gap-1 px-3 py-2 text-[13px] font-medium",
          "text-zinc-400 rounded-lg transition-colors",
          "hover:text-zinc-200 hover:bg-zinc-800/60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
          isOpen && "text-zinc-200 bg-zinc-800/60"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-1",
            "w-48 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5",
            "shadow-popover animate-scale-in",
            "focus-visible:outline-none"
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
                "flex items-center gap-2 rounded-lg px-3 py-2",
                "text-[13px] font-medium text-zinc-400",
                "transition-colors hover:bg-zinc-800/60 hover:text-zinc-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
              )}
              role="menuitem"
            >
              {item.icon && <span className="text-zinc-400">{item.icon}</span>}
              {item.label}
              {item.badge && (
                <span
                  className={cn(
                    "ml-auto rounded-full px-1.5 py-0.5",
                    "text-[10px] font-semibold uppercase",
                    item.badge === "new" && "bg-blue-500/10 text-blue-400",
                    item.badge === "beta" && "bg-amber-500/10 text-amber-400",
                    item.badge === "pro" && "bg-purple-500/10 text-purple-400"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
