import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerSearchAvatar: RegistryEntry = entry({
    id: "header-search-avatar",
    title: "Search & Avatar",
    description: "Search bars, notification badges, and avatar clusters for dashboards.",
    source: `export default function HeaderSearchAvatar() {
  const frame =
    "flex h-64 w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className={frame}>
        <header className="flex h-12 items-center justify-between gap-4 border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm font-bold">Dashboard</span>
          <div className="flex max-w-xs flex-1 items-center gap-1 rounded-md border border-black/[.08] bg-zinc-50 px-2 py-1 text-xs text-zinc-400 dark:border-white/[.145] dark:bg-zinc-900">
            <span>⌕</span>
            <span className="flex-1">Search</span>
            <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘K</kbd>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative">
              <span className="text-sm">🔔</span>
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[8px] text-white">3</span>
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-xs dark:bg-zinc-700">JD</span>
          </div>
        </header>
        <div className={content}>Dashboard Content</div>
      </div>

      <div className={frame}>
        <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <div className="flex items-center gap-3">
            <span className="text-sm">☰</span>
            <span className="text-sm font-bold">Overview</span>
          </div>
          <div className="flex flex-1 max-w-md items-center gap-1.5 rounded-md border border-black/[.08] bg-zinc-50 px-2.5 py-1.5 text-xs text-zinc-400 dark:border-white/[.145] dark:bg-zinc-900">
            <span>⌕</span>
            <span className="flex-1">Search anything...</span>
            <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘K</kbd>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative text-sm">
              🔔
              <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[8px] text-white">5</span>
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white">JD</span>
          </div>
        </header>
        <div className={content}>Dashboard Grid</div>
      </div>

      <div className={frame}>
        <header className="flex h-12 items-center gap-3 border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm">☰</span>
          <span className="text-sm font-bold">Dashboard</span>
          <div className="ml-auto flex items-center gap-2 text-xs text-zinc-400">
            <span>⌕</span>
            <span>🔔</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] dark:bg-zinc-700">A</span>
          </div>
        </header>
        <div className={content}>Content</div>
      </div>

      <div className={frame}>
        <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <span className="text-sm font-bold">Inbox</span>
          <div className="flex items-center gap-1">
            {["All", "Unread", "Mentions"].map((t, i) => (
              <button key={t} className={\`rounded-md px-2 py-1 text-xs \${i === 0 ? "bg-zinc-200 font-medium dark:bg-zinc-800" : "text-zinc-500"}\`}>{t}</button>
            ))}
          </div>
          <span className="relative text-sm">
            🔔
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[8px] font-bold text-white">12</span>
          </span>
        </header>
        <div className={content}>Messages</div>
      </div>
    </div>
  );
}`,
  });
