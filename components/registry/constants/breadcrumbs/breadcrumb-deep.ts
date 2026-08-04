import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const breadcrumbDeep: RegistryEntry = entry({
  id: "breadcrumb-deep",
  title: "Deep Nesting",
  description: "Breadcrumb with deeply nested items.",
  source: `import { Breadcrumb } from "@/components/_breadcrumb";

function HomeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

export default function BreadcrumbDeep() {
  return (
    <Breadcrumb
      items={[
        { label: "Home", href: "/", icon: <HomeIcon /> },
        { label: "Projects", href: "/projects" },
        { label: "Website Redesign", href: "/projects/website" },
        { label: "Assets", href: "/projects/website/assets" },
        { label: "Images" },
      ]}
    />
  );
}`,
});
