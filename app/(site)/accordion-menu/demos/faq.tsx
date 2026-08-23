"use client";

import { Accordion, AccordionItem } from "./accordion";

const items: AccordionItem[] = [
  {
    title: "What is an accordion menu?",
    content: <p className="text-sm text-zinc-600 dark:text-zinc-400">An accordion menu is a vertical list of expandable sections that reveal content when clicked. It helps organize information in a compact, hierarchical layout.</p>,
  },
  {
    title: "How do I customize the icons?",
    content: <p className="text-sm text-zinc-600 dark:text-zinc-400">Pass a React node to the icon property of each item to use custom SVG icons. The icon appears in the trigger button alongside the title.</p>,
  },
  {
    title: "Can I open multiple sections at once?",
    content: <p className="text-sm text-zinc-600 dark:text-zinc-400">Yes, set the multiple prop to true to allow multiple sections to be expanded simultaneously. Without it, only one section can be open at a time.</p>,
  },
  {
    title: "Is it keyboard accessible?",
    content: <p className="text-sm text-zinc-600 dark:text-zinc-400">Yes, the accordion supports full keyboard navigation with Enter, Space, Arrow keys, Home, and End keys for navigating between triggers.</p>,
  },
  {
    title: "Does it support dark mode?",
    content: <p className="text-sm text-zinc-600 dark:text-zinc-400">Yes, the accordion automatically adapts to dark mode using Tailwind CSS dark variant classes for borders, backgrounds, and text colors.</p>,
  },
];

export function FAQDemo() {
  return (
    <div className="w-full max-w-lg">
      <Accordion items={items} multiple defaultOpen={[0]} />
    </div>
  );
}
