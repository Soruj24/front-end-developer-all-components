/** Verbatim sources of the sidebar chrome pieces (Code Viewer). */
export const BRAND_SOURCE = `import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Brand mark at the top of the sidebar. */
export function SidebarBrand() {
  return (
    <div className="flex h-14 shrink-0 items-center border-b border-border/60 px-3">
      <Link
        href="/"
        className="group flex min-w-0 flex-1 items-center gap-2.5 rounded-lg p-1.5 transition-all duration-150 ease-out hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-muted"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 text-[11px] font-bold tracking-wide text-primary-foreground shadow-sm ring-1 ring-primary/20 transition-all duration-200 ease-out group-hover:scale-105 group-hover:shadow-md">
          {siteConfig.shortName}
        </span>
        <span className="truncate text-[15px] font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
}
`;

export const SEARCH_SOURCE = `"use client";

import { useEffect, useRef } from "react";
import { SearchIcon } from "lucide-react";

interface SidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
}

/** Search input that filters the sidebar navigation. Press "/" to focus. */
export function SidebarSearch({ value, onChange }: SidebarSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative">
      <SearchIcon
        className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        aria-label="Search pages"
        placeholder="Search pages..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full rounded-lg border border-border/60 bg-muted/30 pl-8 pr-8 text-[13px] text-foreground shadow-xs transition-all duration-150 ease-out placeholder:text-muted-foreground/50 hover:bg-muted/50 hover:border-border focus-visible:border-primary/40 focus-visible:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      />
      {!value && (
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden h-5 -translate-y-1/2 items-center rounded-md border border-border/60 bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground/70 sm:flex">
          /
        </kbd>
      )}
    </div>
  );
}
`;

export const TOGGLE_SOURCE = `"use client";

import { MenuIcon, XIcon } from "lucide-react";

interface SidebarToggleProps {
  open: boolean;
  onClick: () => void;
}

/** Floating button that toggles the sidebar on small screens. */
export function SidebarToggle({ open, onClick }: SidebarToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed left-4 top-20 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-all duration-200 ease-out hover:scale-105 hover:bg-muted active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background supports-[backdrop-filter]:bg-background/75 sm:hidden"
      aria-label={open ? "Close sidebar" : "Open sidebar"}
      aria-expanded={open}
    >
      {open ? (
        <XIcon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      ) : (
        <MenuIcon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      )}
    </button>
  );
}
`;

export const BACKDROP_SOURCE = `"use client";

interface SidebarBackdropProps {
  onClick: () => void;
}

/** Dimmed, blurred overlay behind the sidebar when open on small screens. */
export function SidebarBackdrop({ onClick }: SidebarBackdropProps) {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-30 animate-fade-in-fast bg-overlay/80 backdrop-blur-sm sm:hidden"
      aria-hidden="true"
    />
  );
}
`;

export const FOOTER_SOURCE = `import { navigationLinkCount } from "@/constants/navigation";

/** Compact footer line inside the sidebar. */
export function SidebarFooter() {
  return (
    <div className="flex shrink-0 items-center justify-between border-t border-border/60 px-4 py-3 text-[11px] font-medium text-muted-foreground">
      <span className="rounded-md bg-muted/50 px-1.5 py-0.5 tabular-nums ring-1 ring-black/[0.04] dark:ring-white/[0.08]">
        {navigationLinkCount} pages
      </span>
      <span className="flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
        Next.js 16
      </span>
    </div>
  );
}
`;
