import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const skeletonCards: RegistryEntry = entry({
    id: "skeleton-cards",
    title: "Card Skeletons",
    description:
      "Blog, product, profile, and dashboard-stat card placeholder layouts.",
    source: `function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={\`animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded \${className}\`} />;
}

export default function SkeletonCards() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Blog Card</h3>
        <div className="animate-pulse space-y-3">
          <SkeletonBlock className="h-36 w-full rounded-lg" />
          <SkeletonBlock className="h-5 w-3/4" />
          <SkeletonBlock className="h-3 w-full" />
          <SkeletonBlock className="h-3 w-5/6" />
          <div className="flex gap-3 pt-1">
            <SkeletonBlock className="h-3 w-20" />
            <SkeletonBlock className="h-3 w-16" />
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Product Card</h3>
        <div className="animate-pulse space-y-3">
          <SkeletonBlock className="h-36 w-full rounded-lg" />
          <SkeletonBlock className="h-5 w-2/3" />
          <SkeletonBlock className="h-4 w-16" />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonBlock key={i} className="h-4 w-4" />
            ))}
            <SkeletonBlock className="h-4 w-8 ml-1" />
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Profile Card</h3>
        <div className="animate-pulse space-y-3">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="h-3 w-40" />
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 text-center">
                <SkeletonBlock className="h-5 w-8 mx-auto" />
                <SkeletonBlock className="h-3 w-12 mx-auto mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">Dashboard Stat</h3>
        <div className="animate-pulse space-y-3">
          <div className="flex items-start justify-between">
            <SkeletonBlock className="h-10 w-10 rounded-lg" />
            <SkeletonBlock className="h-6 w-16" />
          </div>
          <SkeletonBlock className="h-8 w-20" />
          <div className="flex gap-2">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-3 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
