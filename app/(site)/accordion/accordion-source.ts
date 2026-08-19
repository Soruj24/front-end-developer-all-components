export const ACCORDION_SOURCE = `"use client";

import { useState } from "react";

interface AccordionItemData {
  title: string;
  body: string;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItemData[];
  multi?: boolean;
  variant?: "bordered" | "ghost" | "boxed" | "separated" | "minimal";
  startOpen?: number;
}

export function Accordion({
  items,
  multi = false,
  variant = "bordered",
  startOpen = 0,
}: AccordionProps) {
  const [open, setOpen] = useState<number[]>([startOpen]);

  const toggle = (i: number) => {
    if (items[i].disabled) return;
    setOpen((prev) =>
      multi
        ? prev.includes(i)
          ? prev.filter((idx) => idx !== i)
          : [...prev, i]
        : prev.includes(i)
          ? []
          : [i],
    );
  };

  const boxed = variant === "boxed" || variant === "separated";

  return (
    <div className={boxed ? "flex flex-col gap-2" : "divide-y divide-border rounded-xl border border-border"}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={item.title} className={boxed ? "overflow-hidden rounded-xl border border-border" : ""}>
            <button
              onClick={() => toggle(i)}
              disabled={item.disabled}
              className={\`flex w-full items-center justify-between bg-background px-5 py-4 text-left text-sm font-medium transition-colors disabled:opacity-40 \${
                isOpen ? "bg-muted/50" : "hover:bg-muted/40"
              }\`}
            >
              <span>{item.title}</span>
              <svg
                className={\`h-4 w-4 text-muted-foreground/70 transition-transform duration-200 \${isOpen ? "rotate-180" : ""}\`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={\`grid transition-all duration-200 \${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}\`}>
              <div className="overflow-hidden px-5 pb-4 pt-1 text-sm text-muted-foreground">
                {item.body}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}`;

export const VARIANTS_EXAMPLE = `<Accordion items={faqItems} variant="bordered" />
<Accordion items={faqItems.slice(0, 4)} variant="ghost" />
<Accordion items={simpleItems} variant="boxed" />
<Accordion items={simpleItems} variant="separated" />
<Accordion items={longItems.slice(0, 2)} variant="minimal" />`;

export const OPEN_MODE_EXAMPLE = `<Accordion items={faqItems.slice(0, 3)} />
<Accordion items={faqItems.slice(0, 3)} multi />`;

export const CONTROLS_EXAMPLE = `<Accordion items={faqItems.slice(0, 3)} multi startOpen={expanded ? 0 : -1} />`;

export const DISABLED_EXAMPLE = `<Accordion items={disabledItems} startOpen={-1} />`;

export const LONG_EXAMPLE = `<Accordion items={longItems} startOpen={-1} />`;

export const ICONS_EXAMPLE = `<Accordion items={itemsWithIcons} startOpen={-1} />`;

export const GROUPED_EXAMPLE = `<Accordion items={section.items} variant="boxed" startOpen={-1} />`;

export const USECASES_EXAMPLE = `<Accordion items={useCase.items} variant="boxed" startOpen={-1} />`;

export const NESTED_EXAMPLE = `<Accordion items={nestedData} startOpen={-1} />`;

export const FAQ_EXAMPLE = `<AccordionItem title={item.q} body={item.a} />`;