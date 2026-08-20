"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  {
    title: "Installation",
    content: (
      <div className="flex flex-col gap-3">
        <p>Run the following command to install the package:</p>
        <div className="rounded-lg bg-muted/50 px-4 py-3 font-mono text-xs">
          npm install @your-org/ui
        </div>
        <p>Then import the component in your project.</p>
      </div>
    ),
  },
  {
    title: "Configuration",
    content: (
      <div className="flex flex-col gap-3">
        <p>Create a config file in your project root:</p>
        <div className="rounded-lg bg-muted/50 px-4 py-3 font-mono text-xs leading-relaxed">
          <div>{'{'}</div>
          <div className="pl-4">{'"theme": "default",'}</div>
          <div className="pl-4">{'"animations": true,'}</div>
          <div>{'}'}</div>
        </div>
      </div>
    ),
  },
  {
    title: "Usage",
    content: (
      <div className="flex flex-col gap-3">
        <p>Import and use the component in your pages:</p>
        <div className="rounded-lg bg-muted/50 px-4 py-3 font-mono text-xs">
          {'<Accordion items={items} />'}
        </div>
      </div>
    ),
  },
];

export function CodeBlocksExample() {
  return (
    <div className="w-full max-w-lg">
      <Accordion items={items} multiple />
    </div>
  );
}
