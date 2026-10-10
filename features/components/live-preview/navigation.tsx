"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  Accordion,
  Breadcrumb,
  Dock,
  FloatingToolbar,
  Tabs,
} from "@/components/ui";

export const navigation: Record<string, () => ReactNode> = {
  accordion: () => <AccordionDemo />,

  tabs: () => <TabsDemo />,

  breadcrumb: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Button" },
      ]}
    />
  ),

  dock: () => (
    <Dock
      items={[
        { id: "files", label: "Files", icon: <span className="text-base">📁</span> },
        { id: "search", label: "Search", icon: <span className="text-base">⌕</span> },
        { id: "terminal", label: "Terminal", icon: <span className="text-base">&gt;_</span>, active: true },
        { id: "settings", label: "Settings", icon: <span className="text-base">⚙</span> },
      ]}
      draggable={false}
    />
  ),

  "floating-toolbar": () => (
    <div className="relative flex w-full items-center justify-center py-6">
      <FloatingToolbar
        position="absolute"
        selectionLabel="3 selected"
        groups={[
          [{ id: "bold", label: "Bold", icon: <span className="text-xs font-bold">B</span> }],
          [
            { id: "link", label: "Link", icon: <span className="text-xs">⛓</span> },
            { id: "code", label: "Code", icon: <span className="font-mono text-xs">&lt;/&gt;</span> },
          ],
        ]}
      />
    </div>
  ),
};

function AccordionDemo() {
  const [multiple, setMultiple] = useState(false);
  return (
    <div className="w-full max-w-md space-y-3">
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={multiple}
          onChange={(e) => setMultiple(e.target.checked)}
          className="h-4 w-4 accent-primary"
        />
        Allow multiple open sections
      </label>
      <Accordion
        multiple={multiple}
        defaultOpen={[0]}
        items={[
          {
            title: "Getting started",
            description: "Install and first steps",
            content: (
              <p>
                Install the package, import the component, and pass an items
                array. Keyboard users can move through sections with Tab and
                toggle them with Enter or Space.
              </p>
            ),
          },
          {
            title: "Customization",
            description: "Variants and badges",
            badge: "New",
            content: (
              <p>
                Pick from bordered, ghost, separated, or boxed variants, and
                add icons, descriptions, or badges to any section header.
              </p>
            ),
          },
          {
            title: "Accessibility",
            description: "ARIA wiring included",
            content: (
              <p>
                Each trigger wires aria-expanded to its panel region, and
                disabled sections are skipped when toggling.
              </p>
            ),
          },
        ]}
      />
    </div>
  );
}

function TabsDemo() {
  const [active, setActive] = useState("overview");
  return (
    <div className="w-full max-w-md">
      <Tabs
        variant="pills"
        tabs={[
          { id: "overview", label: "Overview", content: <p className="text-sm text-muted-foreground">Package stats and metadata.</p> },
          { id: "usage", label: "Usage", badge: 12, content: <p className="text-sm text-muted-foreground">Import examples and CLI commands.</p> },
          { id: "changelog", label: "Changelog", content: <p className="text-sm text-muted-foreground">Version history and release notes.</p> },
        ]}
        activeTab={active}
        onChange={setActive}
      />
    </div>
  );
}
