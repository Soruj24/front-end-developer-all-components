"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { DependencyGraph } from "@/components/ui/DependencyGraph";
import type { GraphNode, GraphEdge } from "@/components/ui/DependencyGraph";

const DEPENDENCY_GRAPH_SOURCE = `// See components/ui/DependencyGraph/DependencyGraph.tsx (277 lines)
// Includes: pan, zoom, pinch, drag-nodes, search, minimap, focus, keyboard shortcuts`;

const SAMPLE_NODES: GraphNode[] = [
  { id: "app", label: "App Shell", kind: "app", status: "ok" },
  { id: "auth", label: "Auth Service", kind: "service", status: "ok" },
  { id: "api", label: "API Gateway", kind: "service", status: "ok" },
  { id: "db", label: "PostgreSQL", kind: "db", status: "ok" },
  { id: "cache", label: "Redis Cache", kind: "db", status: "warn" },
  { id: "queue", label: "Message Queue", kind: "queue", status: "ok" },
  { id: "ui", label: "UI Components", kind: "ui", status: "ok" },
  { id: "hooks", label: "React Hooks", kind: "hooks", status: "ok" },
  { id: "utils", label: "Utilities", kind: "util", status: "ok" },
  { id: "mail", label: "Email Service", kind: "service", status: "error" },
];

const SAMPLE_EDGES: GraphEdge[] = [
  { from: "app", to: "auth" },
  { from: "app", to: "api" },
  { from: "app", to: "ui" },
  { from: "auth", to: "db" },
  { from: "auth", to: "cache" },
  { from: "api", to: "auth" },
  { from: "api", to: "db" },
  { from: "api", to: "cache" },
  { from: "api", to: "queue" },
  { from: "queue", to: "mail" },
  { from: "ui", to: "hooks" },
  { from: "hooks", to: "utils" },
];

const SMALL_NODES: GraphNode[] = [
  { id: "a", label: "Component A", kind: "component" },
  { id: "b", label: "Component B", kind: "component" },
  { id: "c", label: "Service C", kind: "service" },
  { id: "d", label: "Utils D", kind: "util" },
];

const SMALL_EDGES: GraphEdge[] = [
  { from: "a", to: "b" },
  { from: "a", to: "c" },
  { from: "b", to: "d" },
  { from: "c", to: "d" },
];

const BASIC_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={nodes} edges={edges} />`;

const MINIMAP_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={nodes} edges={edges} minimap />`;

const NO_SEARCH_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={nodes} edges={edges} searchable={false} />`;

const NO_MINIMAP_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={nodes} edges={edges} minimap={false} />`;

const EMPTY_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={[]} edges={[]} />`;

const SELECT_CODE = `"use client";
import { DependencyGraph } from "@/components/ui/DependencyGraph";
import type { GraphNode } from "@/components/ui/DependencyGraph";

function SelectExample() {
  const [selected, setSelected] = useState<GraphNode | null>(null);
  return (
    <div>
      <DependencyGraph nodes={nodes} edges={edges} onNodeSelect={setSelected} />
      {selected && <p>Selected: {selected.label}</p>}
    </div>
  );
}`;

const HEIGHT_CODE = `import { DependencyGraph } from "@/components/ui/DependencyGraph";

<DependencyGraph nodes={nodes} edges={edges} height={300} minHeight={300} />`;

export default function DependencyGraphPage() {
  const [selected, setSelected] = useState<GraphNode | null>(null);

  return (
    <ComponentDocPage
      name="Dependency Graph"
      category="Data Display"
      description="An interactive dependency graph with pan, zoom, pinch, node drag, search, minimap, focus mode, and keyboard shortcuts."
    >
      <PreviewPanel filename="dependency-graph-preview.tsx">
        <DependencyGraph nodes={SAMPLE_NODES} edges={SAMPLE_EDGES} minHeight={400} />
      </PreviewPanel>

      <SourceCodeViewer
        source={DEPENDENCY_GRAPH_SOURCE}
        filename="components/ui/DependencyGraph/DependencyGraph.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Basic Graph" description="Auto-layout with pan, zoom, and pinch support." code={BASIC_CODE} filename="basic.tsx">
          <DependencyGraph nodes={SMALL_NODES} edges={SMALL_EDGES} minHeight={320} />
        </ExampleBlock>

        <ExampleBlock title="Full Feature Set" description="Search, minimap, and node focus with a status indicator." code={MINIMAP_CODE} filename="full.tsx">
          <DependencyGraph nodes={SAMPLE_NODES} edges={SAMPLE_EDGES} minHeight={440} />
        </ExampleBlock>

        <ExampleBlock title="Node Selection" description="Click a node to select it and fire onNodeSelect." code={SELECT_CODE} filename="select.tsx">
          <div className="flex flex-col gap-3">
            <DependencyGraph nodes={SMALL_NODES} edges={SMALL_EDGES} onNodeSelect={setSelected} minHeight={320} />
            {selected && (
              <div className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm">
                <span className="text-muted-foreground">Selected: </span>
                <span className="font-medium text-foreground">{selected.label}</span>
                {selected.kind && <span className="ml-1.5 text-muted-foreground">({selected.kind})</span>}
              </div>
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Without Search" description="Hide the search bar." code={NO_SEARCH_CODE} filename="no-search.tsx">
          <DependencyGraph nodes={SMALL_NODES} edges={SMALL_EDGES} searchable={false} minHeight={320} />
        </ExampleBlock>

        <ExampleBlock title="Without Minimap" description="Hide the minimap for a cleaner view." code={NO_MINIMAP_CODE} filename="no-minimap.tsx">
          <DependencyGraph nodes={SMALL_NODES} edges={SMALL_EDGES} minimap={false} minHeight={320} />
        </ExampleBlock>

        <ExampleBlock title="Custom Height" description="Control the graph container height." code={HEIGHT_CODE} filename="height.tsx">
          <DependencyGraph nodes={SMALL_NODES} edges={SMALL_EDGES} height={300} minHeight={300} />
        </ExampleBlock>

        <ExampleBlock title="Empty State" description="Display a message when no nodes are provided." code={EMPTY_CODE} filename="empty.tsx">
          <DependencyGraph nodes={[]} edges={[]} height={200} minHeight={200} emptyMessage="No dependencies to display." />
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
