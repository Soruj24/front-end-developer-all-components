import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const jsonTreeViewerLarge: RegistryEntry = entry({
    id: "json-tree-viewer-large",
    title: "Large JSON",
    description:
      "A 5,000-item array is parsed once and rendered lazily — each container caps at a configurable number of rows with a “N more” reveal.",
    source: `import { JsonTreeViewer } from "@/components/ui";

const data = {
  schemaVersion: "1.0",
  generated: true,
  source: "telemetry.edge.prod",
  unit: "seconds",
  points: Array.from({ length: 5000 }, (_, i) => ({
    t: i * 5,
    cpu: Number((0.2 + 0.6 * Math.abs(Math.sin(i / 40))).toFixed(3)),
    mem: Number((0.4 + 0.2 * Math.cos(i / 90)).toFixed(3)),
    rps: Math.round(120 + 80 * Math.abs(Math.sin(i / 15))),
  })),
};

export default function JsonTreeViewerLarge() {
  return (
    <JsonTreeViewer
      data={data}
      title="Telemetry — 5,000 points"
      defaultExpandedDepth={1}
      maxItems={60}
      height={420}
    />
  );
}`,
  });
