"use client";

import { useState } from "react";
import { Accordion } from "./Accordion";
import { disabledItems, faqItems, simpleItems } from "./data";

function Label({ children }: { children: string }) {
  return (
    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </p>
  );
}

export function VariantsSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label>Bordered</Label>
          <Accordion items={faqItems.slice(0, 3)} startOpen={-1} />
        </div>
        <div>
          <Label>Ghost</Label>
          <Accordion items={faqItems.slice(0, 3)} variant="ghost" startOpen={-1} />
        </div>
        <div>
          <Label>Boxed</Label>
          <Accordion items={simpleItems} variant="boxed" startOpen={-1} />
        </div>
        <div>
          <Label>Separated</Label>
          <Accordion items={simpleItems} variant="separated" startOpen={-1} />
        </div>
      </div>
      <div>
        <Label>Minimal</Label>
        <Accordion items={faqItems.slice(0, 2)} variant="minimal" startOpen={-1} />
      </div>
    </section>
  );
}

export function OpenModeSection() {
  return (
    <section className="grid gap-6 sm:grid-cols-2">
      <div>
        <Label>Single (default)</Label>
        <Accordion items={faqItems.slice(0, 3)} startOpen={-1} />
      </div>
      <div>
        <Label>Multi</Label>
        <Accordion items={faqItems.slice(0, 3)} multi startOpen={-1} />
      </div>
    </section>
  );
}

export function ControlsSection() {
  const [expanded, setExpanded] = useState(true);
  return (
    <section>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {expanded ? "Collapse All" : "Expand All"}
        </button>
      </div>
      <Accordion
        key={String(expanded)}
        items={faqItems.slice(0, 3)}
        multi
        startOpen={expanded ? 0 : -1}
      />
    </section>
  );
}

export function DisabledSection() {
  return <Accordion items={disabledItems} startOpen={-1} />;
}

export function LongContentSection() {
  return null;
}

export function IconsSection() {
  return null;
}
