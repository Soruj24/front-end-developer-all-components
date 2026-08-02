import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sidebarNestedTree: RegistryEntry = entry({
    id: "sidebar-nested-tree",
    title: "Nested Tree",
    description: "Expandable tree navigation with nested project items.",
    source: `import { useState } from "react";

export default function SidebarNestedTree() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ Projects: true, Settings: false });

  return (
    <div className="flex h-64 w-full overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <div className="flex w-40 flex-col gap-0.5 overflow-y-auto border-r border-black/[.08] bg-zinc-50 p-2 dark:border-white/[.145] dark:bg-black">
        <span className="mb-1 px-2 text-[10px] font-bold">Workspace</span>
        <button className="rounded-md px-2 py-1 text-left text-xs text-zinc-600 hover:bg-black/[.04] dark:text-zinc-400">Dashboard</button>
        <div>
          <button
            onClick={() => setExpanded({ ...expanded, Projects: !expanded.Projects })}
            className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-left text-xs text-zinc-500 hover:bg-black/[.04]"
          >
            <span className={\`text-[10px] transition-transform \${expanded.Projects ? "rotate-90" : ""}\`}>▸</span>
            Projects
          </button>
          {expanded.Projects && (
            <div className="ml-4 flex flex-col">
              {["Project A", "Project B"].map((p) => (
                <button key={p} className="rounded-md px-2 py-0.5 text-left text-[10px] text-zinc-400 hover:bg-black/[.04]">{p}</button>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setExpanded({ ...expanded, Settings: !expanded.Settings })}
            className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-left text-xs text-zinc-500 hover:bg-black/[.04]"
          >
            <span className={\`text-[10px] transition-transform \${expanded.Settings ? "rotate-90" : ""}\`}>▸</span>
            Settings
          </button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
    </div>
  );
}`,
  });
