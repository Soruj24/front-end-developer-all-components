"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import { TABS, type DocsTabId } from "./docs-data";
import {
  CustomizationPanel,
  FaqPanel,
  InstallationPanel,
  StructurePanel,
  UsagePanel,
} from "./components/DocsPanels";

const PANELS: Record<DocsTabId, () => React.JSX.Element> = {
  installation: InstallationPanel,
  "project-structure": StructurePanel,
  usage: UsagePanel,
  customization: CustomizationPanel,
  faq: FaqPanel,
};

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<DocsTabId>("installation");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onTabKeyDown = (event: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (index + 1) % TABS.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + TABS.length) % TABS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = TABS.length - 1;
    if (next !== null) {
      event.preventDefault();
      setActiveTab(TABS[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  const ActivePanel = PANELS[activeTab];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Documentation
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Getting Started
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Everything you need to know to start building with our component library.
            Copy, paste, and customize.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Documentation sections"
          className="mb-8 flex flex-wrap items-center justify-center gap-1 rounded-lg border border-border/60 bg-muted/30 p-1"
        >
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`docs-panel-${tab.id}`}
              id={`docs-tab-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={cn(
                "min-h-[44px] rounded-md px-4 py-2 text-sm font-medium transition-colors sm:min-h-0",
                FOCUS.ring,
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`docs-panel-${activeTab}`}
          aria-labelledby={`docs-tab-${activeTab}`}
          className="rounded-lg border border-border/60 bg-background p-6 sm:p-8"
        >
          <ActivePanel />
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Ready to build?{" "}
            <Link
              href="/components"
              className="rounded font-medium text-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Browse all components
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
