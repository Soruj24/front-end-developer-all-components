"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface PreviewTab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface AnimatedTabsProps {
  tabs: PreviewTab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * Capsule segmented control with a sliding active indicator.
 * The pill is positioned by measuring the active button directly against the
 * DOM (no state in effects), so the slide stays on the compositor.
 */
export function AnimatedTabs({ tabs, active, onChange, className }: AnimatedTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mountedRef = useRef(false);

  useLayoutEffect(() => {
    const index = tabs.findIndex((tab) => tab.id === active);
    const pill = pillRef.current;
    const button = buttonRefs.current[index];
    if (!pill || !button) return;

    if (!mountedRef.current) {
      mountedRef.current = true;
      pill.style.transition = "none";
      requestAnimationFrame(() => {
        pill.style.transition = "";
      });
    }
    pill.style.width = `${button.offsetWidth}px`;
    pill.style.transform = `translateX(${button.offsetLeft}px)`;
    pill.setAttribute("data-ready", "true");
  }, [tabs, active]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Preview views"
      className={cn(
        "relative inline-flex items-center gap-1 rounded-full border border-border bg-muted p-1",
        className
      )}
    >
      <span
        ref={pillRef}
        data-ready="false"
        className="absolute inset-y-1 left-0 rounded-full bg-background opacity-0 shadow-sm ring-1 ring-border transition-all duration-300 ease-out data-[ready=true]:opacity-100"
        aria-hidden="true"
      />
      {tabs.map((tab, index) => {
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            ref={(node) => {
              buttonRefs.current[index] = node;
            }}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
