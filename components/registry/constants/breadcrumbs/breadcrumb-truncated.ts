import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const breadcrumbTruncated: RegistryEntry = entry({
  id: "breadcrumb-truncated",
  title: "Truncated",
  description: "Breadcrumb with collapsed intermediate items.",
  source: `import { Breadcrumb } from "@/components/_breadcrumb";

export default function BreadcrumbTruncated() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "...", onClick: () => alert("Show collapsed items") },
          { label: "Deeply", href: "/a/b/c/deeply" },
          { label: "Nested", href: "/a/b/c/deeply/nested" },
          { label: "Page" },
        ]}
      />
      <p className="text-xs text-muted-foreground">Use &quot;...&quot; as a label to indicate collapsed intermediate items.</p>
    </div>
  );
}`,
});
