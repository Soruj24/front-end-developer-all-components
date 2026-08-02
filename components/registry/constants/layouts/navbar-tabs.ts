import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarTabs: RegistryEntry = entry({
    id: "navbar-tabs",
    title: "Tabs Underneath",
    description: "Navigation links rendered as underline tabs.",
    source: `import { useState } from "react";

export default function NavbarTabs() {
  const [tab, setTab] = useState("Overview");

  return (
    <nav className="flex w-full flex-col rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-black">
      <div className="flex h-9 items-center justify-between px-4">
        <span className="text-sm font-bold">Settings</span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] dark:bg-zinc-700">S</span>
      </div>
      <div className="flex gap-0 border-t border-black/[.08] px-2 dark:border-white/[.145]">
        {["Overview", "Security", "Billing"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={\`px-3 py-1.5 text-xs font-medium transition-colors \${tab === t ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-400"}\`}
          >
            {t}
          </button>
        ))}
      </div>
    </nav>
  );
}`,
  });
