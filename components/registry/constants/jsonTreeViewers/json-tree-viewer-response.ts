import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const jsonTreeViewerResponse: RegistryEntry = entry({
    id: "json-tree-viewer-response",
    title: "API Response",
    description:
      "A realistic API response shape with a nested data object, pagination, and mixed value types.",
    source: `import { JsonTreeViewer } from "@/components/ui";

const data = {
  ok: true,
  status: 200,
  requestId: "req_9f2c1b",
  tookMs: 142,
  data: {
    projects: [
      {
        id: "prj_01",
        title: "Atlas",
        private: false,
        stars: 12480,
        languages: ["TypeScript", "Rust", "CSS"],
        owner: { login: "atlas-team", verified: true, plan: "free" },
      },
      {
        id: "prj_02",
        title: "Nimbus",
        private: true,
        stars: 0,
        languages: ["Go"],
        owner: { login: "acme-internal", plan: "enterprise" },
      },
    ],
    pagination: { page: 1, perPage: 10, total: 2 },
  },
};

export default function JsonTreeViewerResponse() {
  return (
    <JsonTreeViewer
      data={data}
      title="API Response"
      defaultExpandedDepth={2}
      height={420}
    />
  );
}`,
  });
