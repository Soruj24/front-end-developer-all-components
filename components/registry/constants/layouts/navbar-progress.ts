import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarProgress: RegistryEntry = entry({
    id: "navbar-progress",
    title: "With Progress Bar",
    description: "A course nav with a lesson progress indicator.",
    source: `export default function NavbarProgress() {
  return (
    <nav className="flex w-full flex-col rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
      <div className="flex h-10 items-center justify-between px-4">
        <span className="text-sm font-bold">Course</span>
        <span className="text-xs text-zinc-400">45%</span>
      </div>
      <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800">
        <div className="h-full w-[45%] rounded-r-full bg-blue-500" />
      </div>
    </nav>
  );
}`,
  });
