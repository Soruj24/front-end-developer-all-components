"use client";

import { useId } from "react";
import type { NavSection } from "@/types/navigation";
import { cn } from "@/lib/cn";
import {
  BORDER,
  Z,
  RADIUS,
  TRANSITION,
  TEXT,
  COLOR,
} from "@/constants/tokens";
import { SidebarItem } from "./SidebarItem";

interface SidebarSectionProps {
  section: NavSection;
  open: boolean;
  onToggle: () => void;
  collapsed: boolean;
  onNavigate: () => void;
}

export function SidebarSection({ section, open, onToggle, collapsed, onNavigate }: SidebarSectionProps) {
  const id = useId();
  const contentId = `${id}-content`;

  if (collapsed) {
    return (
      <div className="relative group/section">
        <div className="flex justify-center py-1">
          <span className={cn("flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground")} title={section.title}>
            {section.icon ?? section.title.charAt(0)}
          </span>
        </div>

        <div
          className={cn(
            "invisible absolute left-full top-0 ml-1 w-56",
            Z.chrome,
            RADIUS.lg,
            BORDER.default,
            "bg-popover shadow-lg",
            "opacity-0 group-hover/section:visible group-hover/section:opacity-100",
            TRANSITION.opacity,
          )}
        >
          <div className={cn("border-b px-2.5 py-1.5 font-medium", BORDER.default, TEXT.small, COLOR.muted)}>
            {section.title}
          </div>
          <div className="p-1">
            {section.links.map((link) => (
              <SidebarItem
                key={link.label}
                link={link}
                collapsed={false}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" && !open) { e.preventDefault(); onToggle(); }
          else if (e.key === "ArrowLeft" && open) { e.preventDefault(); onToggle(); }
        }}
        aria-expanded={open}
        aria-controls={contentId}
        className={cn(
          "group flex h-9 w-full items-center gap-2 px-2 text-left",
          RADIUS.sm,
          "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
          TRANSITION.colors,
          "hover:text-foreground",
        )}
      >
        {section.icon && (
          <span className="flex h-4 w-4 shrink-0 items-center justify-center text-[13px]" aria-hidden="true">
            {section.icon}
          </span>
        )}
        <span className="flex-1 truncate">{section.title}</span>
        <svg
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-muted-foreground/60",
            `${TRANSITION.transform} duration-200`,
            "group-hover:text-muted-foreground",
            open && "rotate-180 text-muted-foreground/80",
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        id={contentId}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col gap-0.5 pb-1 pt-0.5 pl-1">
            {section.links.map((link) => (
              <SidebarItem
                key={link.label}
                link={link}
                collapsed={false}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
