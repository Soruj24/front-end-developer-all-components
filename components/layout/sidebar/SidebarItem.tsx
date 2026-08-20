"use client";

import Link from "next/link";
import { useActivePath } from "@/hooks";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types/navigation";
import {
  BG,
  RADIUS,
  TRANSITION,
  TEXT,
} from "@/constants/tokens";

interface SidebarItemProps {
  link: NavLink;
  depth?: number;
  collapsed: boolean;
  onNavigate: () => void;
}

export function SidebarItem({ link, depth = 0, collapsed, onNavigate }: SidebarItemProps) {
  const isActive = useActivePath();
  const active = isActive(link.href, { exact: true });

  if (collapsed) {
    return (
      <li>
        <Link
          href={link.href}
          onClick={onNavigate}
          data-nav-link
          className={cn(
            "group relative mx-auto flex h-8 w-8 items-center justify-center",
            RADIUS.sm,
            TRANSITION.colors,
            active
              ? `${BG.accent} text-foreground`
              : `text-muted-foreground ${BG.mutedSoft} hover:text-foreground`,
          )}
          title={link.label}
          aria-current={active ? "page" : undefined}
        >
          <span
            className={cn(
              "absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-accent transition-opacity",
              active ? "opacity-100" : "opacity-0",
            )}
            aria-hidden="true"
          />
          {link.icon ?? <span className="text-xs">{link.label.charAt(0)}</span>}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={link.href}
        onClick={onNavigate}
        data-nav-link
        className={cn(
          "group relative flex items-center gap-2 py-1.5 pr-2",
          RADIUS.sm,
          TEXT.body,
          "font-medium",
          TRANSITION.colors,
          "active:scale-[0.98]",
          depth === 0 ? "pl-2" : "pl-6",
          active
            ? `${BG.accent} text-foreground font-semibold`
            : `text-muted-foreground ${BG.mutedSoft} hover:text-foreground`,
        )}
        aria-current={active ? "page" : undefined}
      >
        <span
          className={cn(
            "absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-accent transition-opacity",
            active ? "opacity-100" : "opacity-0 group-hover:opacity-40",
          )}
          aria-hidden="true"
        />
        {link.icon && (
          <span
            className={cn(
              "w-4 shrink-0 text-center text-xs transition-colors",
              active ? "text-accent" : "text-muted-foreground/70 group-hover:text-foreground",
            )}
            aria-hidden="true"
          >
            {link.icon}
          </span>
        )}
        <span className="flex-1 truncate">{link.label}</span>
      </Link>

      {link.children && link.children.length > 0 && (
        <ul className="mt-0.5 flex flex-col gap-0.5">
          {link.children.map((child) => (
            <SidebarItem
              key={child.label}
              link={child}
              depth={depth + 1}
              collapsed={false}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
