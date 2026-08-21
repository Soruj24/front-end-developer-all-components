"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { HolyGrailProps, HolyGrailSidebarSide } from "./HolyGrail.types";

const SIDE_PATTERNS: Record<HolyGrailSidebarSide, { grid: string; hasLeft: boolean; hasRight: boolean }> = {
  left: { grid: "grid-cols-[var(--hg-sb)_1fr]", hasLeft: true, hasRight: false },
  right: { grid: "grid-cols-[1fr_var(--hg-sb)]", hasLeft: false, hasRight: true },
  both: { grid: "grid-cols-[var(--hg-sb)_1fr_var(--hg-sb-r)]", hasLeft: true, hasRight: true },
};

const HolyGrail = forwardRef<HTMLDivElement, HolyGrailProps>(
  (
    {
      children,
      header,
      footer,
      sidebar,
      sidebarRight,
      sidebarSide = "left",
      sidebarWidth = 240,
      sidebarRightWidth = 240,
      sticky = true,
      className,
    },
    ref,
  ) => {
    const { grid, hasLeft, hasRight } = SIDE_PATTERNS[sidebarSide];
    const showLeft = hasLeft && sidebar;
    const showRight = hasRight && sidebarRight;

    return (
      <div
        ref={ref}
        className={cn("flex min-h-screen flex-col bg-background text-foreground", className)}
        style={
          {
            "--hg-sb": `${sidebarWidth}px`,
            "--hg-sb-r": `${sidebarRightWidth}px`,
          } as React.CSSProperties
        }
      >
        {header && (
          <header
            className={cn(
              "z-10 border-b border-border/60 bg-background/80 backdrop-blur-sm",
              sticky && "sticky top-0",
            )}
          >
            {header}
          </header>
        )}

        <div
          className={cn(
            "flex flex-1",
            (showLeft || showRight) && "grid",
            (showLeft || showRight) && grid,
          )}
        >
          {showLeft && (
            <aside
              aria-label="Left sidebar"
              className="sticky top-0 h-screen overflow-y-auto border-r border-border/60 bg-background/50"
            >
              {sidebar}
            </aside>
          )}

          <main className="flex-1 overflow-y-auto">{children}</main>

          {showRight && (
            <aside
              aria-label="Right sidebar"
              className="sticky top-0 h-screen overflow-y-auto border-l border-border/60 bg-background/50"
            >
              {sidebarRight}
            </aside>
          )}
        </div>

        {footer && (
          <footer className="border-t border-border/60 bg-background/80 backdrop-blur-sm">
            {footer}
          </footer>
        )}
      </div>
    );
  },
);

HolyGrail.displayName = "HolyGrail";

export { HolyGrail };
