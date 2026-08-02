import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutRightPanel: RegistryEntry = entry({
    id: "layout-right-panel",
    title: "Right Panel & Settings",
    description: "Main content with a details or settings panel on the right.",
    source: `export default function LayoutRightPanel() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Main Content</div>
        <div className="flex w-24 flex-col gap-2 border-l border-black/[.08] bg-zinc-50 p-3 text-[10px] dark:border-white/[.145] dark:bg-black">
          <span className="font-medium text-zinc-600 dark:text-zinc-300">Details</span>
          <div className="h-2 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-2 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-2 rounded bg-zinc-200 dark:bg-zinc-700" />
          <button className="mt-auto rounded bg-foreground py-1 text-[10px] text-background">Action</button>
        </div>
      </div>
      <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
        <div className="flex w-24 flex-col gap-0.5 border-r border-black/[.08] bg-zinc-50 p-2 text-[10px] dark:border-white/[.145] dark:bg-black">
          {["General", "Appearance", "Notifications", "Privacy"].map((item, i) => (
            <button key={i} className={\`rounded px-2 py-1 text-left \${i === 0 ? "bg-zinc-200 font-medium dark:bg-zinc-800" : "text-zinc-400"}\`}>{item}</button>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2 bg-white p-3 dark:bg-zinc-950">
          <span className="text-xs font-medium">General Settings</span>
          <div className="h-2 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-2 w-1/3 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="mt-auto flex gap-2 self-end">
            <div className="h-5 w-14 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-5 w-14 rounded bg-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}`,
  });
