"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  { title: "Single Open Mode", content: <p>Only one section can be open at a time. Click another to switch.</p> },
  { title: "Second Section", content: <p>This will close the first section when opened.</p> },
  { title: "Third Section", content: <p>Only the most recently clicked section stays open.</p> },
];

export function SingleModeExample() {
  return (
    <div className="w-full max-w-md">
      <Accordion items={items} defaultOpen={[0]} />
    </div>
  );
}

const multiItems: AccordionItem[] = [
  { title: "Multiple Open Mode", content: <p>Multiple sections can be open at the same time.</p> },
  { title: "Second Section", content: <p>This opens without closing others.</p> },
  { title: "Third Section", content: <p>All three can be expanded simultaneously.</p> },
];

export function MultiModeExample() {
  return (
    <div className="w-full max-w-md">
      <Accordion items={multiItems} multiple defaultOpen={[0, 2]} />
    </div>
  );
}
