import type { RegistryComponent } from "../types/component";
import { installManagers, packageName, cliCommand } from "../constants/install";

/** Minimal fields a catalog entry must declare; everything else has defaults. */
export interface ComponentSeed {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  status?: RegistryComponent["status"];
  author?: string;
  version?: string;
  createdAt?: string;
  updatedAt?: string;
  stats?: Partial<RegistryComponent["stats"]>;
  dependencies?: string[];
  files?: string[];
  variants?: string[];
  sizes?: string[];
  features?: string[];
  tailwindClasses?: string[];
  longDescription?: string;
  props?: RegistryComponent["props"];
  releases?: RegistryComponent["releases"];
  source?: string;
}

export const DEFAULT_AUTHOR = "Component Library Team";
export const DEFAULT_VERSION = "1.0.0";
export const DEFAULT_STATS: RegistryComponent["stats"] = {
  downloads: 0,
  likes: 0,
  bookmarks: 0,
  comments: 0,
  views: 0,
};

/** Pascal-case a kebab slug, e.g. "file-upload" -> "FileUpload". */
function pascalCase(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function defaultSource(slug: string): string {
  const Component = pascalCase(slug);
  return `import { ${Component} } from "@/components/ui";

export default function ${Component}Demo() {
  return <${Component} />;
}`;
}

/** Builds a fully-populated RegistryComponent from a compact seed. */
export function component(seed: ComponentSeed): RegistryComponent {
  const slug = seed.slug;
  const now = new Date().toISOString();
  const { stats: statsOverride, ...rest } = seed;
  return {
    status: "stable",
    author: DEFAULT_AUTHOR,
    license: "MIT",
    version: DEFAULT_VERSION,
    createdAt: now,
    updatedAt: now,
    dependencies: ["react"],
    files: [`components/ui/${slug}.tsx`],
    variants: [],
    sizes: [],
    features: ["responsive", "dark-mode", "accessibility"],
    tailwindClasses: [
      "bg-background",
      "text-foreground",
      "border-border",
      "rounded-lg",
    ],
    longDescription:
      `${seed.name} is a dependency-free component designed for production use. ` +
      "It follows the platform design tokens, supports light and dark mode, " +
      "and is keyboard accessible out of the box.",
    props: [],
    releases: [
      {
        version: seed.version ?? DEFAULT_VERSION,
        kind: "minor",
        date: seed.updatedAt ?? now,
        notes: ["Initial public release."],
      },
    ],
    source: defaultSource(slug),
    ...rest,
    stats: { ...DEFAULT_STATS, ...statsOverride },
    install: Object.fromEntries(
      installManagers.map((manager) => [manager, `${manager} install ${packageName(slug)}`])
    ) as RegistryComponent["install"],
    cli: cliCommand(slug),
  };
}
