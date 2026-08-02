import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const skeletonList: RegistryEntry = entry({
    id: "skeleton-list",
    title: "List Skeletons",
    description:
      "Horizontal avatar, vertical contact, and notification list placeholders.",
    source: `function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={\`animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded \${className}\`} />;
}

export default function SkeletonList() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Horizontal Avatar List</h3>
        <div className="animate-pulse flex gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <SkeletonBlock className="h-12 w-12 rounded-full" />
              <SkeletonBlock className="h-3 w-14" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Vertical Contact List</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
              <SkeletonBlock className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <SkeletonBlock className="h-3 w-28" />
                <SkeletonBlock className="h-2 w-44" />
              </div>
              <SkeletonBlock className="h-3 w-12" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">Notification List</h3>
        <div className="animate-pulse space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
              <SkeletonBlock className="h-8 w-8 rounded-lg" />
              <div className="flex-1 space-y-1">
                <SkeletonBlock className="h-3 w-48" />
                <SkeletonBlock className="h-2 w-36" />
              </div>
              <SkeletonBlock className="h-2 w-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
