import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const headerTabsBreadcrumbs: RegistryEntry = entry({
    id: "header-tabs-breadcrumbs",
    title: "Tabs & Breadcrumbs",
    description: "Tabbed sub-navigation and breadcrumb trails.",
    source: `import { useState } from "react";

export default function HeaderTabsBreadcrumbs() {
  const [tab, setTab] = useState("Overview");
  const frame =
    "flex h-64 w-full flex-col rounded-lg border border-black/[.08] dark:border-white/[.145]";
  const content =
    "flex flex-1 items-center justify-center bg-zinc-50 text-[10px] text-zinc-300 dark:bg-zinc-900";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-2">
      <div className={frame}>
        <header className="flex w-full flex-col">
          <div className="flex h-10 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            <span className="text-sm font-bold">Settings</span>
            <span className="text-xs text-zinc-400">👤</span>
          </div>
          <div className="flex gap-0 border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
            {["Overview", "Security", "Notifications", "Billing"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={\`px-3 py-2 text-xs font-medium transition-colors \${
                  tab === t
                    ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50"
                    : "text-zinc-400 hover:text-zinc-600"
                }\`}
              >
                {t}
              </button>
            ))}
          </div>
        </header>
        <div className={content}>{tab} Content</div>
      </div>

      <div className={frame}>
        <header className="flex h-11 items-center justify-between border-b border-black/[.08] bg-white px-4 dark:border-white/[.145] dark:bg-black">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-zinc-400">Home</span>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-400">Products</span>
            <span className="text-zinc-300">/</span>
            <span className="font-medium text-zinc-950 dark:text-zinc-50">Current</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Edit</span>
            <span>|</span>
            <span>Delete</span>
          </div>
        </header>
        <div className={content}>Product Details</div>
      </div>
    </div>
  );
}`,
  });
