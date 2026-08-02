import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarSplit: RegistryEntry = entry({
    id: "navbar-split",
    title: "Split Nav",
    description: "Primary links on the left, utility links on the right.",
    source: `export default function NavbarSplit() {
  return (
    <nav className="flex h-10 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
      <div className="flex items-center gap-6">
        <span className="text-sm font-bold">App</span>
        <div className="flex gap-4 text-xs text-zinc-500">
          <span className="text-zinc-950 dark:text-zinc-50">Dashboard</span>
          <span>Team</span>
          <span>Projects</span>
        </div>
      </div>
      <div className="flex gap-4 text-xs text-zinc-500">
        <span className="text-zinc-400">Help</span>
        <span>Settings</span>
      </div>
    </nav>
  );
}`,
  });
