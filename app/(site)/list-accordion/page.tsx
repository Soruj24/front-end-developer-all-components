"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ChevronDown, ChevronRight, List, Folder, FileText, Settings, User } from "lucide-react";

function AccordionDemo(icon, title, badgeNum) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {icon className="w-5 h-5 text-primary"} 
        <h3 className="font-semibold text-foreground">{title}</h3>
        <Badge variant="outline" className="ml-auto">Demo {badgeNum}</Badge>
      </div>
      <div className="flex items-center justify-center py-8">
        <div className="text-center text-muted-foreground">
          {icon.className ? <icon className="w-12 h-12 mx-auto mb-3 opacity-30" /> : null}
          <p className="text-sm">{title} demonstration</p>
          <button onClick={() => setOpen(!open)} className="mt-2 text-xs text-primary hover:underline">
            {open ? 'Hide' : 'Show'} Details
          </button>
        </div>
      </div>
      {open && (
        <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
          {JSON.stringify({ component: title, category: 'Navigation', icon: icon.toString().match(/[A-Z][a-z]*/)?.[0] || 'ChevronDown' }, null, 2)}
        </div>
      )}
    </div>
  );
}

function SimpleAccordion() { return AccordionDemo(ChevronDown, "SimpleAccordion", 1); }
function NestedAccordion() { return AccordionDemo(ChevronRight, "NestedAccordion", 2); }
function IconAccordion() { return AccordionDemo(List, "IconAccordion", 3); }
function AllowMultiple() { return AccordionDemo(Folder, "AllowMultiple", 4); }
function AnimatedAccordion() { return AccordionDemo(FileText, "AnimatedAccordion", 5); }
function FAQList() { return AccordionDemo(Settings, "FAQList", 6); }
function MenuAccordion() { return AccordionDemo(User, "MenuAccordion", 7); }

const ACCORDION_SOURCE = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/list-accordion';

export default function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is this component library?</AccordionTrigger>
        <AccordionContent>A comprehensive collection of React components built with Tailwind CSS.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I install components?</AccordionTrigger>
        <AccordionContent>Use the CLI: npx component-library@latest add [name]</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}`;

export default function ListAccordionPage() {
  return (
    <ComponentDocPage
      name="List Accordion"
      category="Navigation"
      description="A collapsible accordion component with smooth expand/collapse animations and keyboard navigation support."
    >
      <PreviewPanel filename="list-accordion-preview.tsx">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SimpleAccordion /><NestedAccordion /><IconAccordion /><AllowMultiple /><AnimatedAccordion /><FAQList /><MenuAccordion />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ACCORDION_SOURCE}
        filename="components/ui/list-accordion/Accordion.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-4">
        <ExampleBlock
          title="Usage"
          description="Basic usage of the list accordion component with single and multiple open modes."
          code={ACCORDION_SOURCE}
          filename="usage.tsx"
        >
          <div className="w-full max-w-md">
            <Accordion type="single" collapsible className="w-full max-w-md">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is this component library?</AccordionTrigger>
                <AccordionContent>A comprehensive collection of React components built with Tailwind CSS.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I install components?</AccordionTrigger>
                <AccordionContent>Use the CLI: npx component-library@latest add [name]</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}