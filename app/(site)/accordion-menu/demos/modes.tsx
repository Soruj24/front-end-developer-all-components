"use client";

import { Accordion, AccordionItem } from "./accordion";
import { Layers, Copy } from "lucide-react";

const items: AccordionItem[] = [
  { title: "Design Tokens", content: <p className="text-sm">Colors, typography, and spacing variables.</p> },
  { title: "Component API", content: <p className="text-sm">Props, slots, and configuration options.</p> },
  { title: "Theming", content: <p className="text-sm">Custom themes and dark mode setup.</p> },
];

export function SingleModeDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 text-zinc-400" />
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Single Mode (default)</p>
        </div>
        <Accordion items={items} defaultOpen={[0]} />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Copy className="h-3.5 w-3.5 text-zinc-400" />
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Multiple Mode</p>
        </div>
        <Accordion items={items} multiple defaultOpen={[0, 1]} />
      </div>
    </div>
  );
}
