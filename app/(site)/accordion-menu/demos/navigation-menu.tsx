"use client";

import { Accordion, AccordionItem } from "./accordion";
import { Rocket, LayoutGrid, Code, Shield, Zap, Settings, ChevronRight } from "lucide-react";

const items: AccordionItem[] = [
  {
    title: "Getting Started",
    icon: <Rocket className="h-4 w-4" />,
    content: (
      <div className="flex flex-col gap-1">
        {["Installation", "Quick Start", "Configuration"].map((t) => (
          <a key={t} href="#" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
            <ChevronRight className="h-3 w-3 text-zinc-400" />
            {t}
          </a>
        ))}
      </div>
    ),
  },
  {
    title: "Components",
    icon: <LayoutGrid className="h-4 w-4" />,
    content: (
      <div className="flex flex-col gap-1">
        {["Button", "Card", "Dialog", "Input"].map((t) => (
          <a key={t} href="#" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
            <ChevronRight className="h-3 w-3 text-zinc-400" />
            {t}
          </a>
        ))}
      </div>
    ),
  },
  {
    title: "API Reference",
    icon: <Code className="h-4 w-4" />,
    content: (
      <div className="flex flex-col gap-1">
        {["REST API", "GraphQL", "Webhooks"].map((t) => (
          <a key={t} href="#" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
            <ChevronRight className="h-3 w-3 text-zinc-400" />
            {t}
          </a>
        ))}
      </div>
    ),
  },
];

export function NavigationMenuDemo() {
  return (
    <div className="w-full max-w-sm">
      <Accordion items={items} defaultOpen={[0]} />
    </div>
  );
}
