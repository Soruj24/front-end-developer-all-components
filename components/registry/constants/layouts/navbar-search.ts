import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarSearch: RegistryEntry = entry({
    id: "navbar-search",
    title: "Search Bars",
    description: "Inline search fields and an expand-on-click search icon.",
    source: `import { useState } from "react";

export default function NavbarSearch() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-10 w-full items-center justify-between gap-4 rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">App</span>
        <div className="flex max-w-xs flex-1 items-center gap-1 rounded-md border border-black/[.08] bg-zinc-50 px-2 py-1 text-xs text-zinc-400 dark:border-white/[.145] dark:bg-zinc-900">
          <span>⌕</span>
          <span className="flex-1">Search...</span>
          <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘K</kbd>
        </div>
      </nav>
      <nav className="flex h-11 w-full items-center justify-between gap-4 rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <div className="flex items-center gap-3">
          <span className="text-sm">☰</span>
          <span className="text-sm font-bold">Dashboard</span>
        </div>
        <div className="flex max-w-xs flex-1 items-center gap-1 rounded-md border border-black/[.08] bg-zinc-50 px-2 py-1 text-xs text-zinc-400 dark:border-white/[.145] dark:bg-zinc-900">
          <span>⌕</span>
          <span className="flex-1">Search</span>
          <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘K</kbd>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative text-sm">
            🔔
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[7px] text-white">3</span>
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white">JD</span>
        </div>
      </nav>
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">App</span>
        <div className="flex items-center gap-2">
          {open ? (
            <input autoFocus placeholder="Search..." onBlur={() => setOpen(false)} className="w-28 rounded-md border border-black/[.08] px-2 py-1 text-xs focus:outline-none dark:border-white/[.145] dark:bg-zinc-900" />
          ) : (
            <button onClick={() => setOpen(true)} className="text-sm text-zinc-400">🔍</button>
          )}
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] dark:bg-zinc-700">JD</span>
        </div>
      </nav>
    </div>
  );
}`,
  });
