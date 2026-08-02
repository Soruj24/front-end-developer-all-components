import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarShortcuts: RegistryEntry = entry({
    id: "navbar-shortcuts",
    title: "Keyboard Shortcuts",
    description: "Nav labels paired with shortcut key hints.",
    source: `export default function NavbarShortcuts() {
  return (
    <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
      <span className="text-sm font-bold">Shortcuts</span>
      <div className="flex items-center gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1">
          Search <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘K</kbd>
        </span>
        <span className="flex items-center gap-1">
          Home <kbd className="rounded border border-black/[.08] px-1 text-[10px] dark:border-white/[.145]">⌘1</kbd>
        </span>
      </div>
    </nav>
  );
}`,
  });
