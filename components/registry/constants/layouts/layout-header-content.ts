import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutHeaderContent: RegistryEntry = entry({
    id: "layout-header-content",
    title: "Header + Content & Top Nav Grid",
    description: "Top navigation bars with full-width content below.",
    source: `export default function LayoutHeaderContent() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-9 items-center justify-between border-b border-black/[.08] bg-white px-3 dark:border-white/[.145] dark:bg-black">
          <span className="text-xs font-bold">Brand</span>
          <div className="flex gap-3 text-[10px] text-zinc-500">
            <span>Home</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900">Content</div>
      </div>
      <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex h-8 items-center justify-between border-b border-black/[.08] bg-white px-3 text-[10px] font-bold dark:border-white/[.145] dark:bg-black">
          <span>App</span>
          <div className="flex gap-3 text-[10px] font-normal text-zinc-500">
            <span className="text-zinc-950 dark:text-zinc-50">Home</span>
            <span>Products</span>
          </div>
        </div>
        <div className="flex flex-1 gap-2 bg-zinc-50 p-2 dark:bg-zinc-900">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-1 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Item {i}</div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
