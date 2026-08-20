"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const outerItems: AccordionItem[] = [
  {
    title: "Frontend",
    content: (
      <div className="pl-2">
        <Accordion
          items={[
            { title: "React", content: <p>A JavaScript library for building user interfaces.</p> },
            { title: "Vue", content: <p>A progressive framework for building UIs.</p> },
            { title: "Svelte", content: <p>Cybernetically enhanced web apps.</p> },
          ]}
          variant="ghost"
        />
      </div>
    ),
  },
  {
    title: "Backend",
    content: (
      <div className="pl-2">
        <Accordion
          items={[
            { title: "Node.js", content: <p>JavaScript runtime built on Chrome V8.</p> },
            { title: "Python", content: <p>A versatile programming language.</p> },
            { title: "Go", content: <p>Fast, statically typed, compiled language.</p> },
          ]}
          variant="ghost"
        />
      </div>
    ),
  },
];

export function NestedExample() {
  return (
    <div className="w-full max-w-md">
      <Accordion items={outerItems} />
    </div>
  );
}
