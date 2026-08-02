"use client";

import { useState } from "react";
import { Accordion } from "./Accordion";
import { disabledItems, faqItems, itemsWithIcons, longItems, simpleItems } from "./data";

export function AccordionSections() {
  return (
    <>
      <VariantsSection />
      <OpenModeSection />
      <ControlsSection />
      <DisabledSection />
      <LongContentSection />
      <IconsSection />
    </>
  );
}

function Label({ children }: { children: string }) {
  return <p className="mb-2 text-xs font-medium text-muted-foreground">{children}</p>;
}

function VariantsSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Variants</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label>Bordered</Label>
          <Accordion items={faqItems} startOpen={-1} />
        </div>
        <div>
          <Label>Ghost</Label>
          <Accordion items={faqItems.slice(0, 4)} variant="ghost" startOpen={-1} />
        </div>
        <div>
          <Label>Boxed</Label>
          <Accordion items={simpleItems} variant="boxed" startOpen={-1} />
        </div>
        <div>
          <Label>Separated</Label>
          <Accordion items={simpleItems} variant="separated" startOpen={-1} />
        </div>
        <div className="sm:col-span-2">
          <Label>Minimal</Label>
          <Accordion items={longItems.slice(0, 2)} variant="minimal" startOpen={-1} />
        </div>
      </div>
    </section>
  );
}

function OpenModeSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Single vs Multi Open</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label>Single (default)</Label>
          <Accordion items={faqItems.slice(0, 3)} startOpen={-1} />
        </div>
        <div>
          <Label>Multi</Label>
          <Accordion items={faqItems.slice(0, 3)} multi startOpen={-1} />
        </div>
      </div>
    </section>
  );
}

function ControlsSection() {
  const [expanded, setExpanded] = useState(true);
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">With Expand/Collapse Controls</h2>
      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setExpanded((p) => !p)}
          className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border"
        >
          {expanded ? "Collapse All" : "Expand All"}
        </button>
      </div>
      <Accordion key={String(expanded)} items={faqItems.slice(0, 3)} multi startOpen={expanded ? 0 : -1} />
    </section>
  );
}

function DisabledSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Disabled Items</h2>
      <Accordion items={disabledItems} startOpen={-1} />
    </section>
  );
}

function LongContentSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Long Content</h2>
      <Accordion items={longItems} startOpen={-1} />
    </section>
  );
}

function IconsSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">With Icons</h2>
      <Accordion items={itemsWithIcons} startOpen={-1} />
    </section>
  );
}
