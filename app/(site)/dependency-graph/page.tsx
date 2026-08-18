"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { DependencyGraph } from "@/components/ui";
import {
  miniNodes,
  miniEdges,
  largeNodes,
  largeEdges,
  microNodes,
  microEdges,
} from "@/components/dependency-graph/demo";

const installCommand = `npx component-library@latest add dependency-graph`;

const usageCode = `import { DependencyGraph } from "@/components/ui";

<DependencyGraph
  nodes={nodes}
  edges={edges}
  onNodeSelect={(node) => console.log(node)}
/>`;

function SelectionHint({ selected }: { selected: string | null }) {
  return (
    <p className="min-h-5 text-xs text-subtle">
      {selected ? (
        <span className="inline-flex items-center gap-1.5">
          <span className="text-success">●</span> Selected: {selected}
        </span>
      ) : (
        "Click a node to select it — drag to rearrange, hover to trace connections."
      )}
    </p>
  );
}

export default function DependencyGraphPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Dependency Graph
          </h1>
          <Badge variant="primary">3 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An interactive SVG dependency graph with a longest-path layered
          layout. Pan and zoom freely, drag nodes to rearrange, hover to trace
          connections, search to isolate matches, and use focus mode or the
          minimap to navigate — even on large graphs.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Interactive Graph</h3>
            <p className="text-sm text-muted-foreground">Click to select nodes, drag to rearrange, hover to trace connections.</p>
          </div>
          <ComponentPreview id="dependency-graph-app">
            <div className="flex w-full flex-col gap-3">
              <SelectionHint selected={selected} />
              <DependencyGraph
                nodes={miniNodes}
                edges={miniEdges}
                onNodeSelect={(node) => setSelected(node ? node.label : null)}
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Large Graph</h3>
            <p className="text-sm text-muted-foreground">Complex dependency tree with many nodes and edges.</p>
          </div>
          <ComponentPreview id="dependency-graph-large">
            <DependencyGraph nodes={largeNodes} edges={largeEdges} height={520} />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Pipeline View</h3>
            <p className="text-sm text-muted-foreground">Minimal pipeline with search and minimap disabled.</p>
          </div>
          <ComponentPreview id="dependency-graph-pipeline">
            <DependencyGraph
              nodes={microNodes}
              edges={microEdges}
              searchable={false}
              minimap={false}
              minHeight={260}
              height={260}
              emptyMessage="No pipeline stages detected"
            />
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
                <td className="px-4 py-3 font-mono text-xs">nodes</td>
                <td className="px-4 py-3 text-muted-foreground">GraphNode[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">edges</td>
                <td className="px-4 py-3 text-muted-foreground">GraphEdge[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">400</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">searchable</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">minimap</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onNodeSelect</td>
                <td className="px-4 py-3 text-muted-foreground">(node: GraphNode | null) =&gt; void</td>
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
