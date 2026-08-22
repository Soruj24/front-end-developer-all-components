import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutProfile: RegistryEntry = entry({
    id: "layout-profile",
    title: "Profile",
    description: "Profile header with tabbed content sections.",
    source: `"use client";

import { useState } from "react";
import { UserIcon, UsersIcon } from "lucide-react";

const profileTabs = ["Posts", "About", "Friends"] as const;

export default function LayoutProfile() {
  const [tab, setTab] = useState<(typeof profileTabs)[number]>("Posts");
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="flex flex-1 flex-col items-center p-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
          <UserIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-2 text-xs font-semibold tracking-tight">Riley Chen</h3>
        <p className="text-[10px] text-muted-foreground">Product Engineer</p>
        <div
          role="tablist"
          aria-label="Profile sections"
          className="mt-3 flex gap-1 rounded-lg bg-muted p-0.5"
        >
          {profileTabs.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={\`rounded-md px-2.5 py-1 text-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 \${
                tab === item
                  ? "bg-background font-medium shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }\`}
            >
              {item === "Friends" ? (
                <span className="flex items-center gap-1">
                  <UsersIcon className="h-3 w-3" aria-hidden="true" /> Friends
                </span>
              ) : (
                item
              )}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground/70">{tab} content</p>
      </div>
    </div>
  );
}`,
  });
