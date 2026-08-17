"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Accordion } from "@/components/ui";

const installCommand = `npx component-library@latest add accordion-menu`;

const usageCode = `import { Accordion } from "@/components/ui";

const menuItems = [
  {
    title: "Getting Started",
    icon: <span className="text-lg">🚀</span>,
    content: <p className="text-sm">Introduction and setup guides.</p>,
  },
  {
    title: "Components",
    icon: <span className="text-lg">🧩</span>,
    content: <p className="text-sm">Browse all available components.</p>,
  },
];

export default function Example() {
  return <Accordion items={menuItems} />;
}`;

const navigationItems = [
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

const settingsItems = [
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

const faqItems = [
  {
    title: "What is an accordion menu?",
    content: <p className="text-sm text-muted-foreground">An accordion menu is a vertical list of expandable sections that reveal content when clicked, commonly used for navigation and FAQ layouts.</p>,
  },
  {
    title: "How do I customize the icons?",
    content: <p className="text-sm text-muted-foreground">Pass a React node to the icon property of each item to use custom SVG icons or any other element.</p>,
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

export default function AccordionMenuPage() {
  const [openAll, setOpenAll] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Accordion Menu
          </h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Multi-level accordion navigation menu with expand/collapse animations,
          icons, and keyboard navigation. Ideal for sidebars, settings panels,
          and documentation navigation.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Navigation Menu</h3>
          <ComponentPreview id="accordion-menu-navigation">
            <div className="w-full max-w-sm">
              <Accordion items={navigationItems} startOpen={0} />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Settings Panel</h3>
          <ComponentPreview id="accordion-menu-settings">
            <div className="w-full max-w-md">
              <Accordion items={settingsItems} startOpen={-1} />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Expand / Collapse All</h3>
          <ComponentPreview id="accordion-menu-expandable">
            <div className="w-full max-w-md">
              <div className="mb-3 flex gap-2">
                <button
                  onClick={() => setOpenAll((p) => !p)}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                >
                  {openAll ? "Collapse All" : "Expand All"}
                </button>
              </div>
              <Accordion key={String(openAll)} items={faqItems} multi startOpen={openAll ? 0 : -1} />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Multi Open</h3>
          <ComponentPreview id="accordion-menu-multi">
            <div className="w-full max-w-md">
              <Accordion items={faqItems} multi startOpen={-1} />
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">items</td>
                <td className="px-4 py-3 text-muted-foreground">AccordionItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">multi</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">startOpen</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-1</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">"default" | "ghost" | "boxed" | "separated" | "minimal"</td>
                <td className="px-4 py-3 text-muted-foreground">"default"</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
