"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  {
    title: "With Badge",
    badge: "New",
    content: <p>This item has a notification badge.</p>,
  },
  {
    title: "Popular",
    badge: "128",
    content: <p>This item shows a count badge.</p>,
  },
  {
    title: "No Badge",
    content: <p>This item has no badge, just a plain title.</p>,
  },
  {
    title: "Disabled with Badge",
    badge: "Soon",
    content: <p>This is disabled but still shows a badge.</p>,
    disabled: true,
  },
];

export function BadgesExample() {
  return (
    <div className="w-full max-w-md">
      <Accordion items={items} />
    </div>
  );
}
