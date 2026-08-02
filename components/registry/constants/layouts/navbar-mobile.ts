import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarMobile: RegistryEntry = entry({
    id: "navbar-mobile",
    title: "Mobile Hamburger",
    description: "A hamburger toggle that expands a stacked menu.",
    source: `import { useState } from "react";

export default function NavbarMobile() {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <nav className="flex h-10 items-center justify-between bg-white px-4 dark:bg-black">
        <span className="text-sm font-bold">Menu</span>
        <button onClick={() => setOpen(!open)} className="text-sm text-zinc-500">{open ? "✕" : "☰"}</button>
      </nav>
      {open && (
        <div className="flex flex-col gap-0.5 border-t border-black/[.08] bg-white px-4 py-2 dark:border-white/[.145] dark:bg-black">
          {["Home", "Products", "Services", "About", "Contact"].map((l) => (
            <span key={l} className="rounded-md px-2 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400">{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}`,
  });
