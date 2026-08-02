import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutSidebarTabs: RegistryEntry = entry({
    id: "layout-sidebar-tabs",
    title: "Sidebar with Tabs",
    description: "Sidebar navigation and interactive tabbed content.",
    source: `import { useState } from "react";

export default function LayoutSidebarTabs() {
  const [tab, setTab] = useState("Overview");

  return (
    <div className="flex h-48 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <div className="flex w-14 flex-col gap-1 border-r border-black/[.08] bg-zinc-50 p-2 dark:border-white/[.145] dark:bg-black">
        {["⌂", "📊", "⚙"].map((icon, i) => (
          <button key={i} className={\`flex h-7 items-center justify-center rounded-md text-xs \${i === 0 ? "bg-zinc-200 dark:bg-zinc-800" : "text-zinc-400"}\`}>{icon}</button>
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex gap-0 border-b border-black/[.08] bg-white px-2 dark:border-white/[.145] dark:bg-black">
          {["Overview", "Details", "Activity"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={\`px-2 py-1.5 text-[10px] font-medium transition-colors \${tab === t ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400"}\`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">{tab}</div>
      </div>
    </div>
  );
}`,
  });
