import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const jsonTreeViewerNested: RegistryEntry = entry({
    id: "json-tree-viewer-nested",
    title: "Deeply Nested",
    description:
      "Three levels of nesting with arrays, booleans, numbers, and nulls — the default expand depth shows exactly how much is open.",
    source: `import { JsonTreeViewer } from "@/components/ui";

const data = {
  service: "orders-api",
  version: "2.4.1",
  environments: {
    production: {
      url: "https://api.example.com",
      region: "eu-west-1",
      replicas: 4,
      enabled: true,
    },
    staging: {
      url: "https://staging.api.example.com",
      replicas: 2,
      enabled: true,
    },
  },
  features: {
    cache: { ttlSeconds: 300, provider: "redis", cluster: ["r-1", "r-2", "r-3"] },
    retries: { max: 5, backoff: "exponential" },
  },
  flags: [true, false, false, true, true],
};

export default function JsonTreeViewerNested() {
  return (
    <JsonTreeViewer
      data={data}
      title="Service Configuration"
      defaultExpandedDepth={3}
      height={480}
    />
  );
}`,
  });
