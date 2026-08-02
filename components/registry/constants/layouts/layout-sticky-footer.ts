import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutStickyFooter: RegistryEntry = entry({
    id: "layout-sticky-footer",
    title: "Sticky Footer",
    description: "Content pushes the footer to the bottom.",
    source: `export default function LayoutStickyFooter() {
  return (
    <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
      <div className="flex h-7 items-center justify-center border-t border-black/[.08] bg-zinc-100 text-[10px] text-zinc-400 dark:border-white/[.145] dark:bg-zinc-900">© 2026 Company</div>
    </div>
  );
}`,
  });
