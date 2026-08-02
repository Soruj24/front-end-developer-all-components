"use client";

import Link from "next/link";
import { useActivePath } from "@/hooks";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/types/navigation";

interface SidebarNavLinkProps {
  link: NavLink;
  /** Indentation level for nested links. */
  depth?: number;
  /** Called after navigation so the mobile sidebar can close. */
  onNavigate: () => void;
}

/** A single navigation link inside a sidebar section. */
export function SidebarNavLink({ link, depth = 0, onNavigate }: SidebarNavLinkProps) {
  const isActive = useActivePath();
  const active = isActive(link.href, { exact: true });

  return (
    <li>
      <Link
        href={link.href}
        onClick={onNavigate}
        data-nav-link
           className={cn(
          "group relative flex items-center gap-2.5 rounded-lg py-1.5 pr-2 text-[13px] font-medium transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.98]",
          depth === 0 ? "pl-2.5" : "pl-7",
          active
            ? "bg-accent-soft text-foreground font-semibold"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        )}
        aria-current={active ? "page" : undefined}
      >
        <span
          className={cn(
            "absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-accent transition-all duration-150",
            active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
          )}
          aria-hidden="true"
        />
        {link.icon && (
          <span
            className={cn(
              "w-4 shrink-0 text-center text-xs transition-colors",
              active
                ? "text-accent"
                : "text-muted-foreground/70 group-hover:text-foreground"
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
            <SidebarNavLink
              key={child.label}
              link={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
