import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationTabs: RegistryEntry = entry({
    id: "navigation-tabs",
    title: "Tabs",
    description: "Underline tabs that switch active content.",
    source: `import { useState } from "react";

const tabItems = ["Details", "Reviews", "Shipping"];

export default function NavigationTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex border-b border-black/[.08] dark:border-white/[.145]">
        {tabItems.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={\`px-4 py-2 text-sm font-medium transition-colors \${i === activeTab ? "border-b-2 border-zinc-950 text-zinc-950 dark:border-zinc-50 dark:text-zinc-50" : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50"}\`}
          >
            {tab}
          </button>
        ))}
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Showing content for &ldquo;{tabItems[activeTab]}&rdquo;.
      </p>
    </div>
  );
}`,
  });
