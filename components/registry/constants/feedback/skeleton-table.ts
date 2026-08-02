import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const skeletonTable: RegistryEntry = entry({
    id: "skeleton-table",
    title: "Table Skeletons",
    description: "A table header, rows, avatars, and status pill placeholders.",
    source: `function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={\`animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded \${className}\`} />;
}

export default function SkeletonTable() {
  return (
    <div className="w-full animate-pulse space-y-2 overflow-x-auto">
      <div className="flex gap-4 border-b border-zinc-200 pb-3 dark:border-zinc-700">
        <SkeletonBlock className="h-4 w-8" />
        <SkeletonBlock className="h-4 w-40" />
        <SkeletonBlock className="h-4 flex-1" />
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-4 w-20" />
      </div>
      {[1, 2, 3, 4, 5].map((row) => (
        <div key={row} className="flex items-center gap-4 border-b border-zinc-100 py-3 dark:border-zinc-800">
          <SkeletonBlock className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1">
            <SkeletonBlock className="h-3 w-32" />
            <SkeletonBlock className="h-2 w-20" />
          </div>
          <SkeletonBlock className="h-3 w-28" />
          <SkeletonBlock className="h-3 w-20" />
          <SkeletonBlock className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}`,
  });
