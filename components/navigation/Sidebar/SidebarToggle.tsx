"use client";

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
