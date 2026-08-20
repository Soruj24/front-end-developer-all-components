"use client";

import { ReactNode, useId, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItem {
  title: string;
  content: ReactNode;
  icon?: ReactNode;
  description?: string;
  disabled?: boolean;
  badge?: string;
}

export type AccordionVariant = "bordered" | "ghost" | "separated" | "boxed";

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  variant?: AccordionVariant;
  className?: string;
  defaultOpen?: number[];
}

const containerClasses: Record<AccordionVariant, string> = {
  bordered: "rounded-xl border border-border overflow-hidden",
  ghost: "",
  separated: "flex flex-col gap-2",
  boxed: "flex flex-col gap-1.5",
};

const itemClasses: Record<AccordionVariant, string> = {
  bordered: "",
  ghost: "",
  separated: "rounded-xl border border-border overflow-hidden bg-background",
  boxed: "rounded-xl border border-border bg-background overflow-hidden",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]",
        open && "rotate-180",
      )}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const Accordion = ({
  items,
  multiple = false,
  variant = "bordered",
  className,
  defaultOpen,
}: AccordionProps) => {
  const [openIds, setOpenIds] = useState<number[]>(
    defaultOpen ?? [],
  );
  const uid = useId();

  const toggle = useCallback(
    (index: number) => {
      if (items[index].disabled) return;
      setOpenIds((prev) => {
        if (prev.includes(index)) {
          return prev.filter((id) => id !== index);
        }
        if (multiple) {
          return [...prev, index];
        }
        return [index];
      });
    },
    [items, multiple],
  );

  return (
    <div className={cn(containerClasses[variant], className)}>
      {items.map((item, index) => {
        const isOpen = openIds.includes(index);
        const panelId = `${uid}-${index}`;
        const buttonId = `${panelId}-trigger`;

        return (
          <div
            key={item.title}
            className={cn(
              itemClasses[variant],
              variant === "bordered" &&
                index < items.length - 1 &&
                "border-b border-border last:border-b-0",
            )}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(index)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3.5 text-left",
                "text-sm font-medium text-foreground",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "disabled:cursor-not-allowed disabled:opacity-40",
                !isOpen && "hover:bg-muted/60",
                isOpen &&
                  variant === "bordered" &&
                  "bg-muted/40",
                isOpen &&
                  variant === "ghost" &&
                  "bg-muted/40",
                variant === "ghost" &&
                  "rounded-lg",
              )}
            >
              {item.icon && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {item.icon}
                </span>
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-medium leading-none">
                  {item.title}
                </span>
                {item.description && (
                  <span className="truncate text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </span>
                )}
              </div>
              {item.badge && (
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.badge}
                </span>
              )}
              <ChevronIcon open={isOpen} />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  aria-hidden={!isOpen}
                  className={cn(
                    "px-4 pb-4 text-sm text-muted-foreground leading-relaxed",
                    variant === "ghost" && "px-4 pt-1",
                    variant === "bordered" && "px-4 pt-1",
                    (variant === "separated" || variant === "boxed") &&
                      "px-4 pt-1",
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

Accordion.displayName = "Accordion";

export { Accordion };
export default Accordion;
