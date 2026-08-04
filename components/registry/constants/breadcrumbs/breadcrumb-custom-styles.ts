import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const breadcrumbCustomStyles: RegistryEntry = entry({
  id: "breadcrumb-custom-styles",
  title: "Custom Styles",
  description: "Breadcrumb with custom container styles.",
  source: `import { Breadcrumb } from "@/components/_breadcrumb";

export default function BreadcrumbCustomStyles() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        className="rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-800"
        items={[
          { label: "Home", href: "/" },
          { label: "Dashboard", href: "/dashboard" },
          { label: "Analytics" },
        ]}
      />
      <Breadcrumb
        className="rounded-full border px-4 py-2"
        separator="›"
        items={[
          { label: "Acme Inc", href: "/" },
          { label: "Team", href: "/team" },
          { label: "Members" },
        ]}
      />
    </div>
  );
}`,
});
