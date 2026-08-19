export const BROWSER_WINDOW_SOURCE = `"use client";

import type { ReactNode } from "react";

interface BrowserWindowProps {
  url?: string;
  tabs?: string[];
  activeTab?: number;
  children?: ReactNode;
}

export function BrowserWindow({
  url = "https://example.com",
  tabs,
  activeTab = 0,
  children,
}: BrowserWindowProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="border-b border-border bg-muted/50">
        {tabs && tabs.length > 0 && (
          <div className="flex items-center gap-1 px-2 pt-2">
            {tabs.map((tab, i) => (
              <span
                key={tab}
                className={
                  "rounded-t-md px-3 py-1.5 text-xs " +
                  (i === activeTab
                    ? "border border-b-0 border-border bg-background"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {tab}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-2 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="mx-4 flex h-6 flex-1 items-center rounded-md border border-border bg-background px-3 text-xs text-muted-foreground">
            {url}
          </div>
        </div>
      </div>
      <div className="flex h-40 items-center justify-center bg-background text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  );
}`;

export const BASIC_EXAMPLE = `<BrowserWindow url="https://example.com">
  <div>Page content here</div>
</BrowserWindow>`;

export const TABS_EXAMPLE = `<BrowserWindow
  url="https://app.example.com/dashboard"
  tabs={["Home", "Dashboard", "Settings"]}
  activeTab={1}
>
  <div>Dashboard content</div>
</BrowserWindow>`;

export const MINIMAL_EXAMPLE = `<div className="overflow-hidden rounded-lg border border-border">
  <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-3 py-2">
    <div className="flex gap-1">
      <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
    </div>
  </div>
  <div className="flex h-28 items-center justify-center bg-background text-xs text-muted-foreground">
    Content
  </div>
</div>`;
