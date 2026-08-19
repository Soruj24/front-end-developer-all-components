export const ACCORDION_TABS_SOURCE = `"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  content: string;
}

interface AccordionTabItem {
  id: string;
  title: string;
  tabs?: Tab[];
  content?: string;
}

function NestedTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];
  return (
    <div>
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={\`-mb-px border-b-2 px-3 py-1.5 text-xs font-medium \${
              active === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            }\`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <p className="pt-3 text-sm text-muted-foreground">{current?.content}</p>
    </div>
  );
}

export function AccordionTabs({ items }: { items: AccordionTabItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="w-full space-y-2">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="overflow-hidden rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted/50"
            >
              <span className="text-sm font-medium">{item.title}</span>
              <ChevronDown
                className={\`h-4 w-4 text-muted-foreground transition-transform duration-300 \${
                  isOpen ? "rotate-180" : ""
                }\`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-border px-4 pb-4 pt-3">
                {item.tabs ? (
                  <NestedTabs tabs={item.tabs} />
                ) : (
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}`;

export const BASIC_EXAMPLE = `<AccordionTabs
  items={[
    { id: "1", title: "Getting Started", content: "Welcome to the docs." },
    { id: "2", title: "Configuration", content: "Set up your workspace." },
  ]}
/>`;

export const NESTED_EXAMPLE = `<AccordionTabs
  items={[
    {
      id: "settings",
      title: "Settings Panel",
      tabs: [
        { id: "general", label: "General", content: "General settings content." },
        { id: "privacy", label: "Privacy", content: "Privacy controls." },
      ],
    },
  ]}
/>`;

export const ANIMATED_EXAMPLE = `<AccordionTabs items={items} animated />
// Animated variant eases the chevron rotation and panel reveal.`;