"use client";

import { AccordionItem } from "./Accordion";
import { faqQuestions } from "./data";

export function FaqSection() {
  return (
    <div className="flex flex-col gap-3">
      {faqQuestions.slice(0, 5).map((item, i) => (
        <AccordionItem key={i} title={item.q} body={item.a} />
      ))}
    </div>
  );
}
