"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Tag, Layers, LayoutGrid, WrapText } from "lucide-react";

const installCommand = `npx component-library@latest add cluster-layout`;

const usageCode = `import { Cluster } from "@/components/ui/Cluster";

<Cluster gap={2}>
  <Badge>React</Badge>
  <Badge>TypeScript</Badge>
  <Badge>Tailwind</Badge>
</Cluster>

<Cluster gap={3} justify="center">
  <Button>Cancel</Button>
  <Button variant="primary">Submit</Button>
</Cluster>`;

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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Cluster Layout</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Wrap items into rows with consistent spacing. Perfect for tag clouds, button groups, navigation items, and filter controls.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Tag Cloud</h2>
          <p className="mt-1 text-sm text-muted-foreground">Wrapped tags with consistent spacing.</p>
        </div>
        <ComponentPreview id="cluster-tags">
          <ClusterTags />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Action Buttons</h2>
          <p className="mt-1 text-sm text-muted-foreground">Clustered action buttons that wrap on smaller screens.</p>
        </div>
        <ComponentPreview id="cluster-actions">
          <ClusterActions />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Justify Start</h2>
          <p className="mt-1 text-sm text-muted-foreground">Items aligned to the start of the cluster.</p>
        </div>
        <ComponentPreview id="cluster-start">
          <ClusterJustifyStart />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Justify Center</h2>
          <p className="mt-1 text-sm text-muted-foreground">Items centered within the cluster.</p>
        </div>
        <ComponentPreview id="cluster-center">
          <ClusterJustifyCenter />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Justify End</h2>
          <p className="mt-1 text-sm text-muted-foreground">Items aligned to the end of the cluster.</p>
        </div>
        <ComponentPreview id="cluster-end">
          <ClusterJustifyEnd />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Mixed Content</h2>
          <p className="mt-1 text-sm text-muted-foreground">Cluster with different sized content items.</p>
        </div>
        <ComponentPreview id="cluster-mixed">
          <ClusterMixedContent />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Toolbar Pattern</h2>
          <p className="mt-1 text-sm text-muted-foreground">Toolbar with grouped controls and dividers.</p>
        </div>
        <ComponentPreview id="cluster-toolbar">
          <ClusterToolbar />
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
                <td className="px-4 py-3 font-mono text-xs">gap</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">2</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">justify</td>
                <td className="px-4 py-3 text-muted-foreground">{`"start" | "center" | "end"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"start"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
