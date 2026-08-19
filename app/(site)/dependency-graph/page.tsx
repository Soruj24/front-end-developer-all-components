"use client";

import { useState, useEffect } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Users, Shield, Link, Settings, Mail, Calendar, Clock, Folder, Globe, UsersRound, ShieldCheck, ShieldError, Trash2, FolderOpen, ShieldAlert, ShieldCheck2, UsersOff } from "lucide-react";

const DEPENDENCY_GRAPH_SOURCE = "use client";

function DependencyGraphDemo() {
  const [nodes, setNodes] = useState(() => {
    return [
      { id: "1", label: "Auth Service", type: "service", color: "blue" },
      { id: "2", label: "Database", type: "database", color: "green" },
      { id: "3", label: "Cache", type: "cache", color: "orange" },
      { id: "4", label: "API Gateway", type: "service", color: "blue" },
      { id: "5", label: "Queue", type: "queue", color: "purple" },
    ];
  });
  const [edges, setEdges] = useState(() => {
    return [
      { source: "1", target: "2", label: "writes to" },
      { source: "1", target: "3", label: "reads from" },
      { source: "2", target: "4", label: "served by" },
      { source: "3", target: "1", label: "cached by" },
      { source: "4", target: "5", label: "queues for" },
    ];
  });

  return (
    <div className="h-96 w-full rounded-lg border border-border bg-surface dark:border-white/[.145] overflow-hidden">
      <svg className="w-full h-full" aria-labelledby="graph-title">
        <g fill="none" stroke-width="2">
          {edges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const targetNode = nodes.find((n) => n.id === edge.target);
            const color = sourceNode?.color === "blue" ? "currentColor" : sourceNode?.color === "green" ? "#22c55e" : "#f97316";
            return (
              <path
                key={edge.source + edge.target}
                d={`M${sourceNode?.x || 0},${sourceNode?.y || 0} C${(sourceNode?.x || 0) + 100},${(sourceNode?.y || 0) - 50} ${(targetNode?.x || 0) - 100},${(targetNode?.y || 0) + 50} ${targetNode?.x || 0},${targetNode?.y || 0}`}
                stroke={color}
                fill="none"
              />
            );
          })}
          {nodes.map((node) => {
            const color = node.color === "blue" ? "currentColor" : node.color === "green" ? "#22c55e" : "#f97316";
            return (
              <g key={node.id}>
                <circle
                  cx={node.x || 50}
                  cy={node.y || 50}
                  r={16}
                  fill={color}
                  stroke="white"
                  strokeWidth="2"
                />
                <text x={node.x || 50} y={node.y || 50} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="white">
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
        <text id="graph-title" x="20" y="20" fontSize="14" fill="white" opacity="0.8">
          Dependency Graph
        </text>
      </svg>
    </div>
  );
}

export default function DependencyGraphPage() {
  return (
    <ComponentDocPage
      name="Dependency Graph"
      category="Data Display"
      description="A visual dependency graph showing relationships between services, databases, and components with interactive node highlighting."
    >
      <PreviewPanel filename="dependency-graph.tsx">
        <DependencyGraphDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={DEPENDENCY_GRAPH_SOURCE}
        filename="components/ui/DependencyGraph/DependencyGraph.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-4">
        <ExampleBlock title="Default Graph" description="Visualize service dependencies." code={DEPENDENCY_GRAPH_SOURCE}>
          <DependencyGraphDemo />
        </ExampleBlock>

        <ExampleBlock title="Custom Data" description="Import custom nodes and edges data." code={DEPENDENCY_GRAPH_SOURCE}>
          <DependencyGraphDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}