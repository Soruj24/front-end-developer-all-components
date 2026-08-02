import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const badgeVariants: RegistryEntry = entry({
    id: "badge-variants",
    title: "Variants",
    description: "Soft-tinted, solid, and outline badge variants.",
    source: `export default function BadgeVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="rounded-full bg-zinc-100 px-2 py-1 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">default</span>
      <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-100">primary</span>
      <span className="rounded-full bg-purple-100 px-2 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-100">secondary</span>
      <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-100">success</span>
      <span className="rounded-full bg-yellow-100 px-2 py-1 text-sm font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">warning</span>
      <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-100">error</span>
      <span className="rounded-full border border-zinc-300 px-2 py-1 text-sm font-medium text-zinc-700 dark:border-zinc-600 dark:text-zinc-300">outline</span>
    </div>
  );
}`,
  });
