"use client";

import { AccordionSections } from "./Sections";
import { PatternSections } from "./Patterns";

export default function AccordionPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Accordion</h1>
        <p className="mt-1 text-muted-foreground">Expandable accordion with single/multi open, variants, and practical patterns.</p>
      </header>
      <AccordionSections />
      <PatternSections />
    </div>
  );
}
