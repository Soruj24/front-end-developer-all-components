"use client";

import { Tag, Layers, LayoutGrid, WrapText, Filter, PenTool, ArrowUpDown } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Cluster } from "@/components/ui/Cluster";
import {
  CLUSTER_SOURCE,
  TAG_CLOUD_EXAMPLE,
  ACTIONS_EXAMPLE,
  JUSTIFY_START_EXAMPLE,
  JUSTIFY_CENTER_EXAMPLE,
  JUSTIFY_END_EXAMPLE,
  GAP_VARIANTS_EXAMPLE,
  MIXED_CONTENT_EXAMPLE,
  TOOLBAR_EXAMPLE,
  RESPONSIVE_EXAMPLE,
  ALIGN_EXAMPLE,
} from "./cluster-layout-source";

function ClusterTags() {
  const tags = ["React", "TypeScript", "Tailwind CSS", "Next.js", "Node.js", "GraphQL", "PostgreSQL", "Redis"];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Tag className="h-4 w-4" />
        <span>Tag Cloud</span>
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
        <Cluster gap={2}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              {tag}
            </span>
          ))}
        </Cluster>
      </div>
    </div>
  );
}

function ClusterActions() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Layers className="h-4 w-4" />
        <span>Action Buttons</span>
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
        <Cluster gap={2}>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]">
            Save
          </button>
          <button className="rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium shadow-sm transition-all hover:bg-muted/50 hover:shadow-md active:scale-[0.98]">
            Cancel
          </button>
          <button className="rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium shadow-sm transition-all hover:bg-muted/50 hover:shadow-md active:scale-[0.98]">
            Preview
          </button>
        </Cluster>
      </div>
    </div>
  );
}

function ClusterJustifyStart() {
  const items = ["Dashboard", "Projects", "Settings", "Analytics"];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <LayoutGrid className="h-4 w-4" />
        <span>Justify Start (Default)</span>
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
        <Cluster gap={2} justify="start">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium shadow-sm transition-all hover:bg-muted/50 hover:shadow-md"
            >
              {item}
            </div>
          ))}
        </Cluster>
      </div>
    </div>
  );
}

function ClusterJustifyCenter() {
  const items = ["Dashboard", "Projects", "Settings", "Analytics"];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <LayoutGrid className="h-4 w-4" />
        <span>Justify Center</span>
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
        <Cluster gap={2} justify="center">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium shadow-sm transition-all hover:bg-muted/50 hover:shadow-md"
            >
              {item}
            </div>
          ))}
        </Cluster>
      </div>
    </div>
  );
}

function ClusterJustifyEnd() {
  const items = ["Dashboard", "Projects", "Settings", "Analytics"];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <LayoutGrid className="h-4 w-4" />
        <span>Justify End</span>
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
        <Cluster gap={2} justify="end">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium shadow-sm transition-all hover:bg-muted/50 hover:shadow-md"
            >
              {item}
            </div>
          ))}
        </Cluster>
      </div>
    </div>
  );
}

function ClusterGapVariants() {
  const gapLabels: Record<number, string> = { 1: "xs", 2: "sm", 4: "md", 6: "lg" };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <WrapText className="h-4 w-4" />
        <span>Gap Variants</span>
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 4, 6].map((gap) => (
          <div key={gap}>
            <p className="mb-2 text-xs font-medium text-muted-foreground">gap-{gap} ({gapLabels[gap]})</p>
            <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
              <Cluster gap={gap}>
                {["A", "B", "C", "D", "E", "F"].map((item) => (
                  <div
                    key={item}
                    className="rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    {item}
                  </div>
                ))}
              </Cluster>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClusterMixedContent() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span>Mixed Content</span>
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
        <Cluster gap={2} align="center">
          <span className="text-sm font-medium">Filter by:</span>
          <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-500/20 dark:text-blue-400">
            Status
          </span>
          <span className="inline-flex items-center rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 transition-colors hover:bg-green-500/20 dark:text-green-400">
            Date
          </span>
          <span className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 transition-colors hover:bg-amber-500/20 dark:text-amber-400">
            Priority
          </span>
          <span className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-600 transition-colors hover:bg-purple-500/20 dark:text-purple-400">
            Assignee
          </span>
          <div className="h-4 w-px bg-border/60" />
          <span className="text-xs text-muted-foreground">4 filters active</span>
        </Cluster>
      </div>
    </div>
  );
}

