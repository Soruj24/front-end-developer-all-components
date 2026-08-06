import type { RegistryEntry } from "../../schema";

export const blogEntries: RegistryEntry[] = [
  {
    id: "blog-page",
    name: "Blog Page",
    description: "Complete blog page layout with hero, search, categories, posts grid, sidebar, and pagination",
    type: "registry:component",
    files: [{ path: "blog/components/BlogPageLayout.tsx", type: "registry:component" }],
  },
];
