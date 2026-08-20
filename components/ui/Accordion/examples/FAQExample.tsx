"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  {
    title: "What is an accordion?",
    content: <p>An accordion is a vertically stacked set of interactive headings that each reveal a section of content.</p>,
  },
  {
    title: "How do I customize it?",
    content: <p>Pass custom items with icons, descriptions, badges, and content. Use the variant prop to change the visual style.</p>,
  },
  {
    title: "Is it accessible?",
    content: <p>Yes. It uses proper ARIA attributes, supports keyboard navigation with Enter, Space, Arrow keys, Home, and End.</p>,
  },
  {
    title: "Can I control it externally?",
    content: <p>Use the defaultOpen prop to set initial state. Use multiple to allow multiple open sections.</p>,
  },
  {
    title: "Does it work on mobile?",
    content: <p>Yes. The touch targets are sized appropriately and the animations are smooth on all devices.</p>,
  },
];

export function FAQExample() {
  return (
    <div className="w-full max-w-lg">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold text-foreground">Frequently Asked Questions</h3>
        <p className="mt-1 text-sm text-muted-foreground">Everything you need to know about the accordion component.</p>
      </div>
      <Accordion items={items} multiple variant="bordered" />
    </div>
  );
}
