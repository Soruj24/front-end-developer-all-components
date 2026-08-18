"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Link2,
  ArrowRight,
  ChevronDown,
  Hash,
  FileText,
  Settings,
  Layers,
  Zap,
  BookOpen,
  Code,
  Terminal,
  Palette,
} from "lucide-react";

const installCommand = `npx component-library@latest add anchor-navigation`;
const usageCode = `import { AnchorNavigation } from "@/components/anchor-navigation";

<AnchorNavigation
  anchors={[
    { id: "intro", label: "Introduction" },
    { id: "setup", label: "Setup" },
    { id: "usage", label: "Usage" },
  ]}
/>`;

interface Anchor {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const docAnchors: Anchor[] = [
  { id: "getting-started", label: "Getting Started", icon: Zap },
  { id: "installation", label: "Installation", icon: Terminal, badge: "Required" },
  { id: "project-structure", label: "Project Structure", icon: Layers },
  { id: "configuration", label: "Configuration", icon: Settings },
  { id: "styling", label: "Styling", icon: Palette },
  { id: "deployment", label: "Deployment", icon: FileText },
];

const apiAnchors: Anchor[] = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "authentication", label: "Authentication", icon: Settings },
  { id: "endpoints", label: "Endpoints", icon: Code },
  { id: "rate-limiting", label: "Rate Limiting", icon: Hash },
  { id: "error-handling", label: "Error Handling", icon: FileText },
  { id: "webhooks", label: "Webhooks", icon: Zap },
];

const guideAnchors: Anchor[] = [
  { id: "introduction", label: "Introduction" },
  { id: "core-concepts", label: "Core Concepts" },
  { id: "data-fetching", label: "Data Fetching" },
  { id: "forms", label: "Forms & Validation" },
  { id: "authentication", label: "Authentication" },
  { id: "testing", label: "Testing" },
  { id: "optimization", label: "Performance" },
  { id: "deployment", label: "Deployment" },
];

function SidebarNavDemo({ items }: { items: Anchor[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  return (
    <nav className="flex w-full max-w-xs flex-col gap-0.5 rounded-lg border border-black/[.08] bg-card p-2 dark:border-white/[.145]">
      <div className="px-3 py-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </span>
      </div>
      {items.map((anchor) => {
        const Icon = anchor.icon;
        return (
          <button
            key={anchor.id}
            onClick={() => setActive(anchor.id)}
            className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active === anchor.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }`}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            <span className="flex-1 text-left">{anchor.label}</span>
            {anchor.badge && (
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                {anchor.badge}
              </span>
            )}
            {active === anchor.id && (
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

function PillsNavDemo({ items }: { items: Anchor[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  return (
    <nav className="flex w-full max-w-lg flex-wrap gap-1.5 rounded-lg border border-black/[.08] bg-muted/30 p-1.5 dark:border-white/[.145]">
      {items.map((anchor) => (
        <button
          key={anchor.id}
          onClick={() => setActive(anchor.id)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
            active === anchor.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {anchor.label}
        </button>
      ))}
    </nav>
  );
}

function UnderlineNavDemo({ items }: { items: Anchor[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  return (
    <nav className="flex w-full max-w-lg gap-0 border-b border-black/[.08] dark:border-white/[.145]">
      {items.map((anchor) => (
        <button
          key={anchor.id}
          onClick={() => setActive(anchor.id)}
          className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
            active === anchor.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {anchor.label}
          {active === anchor.id && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground" />
          )}
        </button>
      ))}
    </nav>
  );
}

function TableOfContentsDemo() {
  const [active, setActive] = useState("getting-started");

  const sections = [
    { id: "getting-started", title: "Getting Started", description: "Set up your development environment" },
    { id: "installation", title: "Installation", description: "Install dependencies and configure your project" },
    { id: "project-structure", title: "Project Structure", description: "Organize your codebase for scalability" },
    { id: "configuration", title: "Configuration", description: "Customize build settings and environment variables" },
    { id: "styling", title: "Styling", description: "Set up Tailwind CSS and design tokens" },
    { id: "deployment", title: "Deployment", description: "Deploy to production with Vercel or Docker" },
  ];

  return (
    <div className="w-full max-w-md rounded-lg border border-black/[.08] bg-card dark:border-white/[.145]">
      <div className="border-b border-black/[.08] px-4 py-3 dark:border-white/[.145]">
        <h3 className="text-sm font-semibold text-foreground">Table of Contents</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">Quick navigation guide</p>
      </div>
      <div className="p-2">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setActive(section.id)}
            className={`flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
              active === section.id
                ? "bg-muted"
                : "hover:bg-muted/50"
            }`}
          >
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[11px] font-bold ${
              active === section.id
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground"
            }`}>
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <span className={`text-sm font-medium ${
                active === section.id ? "text-foreground" : "text-muted-foreground"
              }`}>
                {section.title}
              </span>
              <p className="mt-0.5 text-xs text-muted-foreground/70 line-clamp-1">
                {section.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StickySidebarDemo() {
  const [active, setActive] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: BookOpen },
    { id: "authentication", title: "Authentication", icon: Settings },
    { id: "endpoints", title: "Endpoints", icon: Code },
    { id: "rate-limiting", title: "Rate Limiting", icon: Hash },
    { id: "error-handling", title: "Error Handling", icon: FileText },
  ];

  return (
    <div className="flex w-full gap-6">
      <nav className="sticky top-4 flex w-48 shrink-0 flex-col gap-1">
        <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          API Docs
        </span>
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActive(section.id)}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                active === section.id
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {section.title}
            </button>
          );
        })}
      </nav>
      <div className="flex-1 rounded-lg border border-black/[.08] bg-card p-4 dark:border-white/[.145]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-600 dark:bg-green-950 dark:text-green-400">
            GET
          </span>
          <code className="text-sm font-mono text-muted-foreground">/api/v1/users</code>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Returns a paginated list of users. Supports filtering by role, status, and creation date.
          Requires authentication via Bearer token.
        </p>
        <div className="mt-4 rounded-md bg-muted/50 p-3">
          <code className="text-xs font-mono text-muted-foreground">
            curl -H "Authorization: Bearer token" https://api.example.com/v1/users
          </code>
        </div>
      </div>
    </div>
  );
}

function DropdownAnchorDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-black/[.08] bg-card px-4 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-muted dark:border-white/[.145]"
      >
        Jump to Section
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-10 mt-1 w-56 overflow-hidden rounded-lg border border-black/[.08] bg-card shadow-lg dark:border-white/[.145]">
          <div className="p-1">
            {guideAnchors.map((a) => (
              <button
                key={a.id}
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Hash className="h-3.5 w-3.5" />
                {a.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BreadcrumbNavDemo() {
  const [active, setActive] = useState("overview");

  const steps = [
    { id: "overview", label: "Overview" },
    { id: "install", label: "Install" },
    { id: "configure", label: "Configure" },
    { id: "deploy", label: "Deploy" },
  ];

  return (
    <nav className="flex w-full max-w-lg items-center">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => setActive(step.id)}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              active === step.id
                ? "bg-foreground text-background"
                : index < steps.findIndex((s) => s.id === active)
                ? "text-foreground hover:bg-muted"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
              active === step.id
                ? "bg-background text-foreground"
                : index < steps.findIndex((s) => s.id === active)
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                : "bg-muted text-muted-foreground"
            }`}>
              {index < steps.findIndex((s) => s.id === active) ? "✓" : index + 1}
            </span>
            {step.label}
          </button>
          {index < steps.length - 1 && (
            <div className="mx-1 h-px w-4 bg-border" />
          )}
        </div>
      ))}
    </nav>
  );
}

export default function AnchorNavigationPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Anchor Navigation
          </h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          In-page anchor navigation with scroll-spy, sticky positioning, and multiple layout
          variants for long-form content.
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
          <h3 className="text-lg font-medium text-foreground">Sidebar Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Vertical navigation with icons and badges, ideal for documentation sidebars.
          </p>
          <ComponentPreview id="anchor-nav-sidebar">
            <SidebarNavDemo items={docAnchors} />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Pills Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Horizontal pill-style navigation for filtering or section switching.
          </p>
          <ComponentPreview id="anchor-nav-pills">
            <PillsNavDemo items={apiAnchors} />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Underline Navigation</h3>
          <p className="text-sm text-muted-foreground">
            Tab-style underline navigation for top-level page sections.
          </p>
          <ComponentPreview id="anchor-nav-underline">
            <UnderlineNavDemo items={apiAnchors} />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Table of Contents</h3>
          <p className="text-sm text-muted-foreground">
            Numbered table of contents with descriptions for long-form documentation.
          </p>
          <ComponentPreview id="anchor-nav-toc">
            <TableOfContentsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Sticky Sidebar with Content</h3>
          <p className="text-sm text-muted-foreground">
            Sticky sidebar paired with content area, common in API documentation.
          </p>
          <ComponentPreview id="anchor-nav-sticky">
            <StickySidebarDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Step Progress</h3>
          <p className="text-sm text-muted-foreground">
            Breadcrumb-style step navigation for multi-step workflows.
          </p>
          <ComponentPreview id="anchor-nav-steps">
            <BreadcrumbNavDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Dropdown Anchor</h3>
          <p className="text-sm text-muted-foreground">
            Dropdown menu for quick section jumping in compact layouts.
          </p>
          <ComponentPreview id="anchor-nav-dropdown">
            <DropdownAnchorDemo />
          </ComponentPreview>
        </div>
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">anchors</td>
                <td className="px-4 py-3 text-muted-foreground">{"Anchor[]"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"default\" | \"sidebar\" | \"pills\" | \"underline\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"default\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">sticky</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">scrollSpy</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">offset</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">{"80"}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onNavigate</td>
                <td className="px-4 py-3 text-muted-foreground">{"(id: string) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
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
