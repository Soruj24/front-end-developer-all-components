import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardBasic: RegistryEntry = entry({
    id: "card-basic",
    title: "Basic & Image Cards",
    description: "Simple, image-top, and image-bottom card layouts.",
    source: `export default function CardBasic() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <span className="text-3xl">📄</span>
        <h3 className="mt-3 font-semibold">Basic Card</h3>
        <p className="mt-1 text-sm text-zinc-500">A simple card with title and description. Perfect for minimal layouts.</p>
      </div>
      <div className="overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-40 items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-5xl dark:from-blue-900 dark:to-purple-900">🖼️</div>
        <div className="p-4">
          <h3 className="font-semibold">Image Top</h3>
          <p className="mt-1 text-sm text-zinc-500">Card with image at the top, content below.</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="p-4">
          <h3 className="font-semibold">Image Bottom</h3>
          <p className="mt-1 text-sm text-zinc-500">Image placed at the bottom for variety.</p>
        </div>
        <div className="flex h-32 items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200 text-4xl dark:from-amber-900 dark:to-orange-900">⬇️</div>
      </div>
    </div>
  );
}`,
  });
