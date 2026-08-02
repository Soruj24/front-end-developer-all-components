"use client";

import { useId } from "react";
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

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** A collapsible group of navigation links within the sidebar. */
export function SidebarSection({ section, open, onToggle, onNavigate }: SidebarSectionProps) {
  const id = useId();
  const contentId = `${id}-content`;

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
        className="group flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium text-foreground transition-[background-color,color] duration-150 ease-out hover:bg-muted/70 active:bg-muted/80"
      >
        <span className="flex h-4 w-4 shrink-0 items-center justify-center text-xs text-muted-foreground transition-colors group-hover:text-foreground">
          {section.icon}
        </span>
        <span className="flex-1 truncate">{section.title}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted-foreground/60 transition-transform duration-250 ease-out group-hover:text-muted-foreground",
            open && "rotate-180 text-muted-foreground/80",
          )}
        />
      </button>

      <div
        id={contentId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col gap-0.5 pb-2 pt-1">
            {section.links.map((link) => (
              <SidebarNavLink key={link.label} link={link} onNavigate={onNavigate} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
