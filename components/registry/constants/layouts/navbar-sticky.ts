import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarSticky: RegistryEntry = entry({
    id: "navbar-sticky",
    title: "Sticky Top",
    description: "A blurred bar that stays pinned while content scrolls.",
    source: `export default function NavbarSticky() {
  return (
    <div className="flex w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <nav className="sticky top-0 flex h-10 items-center justify-between rounded-t-lg border-b border-black/[.08] bg-white/80 px-4 backdrop-blur dark:border-white/[.145] dark:bg-black/80">
        <span className="text-sm font-bold">Sticky</span>
        <div className="flex gap-4 text-xs text-zinc-500">
          <span>Section 1</span>
          <span>Section 2</span>
        </div>
      </nav>
      <div className="flex h-10 items-center justify-center text-[10px] text-zinc-300">Content below</div>
    </div>
  );
}`,
  });
