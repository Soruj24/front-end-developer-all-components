"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "./accordion";
import { ChevronDown, ChevronUp } from "lucide-react";

const items: AccordionItem[] = [
  {
    title: "Getting Started",
    content: <p className="text-sm">Learn the basics of setting up your project.</p>,
  },
  {
    title: "Advanced Topics",
    content: <p className="text-sm">Deep dive into advanced configuration options.</p>,
  },
  {
    title: "Best Practices",
    content: <p className="text-sm">Follow recommended patterns for production use.</p>,
  },
];

export function ExpandCollapseDemo() {
  const [open, setOpen] = useState<number[]>([]);

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex gap-2">
        <button onClick={() => setOpen(items.map((_, i) => i))} className="flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-zinc-700 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
          <ChevronDown className="h-3 w-3" />
          Expand All
        </button>
        <button onClick={() => setOpen([])} className="flex items-center gap-1.5 rounded-xl bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-600 transition-all hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">
          <ChevronUp className="h-3 w-3" />
          Collapse All
        </button>
      </div>
      <Accordion items={items} multiple defaultOpen={open} />
    </div>
  );
}

export function DisabledDemo() {
  const items: AccordionItem[] = [
    { title: "Active Section", content: <p className="text-sm">This section can be expanded.</p> },
    { title: "Locked Section", content: <p className="text-sm">This content is not accessible.</p>, disabled: true },
    { title: "Another Active", content: <p className="text-sm">This section works normally.</p> },
    { title: "Restricted", content: <p className="text-sm">This section is disabled.</p>, disabled: true },
  ];

  return (
    <div className="w-full max-w-sm">
      <Accordion items={items} defaultOpen={[0]} />
    </div>
  );
}
