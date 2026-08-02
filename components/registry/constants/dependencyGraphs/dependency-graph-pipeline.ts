import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const dependencyGraphPipeline: RegistryEntry = entry({
    id: "dependency-graph-pipeline",
    title: "Publish Pipeline",
    description:
      "A compact linear pipeline with search and minimap disabled — tune height, hide chrome, or set a custom empty message via props.",
    source: `import { DependencyGraph } from "@/components/ui";

const nodes = [
  { id: "push", label: "Push", kind: "app", status: "ok" },
  { id: "ci", label: "CI", kind: "service", status: "ok" },
  { id: "test", label: "Test", kind: "service", status: "warn" },
  { id: "build", label: "Build", kind: "service", status: "ok" },
  { id: "deploy", label: "Deploy", kind: "service", status: "ok" },
];

const edges = [
  { from: "push", to: "ci" },
  { from: "ci", to: "test" },
  { from: "ci", to: "build" },
  { from: "test", to: "build" },
  { from: "build", to: "deploy" },
];

export default function DependencyGraphPipeline() {
  return (
    <DependencyGraph
      nodes={nodes}
      edges={edges}
      searchable={false}
      minimap={false}
      minHeight={260}
      height={260}
      emptyMessage="No pipeline stages detected"
    />
  );
}`,
  });
