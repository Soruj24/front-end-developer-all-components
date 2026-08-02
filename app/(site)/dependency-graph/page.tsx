"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";
import { DependencyGraph } from "@/components/ui";
import {
  miniNodes,
  miniEdges,
  largeNodes,
  largeEdges,
  microNodes,
  microEdges,
} from "@/components/dependency-graph/demo";

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
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Dependency Graph
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An interactive SVG dependency graph with a longest-path layered
          layout. Pan and zoom freely, drag nodes to rearrange, hover to trace
          connections, search to isolate matches, and use focus mode or the
          minimap to navigate — even on large graphs.
        </p>
      </header>

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

      <ComponentPreview id="dependency-graph-large">
        <DependencyGraph nodes={largeNodes} edges={largeEdges} height={520} />
      </ComponentPreview>

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
  );
}
