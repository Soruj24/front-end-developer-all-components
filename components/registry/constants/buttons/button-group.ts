import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroup: RegistryEntry = entry({
    id: "button-group",
    title: "Button Group",
    description: "Segmented controls sharing one rounded border.",
    dependencies: ["react"],
    source: `export default function ButtonGroup() {
  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex overflow-hidden rounded-full border border-black/[.08] dark:border-white/[.145]">
        <button className="bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-[#383838] dark:hover:bg-[#ccc]">Day</button>
        <button className="border-x border-black/[.08] bg-transparent px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-white/[.06]">Week</button>
        <button className="bg-transparent px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-black/[.04] dark:text-zinc-50 dark:hover:bg-white/[.06]">Month</button>
        <button className="bg-transparent px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-black/[.04] dark:text-zinc-50 dark:hover:bg-white/[.06]">Year</button>
      </div>
      <div className="inline-flex overflow-hidden rounded-full border border-black/[.08] dark:border-white/[.145]">
        <button className="bg-transparent p-2.5 text-zinc-950 hover:bg-black/[.04] dark:text-zinc-50 dark:hover:bg-white/[.06]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <button className="border-x border-black/[.08] bg-foreground p-2.5 text-background dark:border-white/[.145]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <button className="bg-transparent p-2.5 text-zinc-950 hover:bg-black/[.04] dark:text-zinc-50 dark:hover:bg-white/[.06]">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </div>
  );
}`,
  });
