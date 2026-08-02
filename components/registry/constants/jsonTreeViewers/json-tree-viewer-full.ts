import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const jsonTreeViewerFull: RegistryEntry = entry({
    id: "json-tree-viewer-full",
    title: "Full Tree Viewer",
    description:
      "Collapsible JSON tree with search + highlight, copy path / copy value, type-colored values, expand/collapse all, and a light/dark toggle.",
    source: `import { JsonTreeViewer } from "@/components/ui";

const data = {
  id: "user_42",
  active: true,
  username: "ada.lovelace",
  roles: ["admin", "maintainer"],
  profile: {
    fullName: "Ada Lovelace",
    bio: "First programmer, mathematician and visionary.",
    avatar: null,
    social: {
      github: "@adalovelace",
      twitter: "@ada_l",
    },
  },
  settings: {
    theme: "dark",
    notifications: {
      email: true,
      push: true,
      digest: "weekly",
    },
  },
  usage: {
    storage: { usedMB: 1284, quotaMB: 5120 },
    apiRequests: 38291,
    lastActive: "2026-07-31T08:42:11Z",
  },
};

export default function JsonTreeViewerDemo() {
  return (
    <JsonTreeViewer
      data={data}
      title="User Profile"
      defaultExpandedDepth={2}
      height={540}
    />
  );
}`,
  });
