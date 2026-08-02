"use client";

import { ReactNode, useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  title: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  className?: string;
}

const Accordion = ({ items, multiple = false, className = "" }: AccordionProps) => {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const uid = useId();

  const toggle = (title: string) => {
    setOpenIds((prev) => {
      if (prev.includes(title)) {
        return prev.filter((id) => id !== title);
      }
      if (multiple) {
        return [...prev, title];
      }
      return [title];
    });
  };

  return (
    <div className={`divide-y divide-border ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.title);
        const panelId = `${uid}-${index}`;
        return (
          <div key={item.title}>
            <button
              type="button"
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={panelId}
              id={`${panelId}-button`}
              onClick={() => toggle(item.title)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left text-sm font-medium text-foreground transition-[background-color,color] duration-200 ease-out hover:bg-muted active:bg-muted/80 disabled:opacity-50 disabled:pointer-events-none"
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span className="flex-1">{item.title}</span>
              <svg
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-button`}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  aria-hidden={!isOpen}
                  className={cn(
                    "px-4 pb-4 text-sm text-muted-foreground transition-opacity duration-200 ease-out",
                    isOpen ? "opacity-100" : "opacity-0"
                  )}
                >
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
