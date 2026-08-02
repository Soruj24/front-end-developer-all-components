import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerCollapsibleSearch: RegistryEntry = entry({
    id: "header-collapsible-search",
    title: "Collapsible Search",
    description: "A compact header search that expands on click and collapses on blur.",
    source: `import { useState } from "react";

export default function HeaderCollapsibleSearch() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-64 w-full max-w-md flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <header className="flex h-12 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">App</span>
        <div className="flex items-center gap-2">
          {open ? (
            <input
              autoFocus
              placeholder="Type to search..."
              onBlur={() => setOpen(false)}
              className="w-28 rounded-md border border-black/[.08] px-2 py-1 text-xs focus:outline-none dark:border-white/[.145] dark:bg-zinc-900"
            />
          ) : (
            <button onClick={() => setOpen(true)} className="text-sm text-zinc-400 hover:text-zinc-600">🔍</button>
          )}
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] dark:bg-zinc-700">👤</span>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900">
        Content
      </div>
    </div>
  );
}`,
  });
