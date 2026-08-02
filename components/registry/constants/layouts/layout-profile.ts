import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutProfile: RegistryEntry = entry({
    id: "layout-profile",
    title: "Profile Layout",
    description: "Avatar header with interactive tabs below.",
    source: `import { useState } from "react";

export default function LayoutProfile() {
  const [tab, setTab] = useState("Posts");

  return (
    <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
      <div className="flex items-center gap-3 border-b border-black/[.08] bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm">👤</span>
        <div>
          <div className="text-xs font-bold">Alex Rivera</div>
          <div className="text-[10px] text-white/70">@alexriv</div>
        </div>
      </div>
      <div className="flex gap-0 border-b border-black/[.08] bg-white px-3 dark:border-white/[.145] dark:bg-black">
        {["Posts", "Photos", "About"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={\`px-3 py-1.5 text-[10px] font-medium \${tab === t ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400"}\`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">{tab}</div>
    </div>
  );
}`,
  });
