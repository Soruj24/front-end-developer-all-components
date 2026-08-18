"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Hash, Link2, ExternalLink, ChevronRight } from "lucide-react";

const installCommand = `npx component-library@latest add anchor-links`;

const usageCode = `import { AnchorLinks } from "@/components/anchor-links";

<AnchorLinks
  links={[
    { label: "Getting Started", href: "#getting-started" },
    { label: "Installation", href: "#installation" },
    { label: "API Reference", href: "#api" },
  ]}
/>`;

const sections = [
  { id: "introduction", label: "Introduction", level: 1 },
  { id: "getting-started", label: "Getting Started", level: 1 },
  { id: "prerequisites", label: "Prerequisites", level: 2 },
  { id: "quick-start", label: "Quick Start", level: 2 },
  { id: "installation", label: "Installation", level: 1 },
  { id: "npm", label: "npm", level: 2 },
  { id: "yarn", label: "yarn", level: 2 },
  { id: "api-reference", label: "API Reference", level: 1 },
  { id: "props", label: "Props", level: 2 },
  { id: "methods", label: "Methods", level: 2 },
  { id: "examples", label: "Examples", level: 1 },
  { id: "basic", label: "Basic Usage", level: 2 },
  { id: "advanced", label: "Advanced", level: 2 },
];

export default function AnchorLinksPage() {
  const [activeLink, setActiveLink] = useState("getting-started");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Anchor Links</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          In-page anchor navigation with smooth scrolling, active state tracking, and nested hierarchy support.
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

      <ComponentPreview id="anchor-links-sidebar">
        <div className="flex w-full gap-6">
          <nav className="flex w-48 flex-col gap-1 border-r border-border pr-4">
            {sections.filter((s) => s.level === 1).map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => { e.preventDefault(); setActiveLink(section.id); }}
                className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                  activeLink === section.id
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Hash className="h-3 w-3" />
                {section.label}
              </a>
            ))}
          </nav>
          <div className="flex-1 rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Documentation</h3>
            <p className="mt-2 text-sm text-muted-foreground">Click the links on the left to navigate sections.</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="anchor-links-pills">
        <div className="flex flex-wrap gap-2">
          {sections.filter((s) => s.level === 1).map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => { e.preventDefault(); setActiveLink(section.id); }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-all ${
                activeLink === section.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <Link2 className="h-3 w-3" />
              {section.label}
            </a>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="anchor-links-table">
        <div className="w-full overflow-hidden rounded-lg border border-border">
          <div className="border-b border-border bg-muted/30 px-4 py-2.5">
            <h3 className="text-sm font-semibold text-foreground">On This Page</h3>
          </div>
          <div className="flex flex-col">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => { e.preventDefault(); setActiveLink(section.id); }}
                className={`flex items-center gap-2 border-b border-border px-4 py-2 text-sm transition-colors last:border-0 hover:bg-muted/50 ${
                  section.level === 2 ? "pl-8" : ""
                } ${activeLink === section.id ? "bg-primary/5 font-medium text-primary" : "text-muted-foreground"}`}
              >
                {section.level === 1 && <Hash className="h-3 w-3" />}
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="anchor-links-breadcrumb">
        <div className="flex items-center gap-1 text-sm">
          <a href="#" className="text-muted-foreground hover:text-foreground">Docs</a>
          <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
          <a href="#" className="text-muted-foreground hover:text-foreground">Components</a>
          <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
          <a href="#" className="text-muted-foreground hover:text-foreground">Navigation</a>
          <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
          <span className="font-medium text-foreground">Anchor Links</span>
        </div>
      </ComponentPreview>

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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">links</td>
                <td className="px-4 py-3 text-muted-foreground">{'{"{ label: string; href: string }[]"}'}</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;pills&quot; | &quot;sidebar&quot; | &quot;table&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;pills&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">activeHref</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
