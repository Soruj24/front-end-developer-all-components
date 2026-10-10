import type { RegistryComponent } from "@/features/registry";
import type { CopyPackage } from "../types/copy-package";
import { CN_INSTALL } from "../constants/target-env";
import { toStandalone, needsClientDirective, cnFile } from "./standalone";

const PLACEHOLDER_RE =
  /replace this placeholder|Add your implementation here|TODO:\s*implement|Import your component here/;

function pascalCase(slug: string): string {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function detectDeps(component: RegistryComponent, usesCn: boolean): string[] {
  const deps = new Set<string>(component.dependencies ?? []);
  if (usesCn) {
    deps.add("clsx");
    deps.add("tailwind-merge");
  }
  if (component.source.includes("lucide-react")) deps.add("lucide-react");
  if (component.source.includes('from "next')) deps.add("next");
  return [...deps];
}

function buildExample(component: RegistryComponent, pascal: string): string {
  const client = needsClientDirective(component.source) ? '"use client";\n\n' : "";
  const importPath = `./${component.slug}`;
  const variantDemo =
    component.variants.length > 0
      ? `\n      <div className="flex flex-wrap gap-2">\n${component.variants
          .slice(0, 4)
          .map((v) => `        <${pascal} variant="${v}">${v}</${pascal}>`)
          .join("\n")}\n      </div>`
      : "";
  return `${client}import { ${pascal} } from "${importPath}";

export default function ${pascal}Example() {
  return (
    <div className="flex min-h-56 flex-col items-start justify-center gap-4 p-6">
      <${pascal}>${component.name} example</${pascal}>${variantDemo}
    </div>
  );
}
`;
}

/** Builds Option A (component) + Option B (complete example) copy payloads. */
export function buildCopyPackage(component: RegistryComponent): CopyPackage {
  const usesCn = component.source.includes("@/lib/cn");
  const standalone = toStandalone(component.source);
  const needsClient = needsClientDirective(component.source);
  const requiredDeps = detectDeps(component, usesCn);
  const pascal = pascalCase(component.slug);
  const filename = `${component.slug}.tsx`;
  const installable = requiredDeps.filter((d) => d !== "react" && d !== "next");
  const installCommand =
    installable.length > 0 ? `npm install ${installable.join(" ")}` : usesCn ? CN_INSTALL : "";

  return {
    slug: component.slug,
    componentFile: { filename, language: "tsx", code: component.source },
    standaloneFile: { filename, language: "tsx", code: standalone },
    exampleFile: {
      filename: `${component.slug}-example.tsx`,
      language: "tsx",
      code: buildExample(component, pascal),
    },
    cnFile: usesCn ? cnFile() : null,
    installCommand,
    requiredDeps,
    needsClientDirective: needsClient,
    usesCn,
    isPlaceholder: PLACEHOLDER_RE.test(component.source),
  };
}
