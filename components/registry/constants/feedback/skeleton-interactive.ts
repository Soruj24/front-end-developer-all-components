import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const skeletonInteractive: RegistryEntry = entry({
    id: "skeleton-interactive",
    title: "Interactive Skeleton",
    description:
      "A reload button that swaps between a skeleton placeholder and a loaded profile.",
    source: `import { useState } from "react";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={\`animate-pulse bg-zinc-200 dark:bg-zinc-700 rounded \${className}\`} />;
}

export default function SkeletonInteractive() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setLoading(true);
    setVisible(false);
    setTimeout(() => {
      setLoading(false);
      setVisible(true);
    }, 2000);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {loading ? "Loading..." : "Reload"}
        </button>
        <span className="text-sm text-zinc-500">
          Status:{" "}
          <span className={\`font-medium \${loading ? "text-warning" : "text-emerald-500"}\`}>
            {loading ? "Loading" : "Loaded"}
          </span>
        </span>
      </div>

      {loading ? (
        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-3">
              <SkeletonBlock className="h-14 w-14 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-5 w-40" />
                <SkeletonBlock className="h-3 w-56" />
              </div>
            </div>
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-5/6" />
            <SkeletonBlock className="h-4 w-2/3" />
            <div className="flex gap-2 pt-1">
              <SkeletonBlock className="h-8 w-20 rounded-lg" />
              <SkeletonBlock className="h-8 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      ) : (
        visible && (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300">
                JD
              </div>
              <div>
                <h4 className="text-lg font-semibold">John Doe</h4>
                <p className="text-sm text-zinc-500">john.doe@example.com</p>
              </div>
            </div>
            <p className="mt-4 text-zinc-600 dark:text-zinc-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900">View Profile</button>
              <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm dark:border-zinc-600">Send Message</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}`,
  });
