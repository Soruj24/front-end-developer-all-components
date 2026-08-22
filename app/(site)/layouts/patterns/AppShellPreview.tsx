"use client";

import { useEffect, useState } from "react";
import {
  BellIcon,
  FolderKanbanIcon,
  HomeIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

const shellNav = [
  { label: "Home", Icon: HomeIcon },
  { label: "Projects", Icon: FolderKanbanIcon },
  { label: "Team", Icon: UsersIcon },
  { label: "Settings", Icon: SettingsIcon },
];

const railButton =
  "rounded-md p-1.5 text-muted-foreground/70 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

/** Interactive app-shell composition used as the Live Preview. */
export function AppShellPreview() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [active, setActive] = useState("Home");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  return (
    <div className="flex h-80 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <aside
        aria-label="Primary"
        className={`${sidebarOpen ? "w-40" : "w-12"} hidden shrink-0 flex-col gap-1 border-r border-border bg-muted/40 p-2 transition-[width] duration-200 sm:flex`}
      >
        {shellNav.map(({ label, Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(label)}
            title={label}
            aria-current={active === label ? "page" : undefined}
            className={`flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md px-2 py-1.5 text-left text-xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
              active === label
                ? "bg-primary-soft font-medium text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className={sidebarOpen ? "" : "sr-only"}>{label}</span>
          </button>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-10 shrink-0 items-center justify-between border-b border-border px-3">
          <span className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-pressed={sidebarOpen}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              className={`${railButton} hidden sm:inline-flex`}
            >
              {sidebarOpen ? (
                <PanelLeftCloseIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <PanelLeftOpenIcon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              aria-haspopup="dialog"
              aria-label="Open navigation drawer"
              className={`${railButton} inline-flex sm:hidden`}
            >
              <PanelLeftOpenIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="ml-1 text-sm font-semibold tracking-tight">{active}</span>
          </span>
          <span className="flex items-center gap-0.5">
            <button type="button" aria-label="Search" className={railButton}>
              <SearchIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" aria-label="Notifications" className={railButton}>
              <BellIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </span>
        </header>

        <div className="grid flex-1 auto-rows-min grid-cols-2 gap-2 p-3 lg:grid-cols-3">
          {[64, 48, 56, 40, 72, 44].map((h, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-2 shadow-xs">
              <span className="block rounded-md bg-muted" style={{ height: h / 2 }} />
              <span className="mt-2 block h-1.5 w-2/3 rounded-full bg-muted" />
              <span className="mt-1 block h-1.5 w-1/3 rounded-full bg-muted/60" />
            </div>
          ))}
        </div>

        {drawerOpen ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation drawer"
            className="absolute inset-y-0 left-0 z-30 w-56 border-r border-border bg-background p-3 shadow-lg sm:hidden"
          >
            <p className="pb-2 text-xs font-semibold tracking-tight">Navigate</p>
            {shellNav.map(({ label }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setActive(label);
                  setDrawerOpen(false);
                }}
                className={`block w-full rounded-md px-2 py-1.5 text-left text-xs ${
                  active === label
                    ? "bg-primary-soft font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
