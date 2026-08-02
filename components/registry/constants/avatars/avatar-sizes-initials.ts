import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const avatarSizesInitials: RegistryEntry = entry({
    id: "avatar-sizes-initials",
    title: "Sizes (Initials)",
    description: "Initials avatars in four sizes.",
    source: `export default function AvatarSizesInitials() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">JD</div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">JD</div>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-200 text-lg font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">JD</div>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-200 text-2xl font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">JD</div>
    </div>
  );
}`,
  });
