import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarAvatarMenu: RegistryEntry = entry({
    id: "navbar-avatar-menu",
    title: "Avatar Menu",
    description: "A user avatar that opens a profile dropdown.",
    source: `import { useState } from "react";

export default function NavbarAvatarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
      <span className="text-sm font-bold">Dashboard</span>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white"
        >
          JD
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-black/[.08] bg-white py-1 shadow-lg dark:border-white/[.145] dark:bg-black">
            {["Profile", "Settings", "Sign out"].map((l) => (
              <button key={l} onClick={() => setOpen(false)} className="w-full px-3 py-1.5 text-left text-xs text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900">{l}</button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}`,
  });
