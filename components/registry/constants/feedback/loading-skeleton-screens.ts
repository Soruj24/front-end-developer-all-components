import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const loadingSkeletonScreens: RegistryEntry = entry({
    id: "loading-skeleton-screens",
    title: "Skeleton Screens",
    description:
      "Full card, profile, article, product, and list-item placeholder screens.",
    source: `export default function LoadingSkeletonScreens() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="animate-pulse rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-4 h-40 w-full rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-2 h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-1 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-4 h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex gap-2">
          <div className="h-8 w-20 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-8 w-20 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        </div>
        <p className="mt-3 text-center text-[10px] text-zinc-400">Card Skeleton</p>
      </div>
      <div className="animate-pulse rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-4 flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex-1">
            <div className="mb-1 h-5 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
        <div className="mb-1 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-4 h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex gap-6 border-t border-zinc-200 pt-4 dark:border-zinc-700">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-1 h-6 w-10 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-3 w-8 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-zinc-400">Profile Skeleton</p>
      </div>
      <div className="animate-pulse rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-3 h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-1 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-1 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-4 h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-3 h-32 w-full rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-1 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
        <p className="mt-3 text-center text-[10px] text-zinc-400">Article Skeleton</p>
      </div>
      <div className="animate-pulse rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-4 h-44 w-full rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-2 h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-2 h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mb-3 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-700" />
          ))}
        </div>
        <div className="h-6 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
        <p className="mt-3 text-center text-[10px] text-zinc-400">Product Card Skeleton</p>
      </div>
      <div className="animate-pulse rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border-b border-zinc-200 py-3 last:border-b-0 dark:border-zinc-700"
          >
            <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="flex-1">
              <div className="mb-1 h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
        ))}
        <p className="mt-3 text-center text-[10px] text-zinc-400">List Item Skeleton</p>
      </div>
    </div>
  );
}`,
  });
