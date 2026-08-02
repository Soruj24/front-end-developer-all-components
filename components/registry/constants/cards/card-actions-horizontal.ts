import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardActionsHorizontal: RegistryEntry = entry({
    id: "card-actions-horizontal",
    title: "Actions & Horizontal Layouts",
    description: "Action buttons plus left/right horizontal media layouts.",
    source: `export default function CardActionsHorizontal() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <span className="text-3xl">⚡</span>
        <h3 className="mt-3 font-semibold">Actions Card</h3>
        <p className="mt-1 text-sm text-zinc-500">Card with primary and secondary action buttons.</p>
        <div className="mt-4 flex gap-2">
          <button className="rounded-md bg-zinc-900 px-4 py-1.5 text-sm text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900">Save</button>
          <button className="rounded-md border px-4 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700">Cancel</button>
        </div>
      </div>
      <div className="flex overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex w-32 shrink-0 items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-200 text-4xl dark:from-emerald-900 dark:to-teal-900">➡️</div>
        <div className="flex-1 p-4">
          <h3 className="font-semibold">Horizontal Left</h3>
          <p className="mt-1 text-sm text-zinc-500">Image on the left, content on the right.</p>
        </div>
      </div>
      <div className="flex overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex-1 p-4">
          <h3 className="font-semibold">Horizontal Right</h3>
          <p className="mt-1 text-sm text-zinc-500">Content on the left, image on the right.</p>
        </div>
        <div className="flex w-32 shrink-0 items-center justify-center bg-gradient-to-br from-rose-100 to-pink-200 text-4xl dark:from-rose-900 dark:to-pink-900">⬅️</div>
      </div>
    </div>
  );
}`,
  });
