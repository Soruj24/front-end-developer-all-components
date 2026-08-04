import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const breadcrumbClickable: RegistryEntry = entry({
  id: "breadcrumb-clickable",
  title: "Clickable",
  description: "Breadcrumb items with onClick handlers.",
  source: `import { Breadcrumb } from "@/components/_breadcrumb";

export default function BreadcrumbClickable() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        items={[
          { label: "Home", href: "/", onClick: () => alert("Navigate to Home") },
          { label: "Settings", href: "/settings", onClick: () => alert("Navigate to Settings") },
          { label: "Profile", onClick: () => alert("Navigate to Profile") },
        ]}
      />
      <p className="text-xs text-muted-foreground">Click any breadcrumb item to see the onClick handler fire.</p>
    </div>
  );
}`,
});
