"use client";

import { ChevronDown } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ACCORDION_TABS_SOURCE, BASIC_EXAMPLE, NESTED_EXAMPLE, ANIMATED_EXAMPLE } from "./accordion-tabs-source";

function BasicAccordionDemo() {
  return (
    <div className="w-full max-w-md space-y-2 p-4">
      {["Getting Started", "Configuration", "Advanced Topics"].map((title, i) => (
        <div key={i} className="rounded-lg border border-border">
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/50">
            <span className="font-medium text-sm">{title}</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          {i === 0 && <div className="px-4 pb-4 text-sm text-muted-foreground">Welcome to the accordion tabs component. Click to expand content.</div>}
        </div>
      ))}
    </div>
  );
}

function NestedTabsDemo() {
  return (
    <div className="w-full max-w-md p-4">
      <div className="rounded-lg border border-border">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/30">
          <span className="font-medium text-sm">Settings Panel</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground rotate-180" />
        </div>
        <div className="px-4 pb-4">
          <div className="flex gap-2 border-b border-border pt-2">
            {["General", "Privacy", "Notifications"].map((t, i) => (
              <button key={i} className={`px-3 py-1.5 text-xs font-medium rounded-t border-b-2 ${i === 0 ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>{t}</button>
            ))}
          </div>
          <p className="pt-3 text-sm text-muted-foreground">General settings content goes here.</p>
        </div>
      </div>
    </div>
  );
}

function AnimatedAccordionDemo() {
  return (
    <div className="w-full max-w-md space-y-2 p-4">
      {["Features", "Pricing", "FAQ"].map((title, i) => (
        <div key={i} className="rounded-lg border border-border overflow-hidden transition-all duration-300">
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors">
            <span className="font-medium text-sm">{title}</span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${i === 0 ? "rotate-180" : ""}`} />
          </div>
          {i === 0 && <div className="px-4 pb-4 text-sm text-muted-foreground transition-all">Explore our powerful features designed for your workflow.</div>}
        </div>
      ))}
    </div>
  );
}

export default function AccordionTabsPage() {
  return (
    <ComponentDocPage
      name="Accordion Tabs"
      category="Navigation"
      description="A combined accordion and tab component that collapses content sections vertically while supporting tabbed navigation within panels."
    >
      <PreviewPanel filename="accordion-tabs.tsx">
        <BasicAccordionDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={ACCORDION_TABS_SOURCE}
        filename="components/ui/AccordionTabs/AccordionTabs.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Accordion Tabs" description="Click headers to expand and collapse accordion panels." code={BASIC_EXAMPLE}>
          <BasicAccordionDemo />
        </ExampleBlock>
        <ExampleBlock title="Nested Tabs Inside Accordion" description="Tabs embedded within accordion panels for complex navigation." code={NESTED_EXAMPLE}>
          <NestedTabsDemo />
        </ExampleBlock>
        <ExampleBlock title="Animated Accordion" description="Smooth expand and collapse animations on accordion items." code={ANIMATED_EXAMPLE}>
          <AnimatedAccordionDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}