import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { miniNodes } from "./shared";

export const dependencyGraphApp: RegistryEntry = entry({
    id: "dependency-graph-app",
    title: "App Dependencies",
    description:
      "A small full-stack dependency set — click to select, drag to rearrange, hover to trace connections, and use search, minimap, or focus mode to explore it.",
    source: `import { useState } from "react";
import { DependencyGraph } from "@/components/ui";

${miniNodes}

export default function DependencyGraphApp() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex w-full flex-col gap-3">
      <p className="min-h-5 text-xs text-subtle">
        {selected ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="text-success">●</span> Selected: {selected}
          </span>
        ) : (
          "Click a node to select it — drag to rearrange, hover to trace connections."
        )}
      </p>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        onNodeSelect={(node) => setSelected(node ? node.label : null)}
      />
    </div>
  );
}`,
  });
