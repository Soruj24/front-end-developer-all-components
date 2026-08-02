import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutOverlaySidebar: RegistryEntry = entry({
    id: "layout-overlay-sidebar",
    title: "Overlay Sidebar",
    description: "Content with a sliding sidebar overlay.",
    source: `import { useState } from "react";

export default function LayoutOverlaySidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">
        <button onClick={() => setOpen(!open)} className="rounded bg-foreground px-2 py-1 text-[10px] text-background">{open ? "Close" : "Open"}</button>
      </div>
      {open && (
        <>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute right-0 top-0 flex h-full w-20 flex-col gap-1 bg-white p-2 shadow-lg dark:bg-zinc-950">
            <button onClick={() => setOpen(false)} className="self-end text-xs text-zinc-400">✕</button>
            <span className="text-[10px] font-medium">Panel</span>
            <span className="text-[10px] text-zinc-400">Details</span>
          </div>
        </>
      )}
    </div>
  );
}`,
  });
