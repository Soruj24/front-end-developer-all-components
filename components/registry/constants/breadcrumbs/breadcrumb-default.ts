import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const breadcrumbDefault: RegistryEntry = entry({
  id: "breadcrumb-default",
  title: "Default",
  description: "A basic breadcrumb navigation.",
  source: `import { Breadcrumb } from "@/components/_breadcrumb";

export default function BreadcrumbDefault() {
  return (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Breadcrumb" },
      ]}
    />
  );
}`,
});
