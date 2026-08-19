"use client";

import { Tag, Layers, LayoutGrid, WrapText } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
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
} from "./cluster-layout-source";

function ClusterTags() {
  const tags = ["React", "TypeScript", "Tailwind CSS", "Next.js", "Node.js", "GraphQL", "PostgreSQL"];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Tag className="h-4 w-4" />
        <span>Tag Cloud</span>
      </div>
      <div className="flex flex-wrap gap-2 rounded-lg border p-4">
        {tags.map((tag) => (
          <span key={tag} className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{tag}</span>
        ))}
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
      <div className="flex flex-wrap items-center gap-2 rounded-lg border p-4">
        <div className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save</div>
        <div className="rounded-md border bg-background px-4 py-2 text-sm font-medium">Cancel</div>
        <div className="rounded-md border bg-background px-4 py-2 text-sm font-medium">Preview</div>
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
      <div className="flex flex-wrap justify-start gap-2 rounded-lg border p-4">
        {items.map((item) => (
          <div key={item} className="rounded-md bg-muted px-4 py-2 text-sm font-medium">{item}</div>
        ))}
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
      <div className="flex flex-wrap justify-center gap-2 rounded-lg border p-4">
        {items.map((item) => (
          <div key={item} className="rounded-md bg-muted px-4 py-2 text-sm font-medium">{item}</div>
        ))}
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
      <div className="flex flex-wrap justify-end gap-2 rounded-lg border p-4">
        {items.map((item) => (
          <div key={item} className="rounded-md bg-muted px-4 py-2 text-sm font-medium">{item}</div>
        ))}
      </div>
    </div>
  );
}

function ClusterGapVariants() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <WrapText className="h-4 w-4" />
        <span>Gap Variants</span>
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 4, 6].map((gap) => (
          <div key={gap}>
            <p className="mb-2 text-xs text-muted-foreground">gap-{gap}</p>
            <div className={`flex flex-wrap gap-${gap} rounded-lg border p-3`}>
              {["A", "B", "C", "D", "E", "F"].map((item) => (
                <div key={item} className="rounded bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">{item}</div>
              ))}
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
      <p className="text-sm text-muted-foreground">Mixed content with different sizes</p>
      <div className="flex flex-wrap items-center gap-2 rounded-lg border p-4">
        <span className="text-sm font-medium">Filter by:</span>
        <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">Status</span>
        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">Date</span>
        <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400">Priority</span>
        <span className="inline-flex items-center rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400">Assignee</span>
        <div className="h-4 w-px bg-border" />
        <span className="text-xs text-muted-foreground">4 filters active</span>
      </div>
    </div>
  );
}

function ClusterToolbar() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Toolbar pattern with clustered controls</p>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/30 p-3">
        <div className="rounded bg-background px-3 py-1.5 text-xs font-medium shadow-sm">Bold</div>
        <div className="rounded bg-background px-3 py-1.5 text-xs font-medium shadow-sm">Italic</div>
        <div className="rounded bg-background px-3 py-1.5 text-xs font-medium shadow-sm">Underline</div>
        <div className="h-4 w-px bg-border" />
        <div className="rounded bg-background px-3 py-1.5 text-xs font-medium shadow-sm">Align Left</div>
        <div className="rounded bg-background px-3 py-1.5 text-xs font-medium shadow-sm">Center</div>
        <div className="rounded bg-background px-3 py-1.5 text-xs font-medium shadow-sm">Align Right</div>
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
        <ExampleBlock title="Tag Cloud" description="Wrapped tags with consistent spacing." code={TAG_CLOUD_EXAMPLE}>
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
        <ExampleBlock title="Mixed Content" description="Cluster with different sized content items." code={MIXED_CONTENT_EXAMPLE}>
          <ClusterMixedContent />
        </ExampleBlock>
        <ExampleBlock title="Toolbar Pattern" description="Toolbar with grouped controls and dividers." code={TOOLBAR_EXAMPLE}>
          <ClusterToolbar />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}