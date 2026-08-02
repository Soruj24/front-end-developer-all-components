import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const skeletonText: RegistryEntry = entry({
    id: "skeleton-text",
    title: "Text Skeletons",
    description:
      "Single-line, multi-line, heading + body, and word-level text placeholders.",
    source: `function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={\`animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded \${className}\`} />;
}

export default function SkeletonText() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Single Line</h3>
        <SkeletonBlock className="h-4 w-72" />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Multi-Line</h3>
        <div className="space-y-2">
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-3/4" />
          <SkeletonBlock className="h-4 w-5/6" />
          <SkeletonBlock className="h-4 w-2/3" />
          <SkeletonBlock className="h-4 w-4/5" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Heading + Body</h3>
        <div className="space-y-3">
          <SkeletonBlock className="h-6 w-1/3" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-3/4" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Word-Level</h3>
        <div className="flex flex-wrap gap-1.5">
          {["w-12", "w-16", "w-10", "w-20", "w-14", "w-8", "w-18", "w-12", "w-16", "w-10", "w-14", "w-8", "w-20", "w-12", "w-10", "w-16"].map((w, i) => (
            <SkeletonBlock key={i} className={\`h-4 \${w}\`} />
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
