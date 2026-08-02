import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerMinimalBadge: RegistryEntry = entry({
    id: "header-minimal-badge",
    title: "Minimal & Badges",
    description: "Minimal light bars, version badges, and colored accent headers.",
    source: `export default function HeaderMinimalBadge() {
  const frame =
    "flex h-64 w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className={frame}>
        <header className="flex h-10 items-center justify-center border-b border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400">Minimal</span>
        </header>
        <div className={content}>Content</div>
      </div>

      <div className={frame}>
        <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold">Docs</span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800">v2.0</span>
          </div>
          <nav className="flex gap-4 text-xs text-zinc-500">
            <span className="text-zinc-950 dark:text-zinc-50">Getting Started</span>
            <span>API</span>
            <span>Components</span>
          </nav>
        </header>
        <div className={content}>Documentation</div>
      </div>

      <div className="flex h-64 w-full flex-col rounded-lg border border-emerald-200 dark:border-emerald-800">
        <header className="flex h-12 items-center justify-between border-b border-emerald-200 bg-emerald-50 px-4 dark:border-emerald-800 dark:bg-emerald-950">
          <span className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Eco</span>
          <nav className="flex gap-4 text-xs text-emerald-600 dark:text-emerald-400">
            <span className="font-medium text-emerald-800 dark:text-emerald-200">Dashboard</span>
            <span>Analytics</span>
            <span>Reports</span>
          </nav>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-300 text-[10px] text-white dark:bg-emerald-700">E</span>
        </header>
        <div className="flex flex-1 items-center justify-center bg-emerald-50/50 text-[10px] text-emerald-300 dark:bg-emerald-950/50">
          Dashboard
        </div>
      </div>
    </div>
  );
}`,
  });
