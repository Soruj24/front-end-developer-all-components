import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const avatarSizesImage: RegistryEntry = entry({
    id: "avatar-sizes-image",
    title: "Sizes (Image)",
    description: "Image avatars using a gradient placeholder.",
    source: `export default function AvatarSizesImage() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <div className="h-8 w-8 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 font-medium text-white" />
      </div>
      <div className="h-10 w-10 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 font-medium text-white" />
      </div>
      <div className="h-14 w-14 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-lg font-medium text-white">AK</div>
      </div>
      <div className="h-20 w-20 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-2xl font-medium text-white">AK</div>
      </div>
    </div>
  );
}`,
  });
