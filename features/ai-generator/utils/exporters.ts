import { createZip } from "@/lib/zip";
import type { GeneratedComponent } from "../types";
import { slugify } from "./code";
import { buildRegistryItem, toReadme } from "./registry";

function download(name: string, content: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

function packageJson(component: GeneratedComponent): string {
  return JSON.stringify(
    {
      name: `@component-library/${slugify(component.name)}`,
      version: "1.0.0",
      type: "module",
      files: ["dist", "README.md"],
      dependencies: Object.fromEntries(
        component.dependencies.map((dep) => [dep, "*"])
      ),
      peerDependencies: { react: "^18.0.0 || ^19.0.0" },
    },
    null,
    2
  );
}

/** The files exported with a generated component (code, registry, docs). */
export function toSourceFiles(component: GeneratedComponent): { name: string; content: string }[] {
  const id = slugify(component.name);
  return [
    { name: `${component.name}.tsx`, content: component.source },
    { name: "registry.json", content: JSON.stringify(buildRegistryItem(component), null, 2) },
    { name: "README.md", content: toReadme(component) },
    { name: "package.json", content: packageJson(component) },
    { name: `components/ui/${id}.tsx`, content: component.source },
  ];
}

export function downloadTsx(component: GeneratedComponent): void {
  download(`${component.name}.tsx`, component.source, "text/plain");
}

export function downloadRegistryJson(component: GeneratedComponent): void {
  download("registry.json", JSON.stringify(buildRegistryItem(component), null, 2), "application/json");
}

export function downloadZip(component: GeneratedComponent): void {
  const blob = createZip(toSourceFiles(component));
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${slugify(component.name)}.zip`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard?.writeText(text);
    return true;
  } catch {
    return false;
  }
}
