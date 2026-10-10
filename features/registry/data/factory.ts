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
  api?: RegistryComponent["api"];
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
  return `"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ${Component}Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function ${Component}({ className, children, ...props }: ${Component}Props) {
  return (
    <div
      className={cn("rounded-lg border border-border bg-background p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default function ${Component}Demo() {
  return <${Component}>${Component} demo content.</${Component}>;
}`;
}

/** Builds a fully-populated RegistryComponent from a compact seed. */
export function component(seed: ComponentSeed): RegistryComponent {
  const slug = seed.slug;
  const fallbackDate = "2026-01-15T00:00:00.000Z";
  const now = fallbackDate;
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
      seed.longDescription ??
      `${seed.name}: ${seed.description} Ships as a single copy-paste file with light and dark mode support.`,
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
