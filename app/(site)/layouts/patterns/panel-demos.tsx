"use client";

import { useState } from "react";
import {
  ChevronRightIcon,
  ClockIcon,
  FileTextIcon,
  HomeIcon,
  Settings2Icon,
  UsersIcon,
} from "lucide-react";

const railButton =
  "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

const zone =
  "flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10";

const frame =
  "flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs";

/** Main content with an auxiliary right panel. */
export function RightPanelDemo() {
  return (
    <div className={frame}>
      <div className={zone}>Canvas</div>
      <div className="flex w-24 shrink-0 flex-col gap-2 border-l border-border bg-muted/40 p-2 text-[10px] text-muted-foreground/70">
        <span className="font-medium text-muted-foreground">Inspector</span>
        <span>Position</span>
        <span>Styles</span>
        <span>Events</span>
      </div>
    </div>
  );
}

/** Masonry-style columns of varied-height cards. */
export function MasonryDemo() {
  const columns = [
    ["h-16", "h-10"],
    ["h-10", "h-14"],
    ["h-12", "h-12"],
  ];
  return (
    <div className={frame}>
      <div className="grid flex-1 grid-cols-3 gap-2 p-3">
        {columns.map((heights, c) => (
          <div key={c} className="flex flex-col gap-2">
            {heights.map((h, r) => (
              <div key={`${c}-${r}`} className={`rounded-lg border border-border bg-card p-2 shadow-xs ${h}`}>
                <span className="block h-full rounded-md bg-muted" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const tabItems = [
  { key: "home", label: "Home", Icon: HomeIcon },
  { key: "history", label: "History", Icon: ClockIcon },
  { key: "docs", label: "Docs", Icon: FileTextIcon },
  { key: "team", label: "Team", Icon: UsersIcon },
  { key: "settings", label: "Settings", Icon: Settings2Icon },
];

/** Sidebar whose sections switch via tabs. */
export function SidebarTabsDemo() {
  const [active, setActive] = useState("home");
  return (
    <div className={frame}>
      <div className="flex w-28 shrink-0 flex-col gap-1 border-r border-border bg-muted/40 p-2">
        {tabItems.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActive(key)}
            aria-current={active === key ? "page" : undefined}
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-left text-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
              active === key
                ? "bg-primary-soft font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
      <div className="flex flex-1 items-start justify-start p-3">
        <div className="w-full max-w-56 rounded-lg border border-border bg-card p-2 shadow-xs">
          <p className="truncate text-[11px] font-medium capitalize">{active}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            Panel content for the selected tab.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Collapsible off-canvas drawer over the main view. */
export function OverlaySidebarDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${frame} relative`}>
      <div className={zone}>Main Content</div>
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
}
