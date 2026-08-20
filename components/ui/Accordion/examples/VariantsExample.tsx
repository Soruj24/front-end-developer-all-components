"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem, AccordionVariant } from "../../Accordion";

const items: AccordionItem[] = [
  { title: "Design", content: <p>Create beautiful interfaces with our design system.</p> },
  { title: "Develop", content: <p>Build with modern tools and frameworks.</p> },
  { title: "Deploy", content: <p>Ship to production with confidence.</p> },
];

const variants: { label: string; variant: AccordionVariant }[] = [
  { label: "Bordered", variant: "bordered" },
  { label: "Ghost", variant: "ghost" },
  { label: "Separated", variant: "separated" },
  { label: "Boxed", variant: "boxed" },
];

export function VariantsExample() {
  return (
    <div className="flex flex-col gap-8">
      {variants.map(({ label, variant }) => (
        <div key={variant} className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          <Accordion items={items} variant={variant} />
        </div>
      ))}
    </div>
  );
}
