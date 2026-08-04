"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleHeader,
  CollapsibleTitle,
} from "@/components/_collapsible";
import { CollapsibleContent } from "@/components/_collapsible/CollapsibleContent";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add collapsible`;

const usageCode = `import {
  Collapsible, CollapsibleTrigger, CollapsibleHeader,
  CollapsibleTitle, CollapsibleContent
} from "@/components/_collapsible";

<Collapsible>
  <CollapsibleHeader>
    <CollapsibleTitle>Title</CollapsibleTitle>
    <CollapsibleTrigger />
  </CollapsibleHeader>
  <CollapsibleContent>Content</CollapsibleContent>
</Collapsible>`;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function CollapsiblePage() {
  const [open1, setOpen1] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Collapsible</h1>
          <Badge variant="primary">8 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An interactive component which expands/collapses a panel. Use collapsibles
          to progressively disclose content and reduce visual clutter.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="collapsible-default">
        <Collapsible>
          <CollapsibleHeader>
            <CollapsibleTitle>Click to toggle</CollapsibleTitle>
            <CollapsibleTrigger>
              <ChevronIcon open={false} />
            </CollapsibleTrigger>
          </CollapsibleHeader>
          <CollapsibleContent>
            <div className="rounded-md border p-4 text-sm">
              This is the collapsible content. You can put anything here — text,
              forms, images, or other components.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </ComponentPreview>

      <ComponentPreview id="collapsible-controlled">
        <div className="flex flex-col gap-4">
          <Collapsible open={open1} onOpenChange={setOpen1}>
            <CollapsibleHeader>
              <CollapsibleTitle>Controlled collapsible</CollapsibleTitle>
              <CollapsibleTrigger>
                <ChevronIcon open={open1} />
              </CollapsibleTrigger>
            </CollapsibleHeader>
            <CollapsibleContent>
              <div className="rounded-md border p-4 text-sm">
                This collapsible is controlled externally. State: {open1 ? "open" : "closed"}
              </div>
            </CollapsibleContent>
          </Collapsible>
          <div className="flex gap-2">
            <button type="button" onClick={() => setOpen1(true)} className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
              Open
            </button>
            <button type="button" onClick={() => setOpen1(false)} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
              Close
            </button>
            <button type="button" onClick={() => setOpen1(!open1)} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800">
              Toggle
            </button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="collapsible-default-open">
        <Collapsible defaultOpen>
          <CollapsibleHeader>
            <CollapsibleTitle>Starts open</CollapsibleTitle>
            <CollapsibleTrigger>
              <ChevronIcon open={true} />
            </CollapsibleTrigger>
          </CollapsibleHeader>
          <CollapsibleContent>
            <div className="rounded-md border p-4 text-sm">
              This collapsible is open by default. Click the trigger to close it.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </ComponentPreview>

      <ComponentPreview id="collapsible-nested">
        <div className="flex flex-col gap-2">
          <Collapsible>
            <CollapsibleHeader>
              <CollapsibleTitle>Getting Started</CollapsibleTitle>
              <CollapsibleTrigger>
                <ChevronIcon open={false} />
              </CollapsibleTrigger>
            </CollapsibleHeader>
            <CollapsibleContent>
              <div className="space-y-2 pl-4 text-sm">
                <p>1. Install the package</p>
                <p>2. Configure your project</p>
                <p>3. Import components</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleHeader>
              <CollapsibleTitle>Configuration</CollapsibleTitle>
              <CollapsibleTrigger>
                <ChevronIcon open={false} />
              </CollapsibleTrigger>
            </CollapsibleHeader>
            <CollapsibleContent>
              <div className="space-y-2 pl-4 text-sm">
                <p>• Theme settings</p>
                <p>• API endpoints</p>
                <p>• Authentication</p>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleHeader>
              <CollapsibleTitle>Advanced</CollapsibleTitle>
              <CollapsibleTrigger>
                <ChevronIcon open={false} />
              </CollapsibleTrigger>
            </CollapsibleHeader>
            <CollapsibleContent>
              <div className="space-y-2 pl-4 text-sm">
                <p>• Custom hooks</p>
                <p>• Performance optimization</p>
                <p>• Deployment</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ComponentPreview>

      <ComponentPreview id="collapsible-faq">
        <div className="flex flex-col gap-3">
          {[
            { q: "What is this component?", a: "A collapsible is an interactive element that expands and collapses to show or hide content." },
            { q: "When should I use it?", a: "Use collapsibles for FAQs, navigation menus, settings panels, or anywhere you want to progressively disclose content." },
            { q: "Is it accessible?", a: "Yes! It uses proper ARIA attributes and keyboard navigation to ensure accessibility for all users." },
            { q: "Can I nest them?", a: "Absolutely! You can nest collapsibles inside each other for hierarchical content structures." },
          ].map((item, i) => (
            <Collapsible key={i}>
              <CollapsibleHeader className="rounded-md border px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                <CollapsibleTitle className="text-sm font-medium">{item.q}</CollapsibleTitle>
                <CollapsibleTrigger>
                  <ChevronIcon open={false} />
                </CollapsibleTrigger>
              </CollapsibleHeader>
              <CollapsibleContent>
                <div className="px-4 pb-4 text-sm text-muted-foreground">
                  {item.a}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="collapsible-sidebar">
        <div className="flex gap-4">
          <div className="w-64 rounded-lg border p-4">
            <Collapsible defaultOpen>
              <CollapsibleHeader>
                <CollapsibleTitle className="text-sm font-semibold">Navigation</CollapsibleTitle>
                <CollapsibleTrigger>
                  <ChevronIcon open={true} />
                </CollapsibleTrigger>
              </CollapsibleHeader>
              <CollapsibleContent>
                <div className="flex flex-col gap-1 pl-2">
                  <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Dashboard</a>
                  <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Projects</a>
                  <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Settings</a>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleHeader>
                <CollapsibleTitle className="text-sm font-semibold">Team</CollapsibleTitle>
                <CollapsibleTrigger>
                  <ChevronIcon open={false} />
                </CollapsibleTrigger>
              </CollapsibleHeader>
              <CollapsibleContent>
                <div className="flex flex-col gap-1 pl-2">
                  <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Members</a>
                  <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Roles</a>
                  <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Permissions</a>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleHeader>
                <CollapsibleTitle className="text-sm font-semibold">Billing</CollapsibleTitle>
                <CollapsibleTrigger>
                  <ChevronIcon open={false} />
                </CollapsibleTrigger>
              </CollapsibleHeader>
              <CollapsibleContent>
                <div className="flex flex-col gap-1 pl-2">
                  <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Plans</a>
                  <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Payment</a>
                  <a href="#" className="rounded-md px-3 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">Invoices</a>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="flex-1 rounded-lg border p-6">
            <p className="text-sm text-muted-foreground">Main content area. Click sidebar sections to expand/collapse.</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="collapsible-code">
        <Collapsible>
          <CollapsibleHeader className="rounded-md bg-zinc-950 px-4 py-2">
            <CollapsibleTitle className="font-mono text-xs text-zinc-400">package.json</CollapsibleTitle>
            <CollapsibleTrigger>
              <ChevronIcon open={false} />
            </CollapsibleTrigger>
          </CollapsibleHeader>
          <CollapsibleContent>
            <pre className="overflow-auto rounded-b-md bg-zinc-950 p-4 text-xs text-zinc-100">
{`{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0"
  }
}`}
            </pre>
          </CollapsibleContent>
        </Collapsible>
      </ComponentPreview>

      <ComponentPreview id="collapsible-settings">
        <div className="flex flex-col gap-2 rounded-lg border p-4">
          <h3 className="text-sm font-semibold">Advanced Settings</h3>
          <Collapsible>
            <CollapsibleHeader>
              <CollapsibleTitle className="text-sm">Performance</CollapsibleTitle>
              <CollapsibleTrigger>
                <ChevronIcon open={false} />
              </CollapsibleTrigger>
            </CollapsibleHeader>
            <CollapsibleContent>
              <div className="space-y-3 pl-4 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  Enable caching
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  Lazy loading
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  Compression
                </label>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleHeader>
              <CollapsibleTitle className="text-sm">Security</CollapsibleTitle>
              <CollapsibleTrigger>
                <ChevronIcon open={false} />
              </CollapsibleTrigger>
            </CollapsibleHeader>
            <CollapsibleContent>
              <div className="space-y-3 pl-4 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  Two-factor authentication
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  Session timeout
                </label>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleHeader>
              <CollapsibleTitle className="text-sm">Notifications</CollapsibleTitle>
              <CollapsibleTrigger>
                <ChevronIcon open={false} />
              </CollapsibleTrigger>
            </CollapsibleHeader>
            <CollapsibleContent>
              <div className="space-y-3 pl-4 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  Email notifications
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  Push notifications
                </label>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ComponentPreview>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Component</th>
                <th className="px-4 py-3 text-left font-medium">Props</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">Collapsible</td>
                <td className="px-4 py-3 text-muted-foreground">open, onOpenChange</td>
                <td className="px-4 py-3 text-muted-foreground">Root container</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">CollapsibleHeader</td>
                <td className="px-4 py-3 text-muted-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">Header section</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">CollapsibleTitle</td>
                <td className="px-4 py-3 text-muted-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">Title text</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">CollapsibleTrigger</td>
                <td className="px-4 py-3 text-muted-foreground">asChild</td>
                <td className="px-4 py-3 text-muted-foreground">Toggle button</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">CollapsibleContent</td>
                <td className="px-4 py-3 text-muted-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">Expandable content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
