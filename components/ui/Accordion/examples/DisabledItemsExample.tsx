"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  { title: "Active Section", content: <p>This section is enabled and can be expanded.</p> },
  { title: "Disabled Section", content: <p>This content is hidden.</p>, disabled: true },
  { title: "Another Active", content: <p>This section works normally.</p> },
  { title: "Also Disabled", content: <p>This is also locked.</p>, disabled: true },
];

export function DisabledItemsExample() {
  return (
    <div className="w-full max-w-md">
      <Accordion items={items} />
    </div>
  );
}
