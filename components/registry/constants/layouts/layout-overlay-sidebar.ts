import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutOverlaySidebar: RegistryEntry = entry({
    id: "layout-overlay-sidebar",
    title: "Overlay Sidebar",
    description: "Collapsible off-canvas drawer over the main view.",
    source: `"use client";

import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";

export default function LayoutOverlaySidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10">
        Main Content
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="absolute left-3 top-3 z-20 rounded-md border border-border bg-background p-1.5 shadow-xs transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only">Open sidebar</span>
      </button>
      {open ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            className="absolute inset-y-0 left-0 z-30 w-32 cursor-default border-r border-border bg-background p-2 text-left shadow-lg"
          >
            <span className="block px-1 pb-2 text-[11px] font-semibold tracking-tight">Drawer</span>
            {["Overview", "Reports", "Team"].map((item) => (
              <span
                key={item}
                className="block rounded-md px-1.5 py-1 text-[11px] text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
              >
                {item}
              </span>
            ))}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Dismiss overlay"
            className="absolute inset-0 z-20 bg-overlay"
          />
        </>
      ) : null}
    </div>
  );
}`,
  });
