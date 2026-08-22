"use client";

import {
  BarChart3Icon,
  BellIcon,
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

const railIcons = [
  { key: "home", Icon: HomeIcon },
  { key: "stats", Icon: BarChart3Icon },
  { key: "settings", Icon: SettingsIcon },
];

const railButton =
  "flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground/70 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

const zone =
  "flex flex-1 items-center justify-center bg-muted/20 text-[11px] font-medium text-muted-foreground/50 dark:bg-muted/10";

const frame =
  "flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs";

/** Icon rail beside a main content area. */
export function SidebarMainDemo() {
  return (
    <div className={frame}>
      <div className="flex w-14 flex-col items-center gap-1 border-r border-border bg-muted/40 p-2">
        {railIcons.map(({ key, Icon }, i) => (
          <button key={key} type="button" aria-label={key} aria-current={i === 0 ? "page" : undefined} className={`${railButton} ${i === 0 ? "bg-primary-soft text-primary" : ""}`}>
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        ))}
        <button type="button" aria-label="Account" className={`${railButton} mt-auto`}>
          <UserIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
      <div className={zone}>Main Content</div>
    </div>
  );
}

/** Labelled sidebar list with an active item. */
export function SidebarListDemo() {
  const items = ["Dashboard", "Analytics", "Reports", "Settings"];
  return (
    <div className={frame}>
      <div className="flex w-24 flex-col gap-1 border-r border-border bg-muted/40 p-2">
        <span className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          Menu
        </span>
        {items.map((item, i) => (
          <button
            key={item}
            type="button"
            aria-current={i === 0 ? "page" : undefined}
            className={`rounded-md px-2 py-1 text-left text-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
              i === 0
                ? "bg-primary-soft font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={zone}>Content</div>
    </div>
  );
}

/** Brand bar with inline links above a content area. */
export function HeaderContentDemo() {
  const links = ["Home", "About", "Contact"];
  return (
    <div className={frame}>
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-border bg-background px-3">
        <span className="text-xs font-semibold tracking-tight">Brand</span>
        <nav aria-label="Primary" className="flex items-center gap-0.5">
          {links.map((link, i) => (
            <button
              key={link}
              type="button"
              aria-current={i === 0 ? "page" : undefined}
              className={`rounded-md px-2 py-1 text-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
                i === 0
                  ? "bg-primary-soft font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link}
            </button>
          ))}
        </nav>
      </div>
      <div className={zone}>Content</div>
    </div>
  );
}

/** Top bar stacked above an icon rail and content. */
export function StackedSidebarDemo() {
  return (
    <div className={frame}>
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-border bg-background px-3">
        <span className="text-xs font-semibold tracking-tight">Top Bar</span>
        <span className="flex items-center gap-1">
          <button type="button" aria-label="Search" className={railButton}>
            <SearchIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Notifications" className={railButton}>
            <BellIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </span>
      </div>
      <div className="flex flex-1">
        <div className="flex w-12 flex-col items-center gap-1 border-r border-border bg-muted/40 p-2">
          {railIcons.map(({ key, Icon }, i) => (
            <button key={key} type="button" aria-label={key} aria-current={i === 0 ? "page" : undefined} className={`${railButton} ${i === 0 ? "bg-primary-soft text-primary" : ""}`}>
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className={zone}>Content</div>
      </div>
    </div>
  );
}

/** Header plus a three-pane body (rail, main, details). */
export function ThreeColumnDemo() {
  return (
    <div className={frame}>
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-border bg-background px-3">
        <span className="text-xs font-semibold tracking-tight">App</span>
        <button type="button" aria-label="Notifications" className={railButton}>
          <BellIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-1">
        <div className="flex w-12 flex-col items-center gap-1 border-r border-border bg-muted/40 p-1.5">
          {[HomeIcon, BarChart3Icon, SettingsIcon].map((Icon, i) => (
            <button key={i} type="button" aria-label={`rail-${i}`} className={railButton}>
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className={zone}>Main</div>
        <div className="flex w-20 shrink-0 flex-col gap-2 border-l border-border bg-muted/40 p-2 text-[10px] text-muted-foreground/70">
          <span className="font-medium text-muted-foreground">Details</span>
          <span>Info</span>
          <span>Activity</span>
        </div>
      </div>
    </div>
  );
}
