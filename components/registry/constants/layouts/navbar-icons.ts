import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarIcons: RegistryEntry = entry({
    id: "navbar-icons",
    title: "Icons & Notification Badge",
    description: "Icon groups, count badges, and social icon navs.",
    source: `export default function NavbarIcons() {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">Social</span>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-zinc-400">🔍</span>
          <span className="text-zinc-400">🔔</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] dark:bg-zinc-700">JD</span>
        </div>
      </nav>
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">Inbox</span>
        <div className="flex items-center gap-3">
          <span className="relative">
            <span className="text-sm">🔔</span>
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[7px] font-bold text-white">5</span>
          </span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] dark:bg-zinc-700">JD</span>
        </div>
      </nav>
      <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
        <span className="text-sm font-bold">Social</span>
        <div className="flex gap-2 text-sm">
          <span className="text-zinc-400">🐦</span>
          <span className="text-zinc-400">📷</span>
          <span className="text-zinc-400">💼</span>
          <span className="text-zinc-400">▶</span>
        </div>
      </nav>
    </div>
  );
}`,
  });
