import { entry, type RegistryItem } from "@/components/registry";
import type { GeneratedComponent } from "../types";
import { slugify } from "./code";

/** Builds the canonical RegistryItem metadata for a generated component. */
export function buildRegistryItem(component: GeneratedComponent): RegistryItem {
  const id = slugify(component.name);
  return entry({
    id,
    title: component.name,
    description: component.description || undefined,
    source: component.source,
    files: [`components/ui/${id}.tsx`],
    dependencies: component.dependencies,
  });
}

export function toRegistryJson(component: GeneratedComponent): string {
  return JSON.stringify(buildRegistryItem(component), null, 2);
}

/** README content for the exported package. */
export function toReadme(component: GeneratedComponent): string {
  const docs = component.docs ?? "";
  return [
    `# ${component.name}`,
    "",
    component.description || "A generated UI component.",
    "",
    "## Install",
    "",
    `\`\`\`bash`,
    `npx @component-library/cli add ${slugify(component.name)}`,
    `\`\`\``,
    "",
    "## Usage",
    "",
    "```tsx",
    `import { ${component.name} } from "@component-library/ui";`,
    "",
    "export function Example() {",
    "  return <" + component.name + " />;",
    "}",
    "```",
    "",
    docs ? "## Docs\n\n" + docs : "",
  ].join("\n");
}
