"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ChevronDown } from "lucide-react";

const installCommand = `npx component-library@latest add accordion-tabs`;
const usageCode = `import { AccordionTabs } from "@/components/ui/accordion-tabs";

<AccordionTabs
  items={[
    { id: "1", title: "Tab One", content: "Content for tab one" },
    { id: "2", title: "Tab Two", content: "Content for tab two" },
    { id: "3", title: "Tab Three", content: "Content for tab three" },
  ]}
/>`;

export default function AccordionTabsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Accordion Tabs</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A combined accordion and tab component that collapses content sections vertically while supporting tabbed navigation within panels.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Accordion Tabs</h2><p className="mt-1 text-sm text-muted-foreground">Click headers to expand and collapse accordion panels.</p></div>
        <ComponentPreview id="accordion-tabs-basic">
          <div className="w-full p-4 space-y-2">
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
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Nested Tabs Inside Accordion</h2><p className="mt-1 text-sm text-muted-foreground">Tabs embedded within accordion panels for complex navigation.</p></div>
        <ComponentPreview id="accordion-tabs-nested">
          <div className="w-full p-4">
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
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Animated Accordion</h2><p className="mt-1 text-sm text-muted-foreground">Smooth expand and collapse animations on accordion items.</p></div>
        <ComponentPreview id="accordion-tabs-animated">
          <div className="w-full p-4 space-y-2">
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
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
