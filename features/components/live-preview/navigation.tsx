"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import {
  Accordion,
  Breadcrumb,
  Dock,
  FloatingToolbar,
  Stepper,
  Tabs,
} from "@/components/ui";

export const navigation: Record<string, () => ReactNode> = {
  accordion: () => (
    <div className="w-full max-w-md">
      <Accordion
        multiple
        items={[
          { title: "What is the registry?", content: "A catalog of 1,000+ dependency-free UI components.", icon: <span>▣</span> },
          { title: "How do I install a component?", content: "Run the CLI command shown on the component page.", icon: <span>⌘</span> },
          { title: "Are the components accessible?", content: "Yes — keyboard, screen reader, and focus management included.", icon: <span>✦</span> },
        ]}
      />
    </div>
  ),

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

  stepper: () => <StepperDemo />,
};

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

function StepperDemo() {
  const [step, setStep] = useState(1);
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Stepper
        variant="numbered"
        steps={[
          { label: "Account", description: "Create your account" },
          { label: "Billing", description: "Choose a plan" },
          { label: "Done", description: "Launch" },
        ]}
        currentStep={step}
        onStepClick={setStep}
      />
      <div className="flex justify-center gap-2">
        <button type="button" className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground" onClick={() => setStep((value) => Math.max(0, value - 1))}>
          Prev
        </button>
        <button type="button" className="rounded-lg bg-primary px-3 py-1.5 text-xs text-white" onClick={() => setStep((value) => Math.min(2, value + 1))}>
          Next
        </button>
      </div>
    </div>
  );
}