function ClusterToolbar() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <PenTool className="h-4 w-4" />
        <span>Toolbar Pattern</span>
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
        <Cluster gap={2} align="center">
          {["Bold", "Italic", "Underline"].map((tool) => (
            <button
              key={tool}
              className="rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium shadow-sm transition-all hover:bg-muted/50 hover:shadow-md active:scale-[0.98]"
            >
              {tool}
            </button>
          ))}
          <div className="h-4 w-px bg-border/60" />
          {["Align Left", "Center", "Align Right"].map((tool) => (
            <button
              key={tool}
              className="rounded-md border border-border/60 bg-background px-3 py-1.5 text-xs font-medium shadow-sm transition-all hover:bg-muted/50 hover:shadow-md active:scale-[0.98]"
            >
              {tool}
            </button>
          ))}
        </Cluster>
      </div>
    </div>
  );
}

function ClusterResponsive() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowUpDown className="h-4 w-4" />
        <span>Responsive Behavior</span>
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
        <Cluster gap={2} responsive>
          {["Save Draft", "Publish Now", "Schedule", "Preview"].map((action) => (
            <button
              key={action}
              className="rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium shadow-sm transition-all hover:bg-muted/50 hover:shadow-md active:scale-[0.98]"
            >
              {action}
            </button>
          ))}
        </Cluster>
        <p className="mt-3 text-xs text-muted-foreground">
          Items stack full-width on mobile, wrap in a cluster on desktop.
        </p>
      </div>
    </div>
  );
}

export default function ClusterLayoutPage() {
  return (
    <ComponentDocPage
      name="Cluster Layout"
      category="Layout"
      description="Wrap items into rows with consistent spacing. Perfect for tag clouds, button groups, navigation items, and filter controls."
    >
      <PreviewPanel filename="cluster-layout.tsx">
        <ClusterTags />
      </PreviewPanel>

      <SourceCodeViewer source={CLUSTER_SOURCE} filename="components/ui/Cluster/Cluster.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Tag Cloud" description="Wrapped tags with consistent spacing and hover states." code={TAG_CLOUD_EXAMPLE}>
          <ClusterTags />
        </ExampleBlock>

        <ExampleBlock title="Action Buttons" description="Clustered action buttons that wrap on smaller screens." code={ACTIONS_EXAMPLE}>
          <ClusterActions />
        </ExampleBlock>

        <ExampleBlock title="Justify Start" description="Items aligned to the start of the cluster." code={JUSTIFY_START_EXAMPLE}>
          <ClusterJustifyStart />
        </ExampleBlock>

        <ExampleBlock title="Justify Center" description="Items centered within the cluster." code={JUSTIFY_CENTER_EXAMPLE}>
          <ClusterJustifyCenter />
        </ExampleBlock>

        <ExampleBlock title="Justify End" description="Items aligned to the end of the cluster." code={JUSTIFY_END_EXAMPLE}>
          <ClusterJustifyEnd />
        </ExampleBlock>

        <ExampleBlock title="Gap Variants" description="Consistent spacing between cluster items." code={GAP_VARIANTS_EXAMPLE}>
          <ClusterGapVariants />
        </ExampleBlock>

        <ExampleBlock title="Mixed Content" description="Cluster with different sized content items and dividers." code={MIXED_CONTENT_EXAMPLE}>
          <ClusterMixedContent />
        </ExampleBlock>

        <ExampleBlock title="Toolbar Pattern" description="Toolbar with grouped controls and dividers." code={TOOLBAR_EXAMPLE}>
          <ClusterToolbar />
        </ExampleBlock>

        <ExampleBlock title="Responsive" description="Items stack full-width on mobile, wrap in a cluster on desktop." code={RESPONSIVE_EXAMPLE}>
          <ClusterResponsive />
        </ExampleBlock>

        <ExampleBlock title="Vertical Alignment" description="Center-align items of different heights." code={ALIGN_EXAMPLE}>
          <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
            <Cluster gap={3} align="center">
              <span className="text-sm font-medium">Status:</span>
              <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                Active
              </span>
              <span className="text-xs text-muted-foreground">Updated 2 min ago</span>
            </Cluster>
          </div>
        </ExampleBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">gap</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">2</td>
                <td className="px-4 py-3">Spacing multiplier (gap * 0.25rem)</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">justify</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;start&quot;</td>
                <td className="px-4 py-3">Horizontal alignment</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">align</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;start&quot; | &quot;center&quot; | &quot;end&quot; | &quot;stretch&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Vertical alignment</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">responsive</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">Stack items full-width on mobile</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ComponentDocPage>
  );
}
