import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const skeletonMedia: RegistryEntry = entry({
    id: "skeleton-media",
    title: "Media Skeletons",
    description:
      "Image placeholders, a video player frame, and avatar size variants.",
    source: `function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={\`animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded \${className}\`} />;
}

export default function SkeletonMedia() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Image Placeholders</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <SkeletonBlock className="h-28 w-48" />
            <p className="mt-1 text-xs text-zinc-400">16:9</p>
          </div>
          <div>
            <SkeletonBlock className="h-24 w-24" />
            <p className="mt-1 text-xs text-zinc-400">1:1</p>
          </div>
          <div>
            <SkeletonBlock className="h-24 w-24 rounded-full" />
            <p className="mt-1 text-xs text-zinc-400">Circle</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Video Player</h3>
        <div className="space-y-2">
          <SkeletonBlock className="h-40 w-full" />
          <div className="flex gap-2">
            <SkeletonBlock className="h-2 flex-1" />
            <SkeletonBlock className="h-2 w-16" />
          </div>
          <div className="flex gap-2">
            <SkeletonBlock className="h-6 w-8" />
            <SkeletonBlock className="h-6 w-8" />
            <SkeletonBlock className="h-6 w-8" />
            <SkeletonBlock className="h-6 w-8" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Avatar Sizes</h3>
        <div className="flex items-end gap-4">
          <div className="text-center">
            <SkeletonBlock className="h-6 w-6 rounded-full" />
            <p className="mt-1 text-xs text-zinc-400">xs</p>
          </div>
          <div className="text-center">
            <SkeletonBlock className="h-8 w-8 rounded-full" />
            <p className="mt-1 text-xs text-zinc-400">sm</p>
          </div>
          <div className="text-center">
            <SkeletonBlock className="h-10 w-10 rounded-full" />
            <p className="mt-1 text-xs text-zinc-400">md</p>
          </div>
          <div className="text-center">
            <SkeletonBlock className="h-14 w-14 rounded-full" />
            <p className="mt-1 text-xs text-zinc-400">lg</p>
          </div>
          <div className="text-center">
            <SkeletonBlock className="h-20 w-20 rounded-full" />
            <p className="mt-1 text-xs text-zinc-400">xl</p>
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
