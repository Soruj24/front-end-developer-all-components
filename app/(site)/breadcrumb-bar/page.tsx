"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Home, ChevronRight, Folder, FileText } from "lucide-react";
import { BREADCRUMB_SOURCE, ICONS_EXAMPLE, SEPARATORS_EXAMPLE, DEEP_EXAMPLE, PILL_EXAMPLE, COMPACT_EXAMPLE, OVERFLOW_EXAMPLE } from "./breadcrumb-bar-source";

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
    <ComponentDocPage
      name="Breadcrumb Bar"
      category="Navigation"
      description="A horizontal breadcrumb navigation bar showing the current page location within a hierarchy. Helps users understand where they are and navigate back."
    >
      <PreviewPanel filename="breadcrumb-bar.tsx">
        <BreadcrumbBar
          items={[
            { label: "Home", href: "/", icon: <Home className="h-3.5 w-3.5" /> },
            { label: "Components", href: "/components" },
            { label: "Breadcrumb Bar" },
          ]}
        />
      </PreviewPanel>

      <SourceCodeViewer source={BREADCRUMB_SOURCE} filename="components/ui/BreadcrumbBar/BreadcrumbBar.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="With Icons" description="Breadcrumb items with leading icons." code={ICONS_EXAMPLE} filename="breadcrumb-icons.tsx">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/", icon: <Home className="h-3.5 w-3.5" /> },
              { label: "Documents", href: "/docs", icon: <Folder className="h-3.5 w-3.5" /> },
              { label: "Report.pdf", icon: <FileText className="h-3.5 w-3.5" /> },
            ]}
          />
        </ExampleBlock>

        <ExampleBlock title="Different Separators" description="Various separator styles." code={SEPARATORS_EXAMPLE} filename="breadcrumb-separators.tsx">
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
        </ExampleBlock>

        <ExampleBlock title="Deep Hierarchy" description="Breadcrumb with many nested levels." code={DEEP_EXAMPLE} filename="breadcrumb-deep.tsx">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: "Website", href: "/projects/website" },
              { label: "Assets", href: "/projects/website/assets" },
              { label: "Images" },
            ]}
          />
        </ExampleBlock>

        <ExampleBlock title="Pill Variant" description="Breadcrumb items styled as pills." code={PILL_EXAMPLE} filename="breadcrumb-pill.tsx">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "Settings" },
            ]}
            variant="pill"
          />
        </ExampleBlock>

        <ExampleBlock title="Compact" description="Compact breadcrumb for tight spaces." code={COMPACT_EXAMPLE} filename="breadcrumb-compact.tsx">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/" },
              { label: "Settings", href: "/settings" },
              { label: "Account" },
            ]}
            compact
          />
        </ExampleBlock>

        <ExampleBlock title="With Overflow" description="Collapsed intermediate items with ellipsis." code={OVERFLOW_EXAMPLE} filename="breadcrumb-overflow.tsx">
          <BreadcrumbBar
            items={[
              { label: "Home", href: "/" },
              { label: "...", href: "#" },
              { label: "Deeply", href: "/a/b/c/deeply" },
              { label: "Nested Page" },
            ]}
          />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
