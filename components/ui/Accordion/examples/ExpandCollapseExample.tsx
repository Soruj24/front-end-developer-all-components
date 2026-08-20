"use client";

import { useState } from "react";
import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  { title: "What is an accordion menu?", content: <p>An accordion menu is a vertical list of expandable sections that reveal content when clicked.</p> },
  { title: "How do I customize the icons?", content: <p>Pass a React node to the icon property of each item to use custom SVG icons.</p> },
  { title: "Can I open multiple sections at once?", content: <p>Yes, set the multiple prop to true to allow multiple sections to be expanded simultaneously.</p> },
  { title: "Is it keyboard accessible?", content: <p>Yes, the accordion supports full keyboard navigation with Enter, Space, Arrow keys, Home, and End.</p> },
];

export function ExpandCollapseExample() {
  const [openAll, setOpenAll] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setOpenAll(true)}
          className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Expand All
        </button>
        <button
          type="button"
          onClick={() => setOpenAll(false)}
          className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Collapse All
        </button>
      </div>
      <Accordion
        key={String(openAll)}
        items={items}
        multiple
        defaultOpen={openAll ? [0, 1, 2, 3] : []}
      />
    </div>
  );
}
