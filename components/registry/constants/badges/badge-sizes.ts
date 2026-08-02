import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const badgeSizes: RegistryEntry = entry({
    id: "badge-sizes",
    title: "Sizes",
    description: "Small, medium, and large badges.",
    source: `export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-xs font-medium dark:bg-zinc-800">sm badge</span>
      <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm font-medium dark:bg-zinc-800">md badge</span>
      <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-base font-medium dark:bg-zinc-800">lg badge</span>
    </div>
  );
}`,
  });
