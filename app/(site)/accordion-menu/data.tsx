import type { ReactNode } from "react";

export interface MenuItem {
  title: string;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export const navigationItems: MenuItem[] = [
  {
    title: "Getting Started",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-1 text-sm">
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Installation</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Quick Start</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Configuration</a>
      </div>
    ),
  },
  {
    title: "Components",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-1 text-sm">
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Button</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Card</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Dialog</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Input</a>
      </div>
    ),
  },
  {
    title: "API Reference",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-1 text-sm">
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">REST API</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">GraphQL</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Webhooks</a>
      </div>
    ),
  },
];

export const settingsItems: MenuItem[] = [
  {
    title: "Profile",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-2 text-sm">
        <p className="text-muted-foreground">Manage your personal information, avatar, and public profile.</p>
        <a href="#" className="text-primary hover:underline">Edit profile →</a>
      </div>
    ),
  },
  {
    title: "Notifications",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-2 text-sm">
        <p className="text-muted-foreground">Configure email, push, and in-app notification preferences.</p>
        <a href="#" className="text-primary hover:underline">Manage notifications →</a>
      </div>
    ),
  },
  {
    title: "Security",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-2 text-sm">
        <p className="text-muted-foreground">Update password, enable 2FA, and review active sessions.</p>
        <a href="#" className="text-primary hover:underline">Security settings →</a>
      </div>
    ),
  },
  {
    title: "Billing",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    content: (
      <div className="flex flex-col gap-2 text-sm">
        <p className="text-muted-foreground">View invoices, manage payment methods, and update your plan.</p>
        <a href="#" className="text-primary hover:underline">Billing portal →</a>
      </div>
    ),
  },
];

export const faqItems: MenuItem[] = [
  {
    title: "What is an accordion menu?",
    content: <p className="text-sm text-muted-foreground">An accordion menu is a vertical list of expandable sections that reveal content when clicked.</p>,
  },
  {
    title: "How do I customize the icons?",
    content: <p className="text-sm text-muted-foreground">Pass a React node to the icon property of each item to use custom SVG icons.</p>,
  },
  {
    title: "Can I open multiple sections at once?",
    content: <p className="text-sm text-muted-foreground">Yes, set the multi prop to true to allow multiple sections to be expanded simultaneously.</p>,
  },
  {
    title: "Is it keyboard accessible?",
    content: <p className="text-sm text-muted-foreground">Yes, the accordion supports full keyboard navigation with Enter, Space, Arrow keys, Home, and End.</p>,
  },
];

export const NAVIGATION_MENU_SOURCE = `import { useState } from "react";

interface MenuItem {
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: MenuItem[];
  multiple?: boolean;
  className?: string;
}

function Accordion({ items, multiple = false, className = "" }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

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
    <div className={\`divide-y divide-border \${className}\`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.title);
        return (
          <div key={item.title}>
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => toggle(item.title)}
              className="flex w-full items-center gap-3 px-4 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50"
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span className="flex-1">{item.title}</span>
              <svg
                className={\`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 \${isOpen ? "rotate-180" : ""}\`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={\`grid transition-[grid-template-rows] duration-300 \${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }\`}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={\`px-4 pb-4 text-sm text-muted-foreground transition-opacity duration-200 \${
                    isOpen ? "opacity-100" : "opacity-0"
                  }\`}
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

const menuItems = [
  {
    title: "Getting Started",
    icon: <RocketIcon />,
    content: (
      <div className="flex flex-col gap-1 text-sm">
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Installation</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Quick Start</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Configuration</a>
      </div>
    ),
  },
  {
    title: "Components",
    icon: <GridIcon />,
    content: (
      <div className="flex flex-col gap-1 text-sm">
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Button</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Card</a>
        <a href="#" className="rounded-md px-2 py-1 hover:bg-muted">Dialog</a>
      </div>
    ),
  },
];

export function AccordionMenu() {
  return <Accordion items={menuItems} />;
}`;

export const SETTINGS_PANEL_SOURCE = `import { useState } from "react";

interface MenuItem {
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

function SettingsAccordion({ items }: { items: MenuItem[] }) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (title: string) => {
    setOpenIds((prev) =>
      prev.includes(title)
        ? prev.filter((id) => id !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="divide-y divide-border rounded-xl border border-border">
      {items.map((item) => {
        const isOpen = openIds.includes(item.title);
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => toggle(item.title)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-muted"
            >
              {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
              <span className="flex-1">{item.title}</span>
              <svg
                className={\`h-4 w-4 text-muted-foreground transition-transform duration-300 \${
                  isOpen ? "rotate-180" : ""
                }\`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={\`grid transition-[grid-template-rows] duration-300 \${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }\`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="px-5 pb-4 text-sm text-muted-foreground">
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

const settingsItems = [
  {
    title: "Profile",
    icon: <UserIcon />,
    content: (
      <div className="flex flex-col gap-2 text-sm">
        <p>Manage your personal information and avatar.</p>
        <a href="#" className="text-primary hover:underline">Edit profile →</a>
      </div>
    ),
  },
  {
    title: "Notifications",
    icon: <BellIcon />,
    content: <p>Configure email and push notification preferences.</p>,
  },
];

export function SettingsPanel() {
  return <SettingsAccordion items={settingsItems} />;
}`;

export const FAQ_SOURCE = `import { useState } from "react";

interface FaqItem {
  title: string;
  content: React.ReactNode;
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (title: string) => {
    setOpenIds((prev) =>
      prev.includes(title)
        ? prev.filter((id) => id !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="divide-y divide-border rounded-xl border border-border">
      {items.map((item) => {
        const isOpen = openIds.includes(item.title);
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => toggle(item.title)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-muted"
            >
              <span>{item.title}</span>
              <svg
                className={\`h-4 w-4 text-muted-foreground transition-transform duration-300 \${
                  isOpen ? "rotate-180" : ""
                }\`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              className={\`grid transition-[grid-template-rows] duration-300 \${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }\`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="px-5 pb-4 text-sm text-muted-foreground">
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

const faqItems = [
  { title: "What is an accordion?", content: "A vertical list of expandable sections." },
  { title: "How do I customize it?", content: "Pass custom items with icons and content." },
];

export function FaqSection() {
  return <FaqAccordion items={faqItems} />;
}`;
