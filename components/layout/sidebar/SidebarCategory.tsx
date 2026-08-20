"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types/navigation";
import {
  BORDER,
  BG,
  RADIUS,
  TRANSITION,
  TEXT,
} from "@/constants/tokens";

interface SidebarCategoryProps {
  label: string;
  icon?: React.ReactNode;
  links: NavLink[];
  defaultOpen?: boolean;
  onNavigate: () => void;
}

export function SidebarCategory({ label, icon, links, defaultOpen = false, onNavigate }: SidebarCategoryProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "flex w-full items-center gap-2 px-2 py-1.5 text-left",
          RADIUS.sm,
          TEXT.body,
          "font-medium text-foreground",
          TRANSITION.colors,
          "hover:bg-muted/70",
        )}
        aria-expanded={open}
      >
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="flex-1 truncate">{label}</span>
        <svg
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted-foreground/60",
            `${TRANSITION.transform} duration-200`,
            open && "rotate-180",
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className={cn("ml-3 flex flex-col gap-0.5 border-l pl-2 pt-1 pb-1", BORDER.default)}>
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center px-2 py-1",
                  RADIUS.sm,
                  TEXT.body,
                  "text-muted-foreground",
                  BG.mutedSoft,
                  "hover:text-foreground",
                  TRANSITION.colors,
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
