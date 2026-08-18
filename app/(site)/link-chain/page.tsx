"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Link,
  ChevronRight,
  ExternalLink,
  Share2,
  Tag,
  Layers,
  ArrowRight,
} from "lucide-react";

const installCommand = `npx shadcn@latest add link-chain`;

const usageCode = `import { LinkChain } from "@/components/link-chain";

<LinkChain href="/products" external showIcon>
  Products
</LinkChain>`;

function BreadcrumbChainDemo() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Laptops", href: "/products/electronics/laptops" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 text-sm">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-1">
          <a
            href={crumb.href}
            className={
              i === crumbs.length - 1
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground transition-colors"
            }
          >
            {crumb.label}
          </a>
          {i < crumbs.length - 1 && (
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          )}
        </span>
      ))}
    </div>
  );
}

function StepChainDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { label: "Account", status: "complete" },
    { label: "Profile", status: "current" },
    { label: "Preferences", status: "upcoming" },
    { label: "Review", status: "upcoming" },
  ];

  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => (
        <span key={step.label} className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep(i)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              step.status === "complete"
                ? "bg-primary text-primary-foreground"
                : step.status === "current"
                ? "bg-primary/10 text-primary border border-primary/30"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {step.status === "complete" ? (
              <span className="h-3 w-3 rounded-full bg-current" />
            ) : (
              <span>{i + 1}</span>
            )}
            {step.label}
          </button>
          {i < steps.length - 1 && (
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          )}
        </span>
      ))}
    </div>
  );
}

function CategoryChainDemo() {
  const categories = [
    { label: "Fashion", href: "/category/fashion", count: 128 },
    { label: "Men", href: "/category/fashion/men", count: 64 },
    { label: "Shirts", href: "/category/fashion/men/shirts", count: 32 },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {categories.map((cat, i) => (
        <span key={cat.href} className="flex items-center gap-1.5">
          <a
            href={cat.href}
            className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs font-medium hover:bg-secondary/80 transition-colors"
          >
            {i === 0 && <Layers className="h-3 w-3" />}
            {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
            {cat.label}
            <Badge variant="outline" className="ml-0.5 text-[10px] px-1">
              {cat.count}
            </Badge>
          </a>
        </span>
      ))}
    </div>
  );
}

function TagChainDemo() {
  const tags = [
    { label: "react", href: "/tags/react" },
    { label: "typescript", href: "/tags/typescript" },
    { label: "nextjs", href: "/tags/nextjs" },
    { label: "shadcn", href: "/tags/shadcn" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <a
          key={tag.href}
          href={tag.href}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Tag className="h-3 w-3" />
          {tag.label}
        </a>
      ))}
    </div>
  );
}

function SocialChainDemo() {
  const links = [
    { label: "GitHub", href: "https://github.com", icon: ExternalLink },
    { label: "Twitter", href: "https://twitter.com", icon: Share2 },
    { label: "Discord", href: "https://discord.com", icon: Link },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <link.icon className="h-3.5 w-3.5" />
          {link.label}
          <ExternalLink className="h-3 w-3 text-muted-foreground" />
        </a>
      ))}
    </div>
  );
}

function ResourceChainDemo() {
  const resources = [
    { label: "Documentation", href: "/docs", icon: Link },
    { label: "API Reference", href: "/docs/api", icon: ExternalLink },
    { label: "Examples", href: "/docs/examples", icon: Layers },
  ];

  return (
    <div className="flex flex-col gap-1">
      {resources.map((res) => (
        <a
          key={res.href}
          href={res.href}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <res.icon className="h-4 w-4" />
          {res.label}
          <ArrowRight className="ml-auto h-3.5 w-3.5 opacity-50" />
        </a>
      ))}
    </div>
  );
}

function WorkflowChainDemo() {
  const stages = [
    { label: "Draft", color: "bg-yellow-500" },
    { label: "Review", color: "bg-blue-500" },
    { label: "Approved", color: "bg-green-500" },
    { label: "Published", color: "bg-primary" },
  ];

  return (
    <div className="flex items-center gap-1">
      {stages.map((stage, i) => (
        <span key={stage.label} className="flex items-center gap-1">
          <span className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium">
            <span className={`h-2 w-2 rounded-full ${stage.color}`} />
            {stage.label}
          </span>
          {i < stages.length - 1 && (
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/60" />
          )}
        </span>
      ))}
    </div>
  );
}

export default function LinkChainPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Link Chain</h1>
        </div>
        <p className="text-muted-foreground">
          A collection of link chain patterns for navigation, breadcrumbs,
          tags, and sequential workflows.
        </p>
        <div className="flex gap-2">
          <Badge>Component</Badge>
          <Badge variant="secondary">Navigation</Badge>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Examples</h2>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Breadcrumb Chain
          </h3>
          <ComponentPreview>
            <BreadcrumbChainDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Step Chain
          </h3>
          <ComponentPreview>
            <StepChainDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Category Chain
          </h3>
          <ComponentPreview>
            <CategoryChainDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Tag Chain
          </h3>
          <ComponentPreview>
            <TagChainDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Social Chain
          </h3>
          <ComponentPreview>
            <SocialChainDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Resource Chain
          </h3>
          <ComponentPreview>
            <ResourceChainDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Workflow Chain
          </h3>
          <ComponentPreview>
            <WorkflowChainDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs">href</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">
                  The URL the link points to. Required.
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs">external</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Whether the link opens in a new tab.
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs">showIcon</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Whether to display an external link icon.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 text-muted-foreground">""</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Additional CSS classes to apply to the link.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
