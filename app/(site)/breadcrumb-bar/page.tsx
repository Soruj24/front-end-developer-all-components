"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Home, ChevronRight, MoreHorizontal, Folder, FileText, Settings } from "lucide-react";

const installCommand = `npx component-library@latest add breadcrumb-bar`;

const usageCode = `import { Home, ChevronRight } from "lucide-react";

function BreadcrumbBar({ items, separator = "/" }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-muted-foreground">{separator}</span>}
          {item.href ? (
            <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </a>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}`;

type BreadcrumbItem = { label: string; href?: string; icon?: React.ReactNode };

function BreadcrumbBar({
  items,
  separator = "/",
  variant = "default",
  compact = false,
}: {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  variant?: string;
  compact?: boolean;
}) {
  const isPill = variant === "pill";
  const isMuted = variant === "muted";

  return (
    <nav className={`flex items-center ${compact ? "gap-1 text-xs" : "gap-1.5 text-sm"}`}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className={`${isPill ? "text-muted-foreground/50" : "text-muted-foreground"} px-0.5`}>
                {separator}
              </span>
            )}
            {item.href && !isLast ? (
              <a
                href={item.href}
                className={`flex items-center gap-1 rounded transition-colors ${
                  isPill
                    ? "px-2 py-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    : isMuted
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            ) : (
              <span
                className={`flex items-center gap-1 ${
                  isLast ? "font-medium text-foreground" : "text-muted-foreground"
                } ${isPill && isLast ? "rounded bg-muted px-2 py-0.5" : ""}`}
              >
                {item.icon}
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default function BreadcrumbBarPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Breadcrumb Bar</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A horizontal breadcrumb navigation bar showing the current page location within a hierarchy. Helps users understand where they are and navigate back.
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

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Basic breadcrumb with slash separators.</p>
        </div>
        <ComponentPreview id="breadcrumb-bar-default">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/", icon: <Home className="h-3.5 w-3.5" /> },
              { label: "Components", href: "/components" },
              { label: "Breadcrumb Bar" },
            ]}
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">Breadcrumb items with leading icons.</p>
        </div>
        <ComponentPreview id="breadcrumb-bar-icons">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/", icon: <Home className="h-3.5 w-3.5" /> },
              { label: "Documents", href: "/docs", icon: <Folder className="h-3.5 w-3.5" /> },
              { label: "Report.pdf", icon: <FileText className="h-3.5 w-3.5" /> },
            ]}
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Different Separators</h2>
          <p className="mt-1 text-sm text-muted-foreground">Various separator styles.</p>
        </div>
        <ComponentPreview id="breadcrumb-bar-separators">
          <div className="flex flex-col gap-4">
            {[
              { label: "Slash", sep: "/" },
              { label: "Chevron", sep: <ChevronRight className="h-3.5 w-3.5" /> },
              { label: "Arrow", sep: "→" },
              { label: "Dot", sep: "•" },
              { label: "Pipe", sep: "|" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="w-20 text-xs text-muted-foreground">{item.label}</span>
                <BreadcrumbBar
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Library", href: "/lib" },
                    { label: "Components" },
                  ]}
                  separator={item.sep}
                />
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Deep Hierarchy</h2>
          <p className="mt-1 text-sm text-muted-foreground">Breadcrumb with many nested levels.</p>
        </div>
        <ComponentPreview id="breadcrumb-bar-deep">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: "Website", href: "/projects/website" },
              { label: "Assets", href: "/projects/website/assets" },
              { label: "Images" },
            ]}
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Pill Variant</h2>
          <p className="mt-1 text-sm text-muted-foreground">Breadcrumb items styled as pills.</p>
        </div>
        <ComponentPreview id="breadcrumb-bar-pill">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "Settings" },
            ]}
            variant="pill"
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Compact</h2>
          <p className="mt-1 text-sm text-muted-foreground">Compact breadcrumb for tight spaces.</p>
        </div>
        <ComponentPreview id="breadcrumb-bar-compact">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/" },
              { label: "Settings", href: "/settings" },
              { label: "Account" },
            ]}
            compact
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Overflow</h2>
          <p className="mt-1 text-sm text-muted-foreground">Collapsed intermediate items with ellipsis.</p>
        </div>
        <ComponentPreview id="breadcrumb-bar-overflow">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/" },
              { label: "...", href: "#" },
              { label: "Deeply", href: "/a/b/c/deeply" },
              { label: "Nested Page" },
            ]}
          />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">BreadcrumbItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">separator</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">{'{"/"}'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"default" | "pill" | "muted"`}'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"default"`}'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">compact</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
