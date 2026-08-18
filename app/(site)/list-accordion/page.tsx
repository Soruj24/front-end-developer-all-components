"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ChevronDown, ChevronRight, List, Folder, FileText, Settings, User } from "lucide-react";

const installCommand = `npx component-library@latest add list-accordion`;
const usageCode = `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/list-accordion';

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

  function SimpleAccordion() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ChevronDown className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">SimpleAccordion</h3>
          <Badge variant="outline" className="ml-auto">Demo 1</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <ChevronDown className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">SimpleAccordion demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'SimpleAccordion', category: 'Navigation', icon: 'ChevronDown' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function NestedAccordion() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <ChevronRight className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">NestedAccordion</h3>
          <Badge variant="outline" className="ml-auto">Demo 2</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <ChevronRight className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">NestedAccordion demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'NestedAccordion', category: 'Navigation', icon: 'ChevronRight' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function IconAccordion() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <List className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">IconAccordion</h3>
          <Badge variant="outline" className="ml-auto">Demo 3</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <List className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">IconAccordion demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'IconAccordion', category: 'Navigation', icon: 'List' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function AllowMultiple() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Folder className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">AllowMultiple</h3>
          <Badge variant="outline" className="ml-auto">Demo 4</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Folder className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">AllowMultiple demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'AllowMultiple', category: 'Navigation', icon: 'Folder' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function AnimatedAccordion() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">AnimatedAccordion</h3>
          <Badge variant="outline" className="ml-auto">Demo 5</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">AnimatedAccordion demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'AnimatedAccordion', category: 'Navigation', icon: 'FileText' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function FAQList() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">FAQList</h3>
          <Badge variant="outline" className="ml-auto">Demo 6</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Settings className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">FAQList demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'FAQList', category: 'Navigation', icon: 'Settings' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function MenuAccordion() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">MenuAccordion</h3>
          <Badge variant="outline" className="ml-auto">Demo 7</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">MenuAccordion demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'MenuAccordion', category: 'Navigation', icon: 'User' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

export default function ListAccordionPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">List Accordion</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A collapsible accordion component with smooth expand/collapse animations and keyboard navigation support.</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive demonstrations of List Accordion variants.</p>
        </div>
        <ComponentPreview id="list-accordion">
          <div className="w-full p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SimpleAccordion />
        <NestedAccordion />
        <IconAccordion />
        <AllowMultiple />
        <AnimatedAccordion />
        <FAQList />
        <MenuAccordion />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">type</td><td className="px-4 py-3 text-muted-foreground">"single" | "multiple"</td><td className="px-4 py-3 text-muted-foreground">"single"</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">collapsible</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">defaultValue</td><td className="px-4 py-3 text-muted-foreground">string | string[]</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">value</td><td className="px-4 py-3 text-muted-foreground">string | string[]</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onValueChange</td><td className="px-4 py-3 text-muted-foreground">(value: string | string[]) => void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
