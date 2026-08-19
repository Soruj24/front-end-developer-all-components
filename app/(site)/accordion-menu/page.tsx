"use client";

import { useState } from "react";
import { Accordion } from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import {
  navigationItems,
  settingsItems,
  faqItems,
  NAVIGATION_MENU_SOURCE,
  SETTINGS_PANEL_SOURCE,
  FAQ_SOURCE,
} from "./data";

function ExpandCollapseDemo() {
  const [openAll, setOpenAll] = useState(false);
  return (
    <div className="w-full max-w-md">
      <div className="mb-3">
        <button
          onClick={() => setOpenAll((p) => !p)}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
        >
          {openAll ? "Collapse All" : "Expand All"}
        </button>
      </div>
      <Accordion
        key={String(openAll)}
        items={faqItems}
        multiple
        startOpen={openAll ? 0 : -1}
      />
    </div>
  );
}

export default function AccordionMenuPage() {
  return (
    <ComponentDocPage
      name="Accordion Menu"
      category="Navigation"
      description="Multi-level accordion navigation menu with expand/collapse animations, icons, and keyboard navigation."
    >
      <PreviewPanel filename="AccordionMenu.tsx">
        <div className="w-full max-w-sm">
          <Accordion items={navigationItems} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={NAVIGATION_MENU_SOURCE}
        filename="AccordionMenu.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Navigation Menu"
          description="Expandable navigation with icons"
          code={NAVIGATION_MENU_SOURCE}
        >
          <div className="w-full max-w-sm">
            <Accordion items={navigationItems} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Settings Panel"
          description="Settings categories with descriptions"
          code={SETTINGS_PANEL_SOURCE}
        >
          <div className="w-full max-w-md">
            <Accordion items={settingsItems} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Expand / Collapse All"
          description="Toggle all sections open or closed"
          code={FAQ_SOURCE}
        >
          <ExpandCollapseDemo />
        </ExampleBlock>

        <ExampleBlock
          title="FAQ Section"
          description="Frequently asked questions with multi-open"
          code={FAQ_SOURCE}
        >
          <div className="w-full max-w-md">
            <Accordion items={faqItems} multiple />
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
