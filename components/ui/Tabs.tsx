"use client";

import { ReactNode, useRef } from "react";

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

const Tabs = ({
  tabs,
  activeTab,
  onChange,
  variant = "underline",
  orientation = "horizontal",
}: TabsProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  const variantClasses = {
    underline:
      "border-b border-border gap-0",
    pills: "gap-2",
    capsule:
      "gap-1 rounded-full bg-muted p-1",
  };

  const tabBaseClasses = {
    underline:
      "relative flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:opacity-50 disabled:pointer-events-none",
    pills:
      "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-[background-color,color,transform] duration-200 ease-out hover:bg-muted hover:text-foreground active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none data-[active=true]:bg-muted data-[active=true]:text-foreground",
    capsule:
      "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-[background-color,color,box-shadow,transform] duration-200 ease-out hover:text-foreground active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none data-[active=true]:bg-surface data-[active=true]:text-foreground data-[active=true]:shadow-sm",
  };

  const badgeClasses =
    "ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground";

  return (
    <div
      className={`flex ${orientation === "vertical" ? "flex-row gap-4" : "flex-col gap-4"}`}
    >
      <div
        ref={listRef}
        role="tablist"
        className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"} ${variantClasses[variant]}`}
      >
        {tabs.map((tab) => (
            <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={tab.id === activeTab}
            aria-controls={`panel-${tab.id}`}
            disabled={tab.disabled}
            data-active={tab.id === activeTab}
            onClick={() => !tab.disabled && onChange(tab.id)}
            className={tabBaseClasses[variant]}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={badgeClasses}>{tab.badge}</span>
            )}
            {variant === "underline" && tab.id === activeTab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 origin-center rounded-full bg-foreground animate-scale-in-fast" />
            )}
          </button>
        ))}
      </div>
      <div
        key={activeTab}
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="min-h-0 animate-fade-slide focus-visible:ring-ring outline-none focus-visible:ring-2"
      >
        {activeContent}
      </div>
    </div>
  );
};

export default Tabs;
