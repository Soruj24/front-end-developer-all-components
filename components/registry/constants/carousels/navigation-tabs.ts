import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navigationTabs: RegistryEntry = entry({
    id: "navigation-tabs",
    title: "Tabs",
    description: "Segmented tabs that switch the visible panel.",
    source: `import { useState } from "react";

const tabItems = ["Details", "Reviews", "Shipping"];

export default function NavigationTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex w-full flex-col gap-3">
      <div
        role="tablist"
        aria-label="Product info"
        className="flex w-fit items-center gap-1 rounded-xl border border-border bg-muted/40 p-1"
      >
        {tabItems.map((tab, i) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={i === activeTab}
            onClick={() => setActiveTab(i)}
            className={\`rounded-lg px-4 py-1.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 \${
              i === activeTab
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }\`}
          >
            {tab}
          </button>
        ))}
      </div>
      <p role="tabpanel" className="text-sm text-muted-foreground">
        Showing content for &ldquo;{tabItems[activeTab]}&rdquo;.
      </p>
    </div>
  );
}`,
    });
