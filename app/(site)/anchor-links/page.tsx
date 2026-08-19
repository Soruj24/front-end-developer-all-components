"use client";

import { useState } from "react";
import { Hash, Link2, ChevronRight } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ANCHOR_LINKS_SOURCE, SIDEBAR_EXAMPLE, PILLS_EXAMPLE, TABLE_EXAMPLE, BREADCRUMB_EXAMPLE } from "./anchor-links-source";

const sections = [
  { id: "introduction", label: "Introduction", level: 1 },
  { id: "getting-started", label: "Getting Started", level: 1 },
  { id: "prerequisites", label: "Prerequisites", level: 2 },
  { id: "quick-start", label: "Quick Start", level: 2 },
  { id: "installation", label: "Setup", level: 1 },
  { id: "npm", label: "npm", level: 2 },
  { id: "yarn", label: "yarn", level: 2 },
  { id: "api-reference", label: "Reference", level: 1 },
  { id: "props", label: "Props", level: 2 },
  { id: "methods", label: "Methods", level: 2 },
  { id: "examples", label: "Examples", level: 1 },
  { id: "basic", label: "Basics", level: 2 },
  { id: "advanced", label: "Advanced", level: 2 },
];

function SidebarDemo({ activeLink, setActiveLink }: { activeLink: string; setActiveLink: (id: string) => void }) {
  return (
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
  );
}

function PillsDemo({ activeLink, setActiveLink }: { activeLink: string; setActiveLink: (id: string) => void }) {
  return (
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
  );
}

function TableDemo({ activeLink, setActiveLink }: { activeLink: string; setActiveLink: (id: string) => void }) {
  return (
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
  );
}

function BreadcrumbDemo() {
  return (
    <div className="flex items-center gap-1 text-sm">
      <a href="#" className="text-muted-foreground hover:text-foreground">Docs</a>
      <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
      <a href="#" className="text-muted-foreground hover:text-foreground">Components</a>
      <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
      <a href="#" className="text-muted-foreground hover:text-foreground">Navigation</a>
      <ChevronRight className="h-3 w-3 text-muted-foreground/40" />
      <span className="font-medium text-foreground">Anchor Links</span>
    </div>
  );
}

export default function AnchorLinksPage() {
  const [activeLink, setActiveLink] = useState("getting-started");

  return (
    <ComponentDocPage
      name="Anchor Links"
      category="Navigation"
      description="In-page anchor navigation with smooth scrolling, active state tracking, and nested hierarchy support."
    >
      <PreviewPanel filename="anchor-links.tsx">
        <SidebarDemo activeLink={activeLink} setActiveLink={setActiveLink} />
      </PreviewPanel>

      <SourceCodeViewer
        source={ANCHOR_LINKS_SOURCE}
        filename="components/ui/AnchorLinks/AnchorLinks.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Sidebar" description="Vertical navigation rail with active highlight." code={SIDEBAR_EXAMPLE}>
          <SidebarDemo activeLink={activeLink} setActiveLink={setActiveLink} />
        </ExampleBlock>
        <ExampleBlock title="Pills" description="Compact pill-style anchor chips." code={PILLS_EXAMPLE}>
          <PillsDemo activeLink={activeLink} setActiveLink={setActiveLink} />
        </ExampleBlock>
        <ExampleBlock title="On This Page" description="Dense table-style list with nested indentation." code={TABLE_EXAMPLE}>
          <TableDemo activeLink={activeLink} setActiveLink={setActiveLink} />
        </ExampleBlock>
        <ExampleBlock title="Breadcrumb" description="Hierarchical trail showing the current location." code={BREADCRUMB_EXAMPLE}>
          <BreadcrumbDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}