import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { largeLayers } from "./shared";

export const dependencyGraphLarge: RegistryEntry = entry({
    id: "dependency-graph-large",
    title: "Large Graph",
    description:
      "A deterministic 124-node graph built from layered modules — zoom and pan, pinch to zoom, minimap navigation, and label simplification when zoomed far out keep it usable at scale.",
    source: `import { DependencyGraph } from "@/components/ui";

${largeLayers}

export default function DependencyGraphLarge() {
  return (
    <DependencyGraph nodes={nodes} edges={edges} height={520} />
  );
}`,
  });
