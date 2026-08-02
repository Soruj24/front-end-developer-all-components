import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerMobileDrawer: RegistryEntry = entry({
    id: "header-mobile-drawer",
    title: "Mobile Drawer",
    description: "A hamburger header that opens an inline mobile menu.",
    source: `import { useState } from "react";

export default function HeaderMobileDrawer() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative flex h-64 w-full max-w-sm flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <header className="flex h-11 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">App</span>
        <button onClick={() => setOpen(!open)} className="text-sm text-zinc-500">
          {open ? "✕" : "☰"}
        </button>
      </header>
      {open && (
        <div className="flex flex-col gap-0.5 border-b border-black/[.08] bg-white px-4 py-2 dark:border-white/[.145] dark:bg-black">
          {["Home", "Products", "About", "Contact"].map((l) => (
            <span key={l} className="rounded-md px-2 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400">
              {l}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900">
        Content
      </div>
    </div>
  );
}`,
  });
