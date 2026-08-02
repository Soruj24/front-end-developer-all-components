"use client";

import type { ComponentType } from "react";
import type { SidebarView } from "../types";
import { usePlayground } from "../context";
import { Icon, type IconName } from "../ui/icons";
import { ExplorerView } from "./sidebar/ExplorerView";
import { OpenFilesView } from "./sidebar/OpenFilesView";
import { SearchView } from "./sidebar/SearchView";
import { RegistryView } from "./sidebar/RegistryView";
import { AssetsView } from "./sidebar/AssetsView";
import { TemplatesView } from "./sidebar/TemplatesView";
import { AiView } from "./sidebar/AiView";
import { HistoryView } from "./sidebar/HistoryView";
import { BookmarksView } from "./sidebar/BookmarksView";

const ACTIVITIES: Array<{ view: SidebarView; icon: IconName; label: string }> = [
  { view: "explorer", icon: "file", label: "Explorer" },
  { view: "open-files", icon: "folderOpen", label: "Open Files" },
  { view: "search", icon: "search", label: "Search" },
  { view: "registry", icon: "grid", label: "Registry" },
  { view: "assets", icon: "image", label: "Assets" },
  { view: "templates", icon: "layout", label: "Templates" },
  { view: "ai", icon: "sparkles", label: "AI Assistant" },
  { view: "history", icon: "history", label: "History" },
  { view: "bookmarks", icon: "bookmark", label: "Bookmarks" },
];

const VIEW_TITLES: Record<SidebarView, string> = {
  explorer: "Explorer",
  "open-files": "Open Editors",
  search: "Search",
  registry: "Component Registry",
  assets: "Assets",
  templates: "Templates",
  ai: "AI Assistant",
  history: "History & Snapshots",
  bookmarks: "Bookmarks",
};

const VIEWS: Record<SidebarView, ComponentType> = {
  explorer: ExplorerView,
  "open-files": OpenFilesView,
  search: SearchView,
  registry: RegistryView,
  assets: AssetsView,
  templates: TemplatesView,
  ai: AiView,
  history: HistoryView,
  bookmarks: BookmarksView,
};

export function Sidebar() {
  const { layout, setSidebarView } = usePlayground();
  const ActiveView = VIEWS[layout.sidebarView];

  return (
    <aside className="flex shrink-0">
      <nav
        aria-label="Activity bar"
        className="flex w-11 flex-col items-center gap-1 border-r border-[#2a2a2e] bg-[#333333] py-2"
      >
        {ACTIVITIES.map(({ view, icon, label }) => (
          <button
            key={view}
            type="button"
            title={label}
            aria-label={label}
            onClick={() => setSidebarView(view)}
            className={`relative flex h-10 w-10 items-center justify-center rounded text-[#9ca3af] transition-colors hover:text-[#d4d4d8] ${
              layout.sidebarView === view ? "text-[#d4d4d8]" : ""
            }`}
          >
            {layout.sidebarView === view && (
              <span className="absolute -left-[3px] h-6 w-0.5 rounded-full bg-[#2b7de9]" />
            )}
            <Icon name={icon} width={20} height={20} />
          </button>
        ))}
      </nav>

      <div
        className="flex shrink-0 flex-col overflow-hidden border-r border-[#2a2a2e] bg-[#252526]"
        style={{ width: layout.sidebarWidth }}
      >
        <div className="flex h-9 shrink-0 items-center gap-1 border-b border-[#2a2a2e] px-2">
          <span className="flex-1 truncate pl-1 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
            {VIEW_TITLES[layout.sidebarView]}
          </span>
          <button
            type="button"
            title="Close sidebar"
            onClick={layout.toggleSidebar}
            className="flex h-6 w-6 items-center justify-center rounded text-[#9ca3af] hover:bg-[#37373d] hover:text-[#d4d4d8]"
          >
            <Icon name="x" width={13} height={13} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <ActiveView />
        </div>
      </div>
    </aside>
  );
}
