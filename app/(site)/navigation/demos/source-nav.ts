/** Verbatim sources of the sidebar accordion pieces (Code Viewer). */
export const SECTION_SOURCE = `"use client";

import { useId } from "react";
import { ChevronDownIcon } from "lucide-react";
import type { NavSection } from "@/types/navigation";
import { cn } from "@/lib/cn";
import { SidebarNavLink } from "./SidebarNavLink";

interface SidebarSectionProps {
  section: NavSection;
  /** Whether the accordion body is expanded. */
  open: boolean;
  onToggle: () => void;
  /** Called after navigation so the mobile sidebar can close. */
  onNavigate: () => void;
}

/** A collapsible group of navigation links within the sidebar. */
export function SidebarSection({ section, open, onToggle, onNavigate }: SidebarSectionProps) {
  const id = useId();
  const contentId = \`\${id}-content\`;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" && !open) {
            event.preventDefault();
            onToggle();
          } else if (event.key === "ArrowLeft" && open) {
            event.preventDefault();
            onToggle();
          }
        }}
        aria-expanded={open}
        aria-controls={contentId}
        className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] font-medium text-foreground/80 outline-none transition-[background-color,color,box-shadow] duration-150 hover:bg-muted/80 hover:text-foreground active:bg-muted active:text-foreground focus-visible:bg-muted/60 focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-xs text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
          {section.icon}
        </span>
        <span className="flex-1 truncate">{section.title}</span>
        <ChevronDownIcon
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-transform duration-300 ease-out group-hover:text-muted-foreground",
            open && "rotate-180 text-muted-foreground",
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={contentId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col gap-0.5 pb-1.5 pt-0.5">
            {section.links.map((link) => (
              <SidebarNavLink key={link.label} link={link} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
`;

export const NAV_LINK_SOURCE = `"use client";

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
          "group relative flex items-center gap-2 rounded-lg py-1.5 pr-2 text-[13px] font-medium outline-none transition-[background-color,color,box-shadow] duration-150",
          depth === 0 ? "pl-2.5" : "pl-7",
          active
            ? "bg-primary-soft font-semibold text-primary"
            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground focus-visible:bg-muted/60 focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring/30 active:bg-muted",
        )}
        aria-current={active ? "page" : undefined}
      >
        <span
          className={cn(
            "absolute left-0 top-1/2 h-3.5 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-opacity duration-150",
            active ? "opacity-100" : "opacity-0 group-hover:opacity-50",
          )}
          aria-hidden="true"
        />
        {link.icon && (
          <span
            className={cn(
              "w-4 shrink-0 text-center text-xs transition-colors duration-150",
              active
                ? "text-primary"
                : "text-muted-foreground/70 group-hover:text-foreground",
            )}
            aria-hidden="true"
          >
            {link.icon}
          </span>
        )}
        <span className="flex-1 truncate">{link.label}</span>
      </Link>

      {link.children && link.children.length > 0 && (
        <ul className="ml-[18px] mt-0.5 flex flex-col gap-0.5 border-l border-border/70">
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
`;
