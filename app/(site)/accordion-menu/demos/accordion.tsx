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
  bordered: "rounded-2xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-700 dark:bg-zinc-950",
  ghost: "",
  separated: "flex flex-col gap-2",
  boxed: "flex flex-col gap-1.5",
};

const itemClasses: Record<AccordionVariant, string> = {
  bordered: "",
  ghost: "",
  separated: "rounded-2xl border border-zinc-200 overflow-hidden bg-white dark:border-zinc-700 dark:bg-zinc-950",
  boxed: "rounded-2xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-700 dark:bg-zinc-950",
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn(
        "h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] dark:text-zinc-500",
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

export function Accordion({
  items,
  multiple = false,
  variant = "bordered",
  className,
  defaultOpen,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<number[]>(defaultOpen ?? []);
  const uid = useId();

  const toggle = useCallback(
    (index: number) => {
      if (items[index].disabled) return;
      setOpenIds((prev) => {
        if (prev.includes(index)) return prev.filter((id) => id !== index);
        if (multiple) return [...prev, index];
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
                "border-b border-zinc-100 last:border-b-0 dark:border-zinc-800",
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
                "text-sm font-medium text-zinc-900 dark:text-zinc-100",
                "transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950",
                "disabled:cursor-not-allowed disabled:opacity-40",
                !isOpen && "hover:bg-zinc-50 dark:hover:bg-zinc-900",
                isOpen && variant === "bordered" && "bg-zinc-50 dark:bg-zinc-900",
                isOpen && variant === "ghost" && "bg-zinc-50 dark:bg-zinc-900",
                variant === "ghost" && "rounded-xl",
              )}
            >
              {item.icon && (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 transition-colors dark:bg-zinc-800 dark:text-zinc-400">
                  {item.icon}
                </span>
              )}
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-sm font-semibold leading-none text-zinc-900 dark:text-zinc-100">
                  {item.title}
                </span>
                {item.description && (
                  <span className="truncate text-xs text-zinc-500 leading-relaxed dark:text-zinc-400">
                    {item.description}
                  </span>
                )}
              </div>
              {item.badge && (
                <span className="shrink-0 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
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
                  className="px-4 pb-4 text-sm text-zinc-600 leading-relaxed dark:text-zinc-400"
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
}

Accordion.displayName = "Accordion";
