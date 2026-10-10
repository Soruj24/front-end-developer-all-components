import type { ComponentProp } from "./props";
import type { RegistryRelease } from "./release";

export type ComponentStatus = "stable" | "beta" | "new" | "deprecated";
export type InstallManager = "npm" | "pnpm" | "yarn" | "bun";

/** Aggregated community engagement numbers for a component. */
export interface ComponentStats {
  downloads: number;
  likes: number;
  bookmarks: number;
  comments: number;
  views: number;
}

/** Documented API surface for data-driven components (mock + real). */
export interface ComponentApiDocs {
  resource: string;
  baseUrl: string;
  endpoints: { method: string; path: string; description: string }[];
  queryParams?: string[];
  responseExample: string;
  mappingNote?: string;
  authNote?: string;
}

/** A single entry in the component registry catalog. */
export interface RegistryComponent {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  category: string;
  tags: string[];
  status: ComponentStatus;
  author: string;
  license: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  stats: ComponentStats;
  dependencies: string[];
  files: string[];
  variants: string[];
  sizes: string[];
  features: string[];
  tailwindClasses: string[];
  props: ComponentProp[];
  releases: RegistryRelease[];
  install: Record<InstallManager, string>;
  cli: string;
  /** Runnable JSX source exposed in the docs. */
  source: string;
  /** Present only for API-driven components. */
  api?: ComponentApiDocs;
}
