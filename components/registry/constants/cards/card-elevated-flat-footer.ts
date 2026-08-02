import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardElevatedFlatFooter: RegistryEntry = entry({
    id: "card-elevated-flat-footer",
    title: "Elevated, Flat & Header-Footer",
    description: "Shadow, borderless, and segmented card bodies.",
    source: `export default function CardElevatedFlatFooter() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-3">
      <div className="rounded-lg bg-white p-5 shadow-lg dark:bg-zinc-900 dark:shadow-zinc-900/50">
        <span className="text-3xl">📦</span>
        <h3 className="mt-3 font-semibold">Elevated Card</h3>
        <p className="mt-1 text-sm text-zinc-500">Shadow for visual depth and hierarchy.</p>
      </div>
      <div className="rounded-lg p-5">
        <span className="text-3xl">🧻</span>
        <h3 className="mt-3 font-semibold">Flat Card</h3>
        <p className="mt-1 text-sm text-zinc-500">Borderless, shadowless minimal card.</p>
      </div>
      <div className="rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="border-b border-black/[.08] px-4 py-3 font-semibold dark:border-white/[.145]">Header</div>
        <div className="p-4 text-sm text-zinc-500">Card body content goes here in the middle.</div>
        <div className="border-t border-black/[.08] px-4 py-3 text-xs text-zinc-400 dark:border-white/[.145]">Footer</div>
      </div>
    </div>
  );
}`,
  });
