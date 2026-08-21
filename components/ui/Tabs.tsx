"use client";

import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/cn";

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: "underline" | "pills" | "capsule";
  orientation?: "horizontal" | "vertical";
}

const listClasses = {
  underline: "border-b border-border/60",
  pills: "gap-1.5",
  capsule: "gap-1 rounded-xl bg-muted/50 p-1 backdrop-blur-sm",
};

const tabClasses = {
  underline: cn(
    "relative flex items-center gap-2 px-4 py-2.5",
    "text-[13px] font-medium text-muted-foreground",
    "transition-colors duration-150",
    "hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-40",
  ),
  pills: cn(
    "flex items-center gap-2 rounded-lg px-3.5 py-2",
    "text-[13px] font-medium text-muted-foreground",
    "transition-all duration-150",
    "hover:bg-muted/60 hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:shadow-sm",
  ),
  capsule: cn(
    "flex items-center gap-2 rounded-lg px-3.5 py-2",
    "text-[13px] font-medium text-muted-foreground",
    "transition-all duration-150",
    "hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm data-[active=true]:ring-1 data-[active=true]:ring-border/60",
  ),
};

const badgeBase =
  "ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums";

function Badge({
  count,
  active,
}: {
  count: string | number;
  active: boolean;
}) {
  return (
    <span
      className={cn(
        badgeBase,
        active
          ? "bg-primary/15 text-primary"
          : "bg-muted text-muted-foreground",
      )}
    >
      {count}
    </span>
  );
}

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = "underline",
  orientation = "horizontal",
}: TabsProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-row gap-4" : "flex-col gap-3",
      )}
    >
      <div
        ref={listRef}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          listClasses[variant],
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              data-active={isActive}
              onClick={() => !tab.disabled && onChange(tab.id)}
              onKeyDown={(e) => {
                const enabled = tabs.filter((t) => !t.disabled);
                const idx = enabled.findIndex((t) => t.id === tab.id);
                let next: string | undefined;
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  next = enabled[(idx + 1) % enabled.length]?.id;
                } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  next = enabled[(idx - 1 + enabled.length) % enabled.length]?.id;
                } else if (e.key === "Home") {
                  e.preventDefault();
                  next = enabled[0]?.id;
                } else if (e.key === "End") {
                  e.preventDefault();
                  next = enabled[enabled.length - 1]?.id;
                }
                if (next) {
                  onChange(next);
                  listRef.current
                    ?.querySelector<HTMLElement>(`[data-tab="${next}"]`)
                    ?.focus();
                }
              }}
              data-tab={tab.id}
              className={cn(tabClasses[variant], isActive && variant === "underline" && "text-foreground")}
            >
              {tab.icon && (
                <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <Badge count={tab.badge} active={isActive} />
              )}
              {variant === "underline" && isActive && (
                <span className="absolute inset-x-0 -bottom-px h-[2px] origin-center rounded-full bg-primary transition-all duration-200 ease-out" />
              )}
            </button>
          );
        })}
      </div>
      <div
        key={activeTab}
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className={cn(
          "min-h-0 animate-fade-slide",
          "rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        {activeContent}
      </div>
    </div>
  );
};

export default Tabs;
