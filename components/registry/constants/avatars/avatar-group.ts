import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const avatarGroup: RegistryEntry = entry({
    id: "avatar-group",
    title: "Avatar Group",
    description: "Overlapping stacks with an overflow counter.",
    source: `export default function AvatarGroup() {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-zinc-300 text-sm font-medium text-zinc-700 dark:border-zinc-900 dark:bg-zinc-600 dark:text-zinc-300">JD</div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-zinc-300 text-sm font-medium text-zinc-700 dark:border-zinc-900 dark:bg-zinc-600 dark:text-zinc-300">AK</div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-zinc-300 text-sm font-medium text-zinc-700 dark:border-zinc-900 dark:bg-zinc-600 dark:text-zinc-300">ML</div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-zinc-300 text-sm font-medium text-zinc-700 dark:border-zinc-900 dark:bg-zinc-600 dark:text-zinc-300">RS</div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-sm font-medium text-zinc-500 dark:border-zinc-900 dark:bg-zinc-800 dark:text-zinc-400">+3</div>
      </div>
    </div>
  );
}`,
  });
