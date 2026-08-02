import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarDropdown: RegistryEntry = entry({
    id: "navbar-dropdown",
    title: "With Dropdown",
    description: "A menu button that reveals a dropdown list.",
    source: `import { useState } from "react";

export default function NavbarDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
      <span className="text-sm font-bold">App</span>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-500 hover:bg-black/[.04] dark:hover:bg-white/[.06]"
        >
          Menu ▾
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-1 w-32 rounded-lg border border-black/[.08] bg-white py-1 shadow-lg dark:border-white/[.145] dark:bg-black">
            {["Profile", "Settings", "Logout"].map((l) => (
              <button key={l} onClick={() => setOpen(false)} className="w-full px-3 py-1.5 text-left text-xs text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900">{l}</button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}`,
  });
