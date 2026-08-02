"use client";

import { useState } from "react";
import type { AccordionItemData } from "./data";

export type AccordionVariant = "bordered" | "ghost" | "boxed" | "separated" | "minimal";

const containerClasses: Record<AccordionVariant, string> = {
  bordered: "divide-y divide-border rounded-xl border border-border",
  ghost: "divide-y divide-border",
  boxed: "flex flex-col gap-2",
  separated: "flex flex-col gap-2",
  minimal: "divide-y divide-border",
};

export function Accordion({
  items,
  multi = false,
  variant = "bordered",
  startOpen = 0,
}: {
  items: AccordionItemData[];
  multi?: boolean;
  variant?: AccordionVariant;
  startOpen?: number;
}) {
  const [open, setOpen] = useState<number[]>([startOpen]);

  const toggle = (i: number) => {
    if (items[i].disabled) return;
    setOpen((prev) => {
      if (!multi) return prev.includes(i) ? [] : [i];
      return prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i];
    });
  };

  const boxed = variant === "boxed" || variant === "separated";

  return (
    <div className={containerClasses[variant]}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={item.title} className={boxed ? "overflow-hidden rounded-xl border border-border" : ""}>
            <button
              onClick={() => toggle(i)}
              disabled={item.disabled}
              className={`flex w-full items-center justify-between bg-background px-5 py-4 text-left text-sm font-medium transition-colors ${
                item.disabled
                  ? "cursor-not-allowed opacity-40"
                  : isOpen
                    ? "bg-muted/50"
                    : "hover:bg-muted/40 dark:hover:bg-muted/50"
              }`}
            >
              <span>{item.title}</span>
              <svg
                className={`h-4 w-4 text-muted-foreground/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="bg-white px-5 pb-4 pt-1 text-sm text-muted-foreground dark:bg-zinc-900 dark:text-muted-foreground/70">
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AccordionItem({ title, body }: AccordionItemData) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors ${
          open ? "bg-muted/50" : "hover:bg-muted/40 dark:hover:bg-muted/50"
        }`}
      >
        <span>{title}</span>
        <svg
          className={`h-4 w-4 text-muted-foreground/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="bg-white px-4 pb-3 pt-1 text-sm text-muted-foreground dark:bg-zinc-900 dark:text-muted-foreground/70">
            {body}
          </div>
        </div>
      </div>
    </div>
  );
}
