"use client";

import { cn } from "@/lib/cn";
import { ChevronDownIcon, ListIcon } from "./icons";

export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface DocsTOCProps {
  items: TOCItem[];
  activeId: string;
  /** Desktop variant is a compact sticky list. */
  variant?: "desktop" | "mobile";
  open?: boolean;
  onToggle?: () => void;
}

function TOCList({ items, activeId }: { items: TOCItem[]; activeId: string }) {
  return (
    <nav aria-label="On this page" className="flex flex-col">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "group relative flex items-start rounded-md py-1 text-[13px] leading-snug transition-colors",
            item.level === 3 ? "pl-4" : "pl-2.5",
            activeId === item.id
              ? "font-medium text-accent"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-current={activeId === item.id ? "location" : undefined}
        >
          {item.level === 2 && (
            <span
              className={cn(
                "absolute left-0 top-1/2 h-3.5 w-[2px] -translate-y-1/2 rounded-full transition-all",
                activeId === item.id ? "bg-accent" : "bg-transparent group-hover:bg-muted-foreground/30"
              )}
              aria-hidden="true"
            />
          )}
          {item.text}
        </a>
      ))}
    </nav>
  );
}

/** Table of contents with scroll-spy highlighting. */
export function DocsTOC({ items, activeId, variant = "desktop", open, onToggle }: DocsTOCProps) {
  if (variant === "mobile") {
    return (
      <div className="rounded-xl border border-border bg-background">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
        >
          <span className="flex items-center gap-2">
            <ListIcon className="h-4 w-4 text-muted-foreground" />
            On this page
          </span>
          <ChevronDownIcon
            className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", open && "rotate-180")}
          />
        </button>
        {open && (
          <div className="border-t border-border px-2 py-2">
            <TOCList items={items} activeId={activeId} />
          </div>
        )}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          On this page
        </p>
        <p className="text-[13px] text-muted-foreground/70">Loading headings…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <TOCList items={items} activeId={activeId} />
    </div>
  );
}
