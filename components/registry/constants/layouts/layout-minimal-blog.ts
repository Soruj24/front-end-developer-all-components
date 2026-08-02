import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutMinimalBlog: RegistryEntry = entry({
    id: "layout-minimal-blog",
    title: "Minimal Blog",
    description: "Centered article layout with a narrow column.",
    source: `export default function LayoutMinimalBlog() {
  return (
    <div className="flex h-48 w-full flex-col items-center overflow-hidden rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-zinc-950">
      <div className="flex h-full w-3/4 flex-col justify-center gap-2">
        <div className="h-2 w-1/4 rounded bg-zinc-300 dark:bg-zinc-600" />
        <div className="h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-2 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-2 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-2 w-2/3 rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>
    </div>
  );
}`,
  });
