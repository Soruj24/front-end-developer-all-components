"use client";

import { Accordion } from "../../Accordion";
import type { AccordionItem } from "../../Accordion";

const items: AccordionItem[] = [
  {
    title: "Getting Started",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-1">
        <a href="#" className="rounded-md px-2 py-1 text-sm hover:bg-muted transition-colors">Installation</a>
        <a href="#" className="rounded-md px-2 py-1 text-sm hover:bg-muted transition-colors">Quick Start</a>
        <a href="#" className="rounded-md px-2 py-1 text-sm hover:bg-muted transition-colors">Configuration</a>
      </div>
    ),
  },
  {
    title: "Components",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-1">
        <a href="#" className="rounded-md px-2 py-1 text-sm hover:bg-muted transition-colors">Button</a>
        <a href="#" className="rounded-md px-2 py-1 text-sm hover:bg-muted transition-colors">Card</a>
        <a href="#" className="rounded-md px-2 py-1 text-sm hover:bg-muted transition-colors">Dialog</a>
        <a href="#" className="rounded-md px-2 py-1 text-sm hover:bg-muted transition-colors">Input</a>
      </div>
    ),
  },
  {
    title: "API Reference",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-1">
        <a href="#" className="rounded-md px-2 py-1 text-sm hover:bg-muted transition-colors">REST API</a>
        <a href="#" className="rounded-md px-2 py-1 text-sm hover:bg-muted transition-colors">GraphQL</a>
        <a href="#" className="rounded-md px-2 py-1 text-sm hover:bg-muted transition-colors">Webhooks</a>
      </div>
    ),
  },
];

export function NavigationMenuExample() {
  return (
    <div className="w-full max-w-sm">
      <Accordion items={items} />
    </div>
  );
}
