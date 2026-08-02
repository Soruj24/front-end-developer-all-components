"use client";

import { Accordion, AccordionItem } from "./Accordion";
import { faqQuestions, nestedData, sections, useCases } from "./data";

export function PatternSections() {
  return (
    <>
      <GroupedSection />
      <UseCasesSection />
      <NestedSection />
      <FaqSection />
    </>
  );
}

function GroupedSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Grouped Sections</h2>
      <div className="flex flex-col gap-4">
        {sections.map((sec) => (
          <div key={sec.title}>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">{sec.title}</div>
            <Accordion items={sec.items} variant="boxed" startOpen={-1} />
          </div>
        ))}
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Use Cases</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {useCases.map((uc) => (
          <div key={uc.label}>
            <p className="mb-1 text-sm font-medium">{uc.label}</p>
            <p className="mb-2 text-xs text-muted-foreground">{uc.desc}</p>
            <Accordion items={uc.items} variant="boxed" startOpen={-1} />
          </div>
        ))}
      </div>
    </section>
  );
}

function NestedSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Nested (Accordion in Accordion)</h2>
      <Accordion items={nestedData} startOpen={-1} />
    </section>
  );
}

function FaqSection() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Full Page FAQ</h2>
      <div className="space-y-3">
        {faqQuestions.map((item, i) => (
          <AccordionItem key={i} title={item.q} body={item.a} />
        ))}
      </div>
    </section>
  );
}
