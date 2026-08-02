import type { RegistryComponent, RegistryCategory } from "../types";
import type {
  ComponentPropDoc,
  ComponentReleaseDoc,
  ComponentStatsDoc,
  PublishStatus,
  Visibility,
} from "./models";

/** Loose structural shape produced by Mongoose `.lean()` queries. */
export interface LeanComponentDoc {
  _id?: unknown;
  slug: string;
  name?: string;
  title?: string;
  description?: string;
  longDescription?: string;
  category?: string;
  tags?: string[];
  status?: string;
  publishStatus?: PublishStatus;
  visibility?: Visibility;
  author?: string;
  license?: string;
  version?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string | null;
  scheduledAt?: Date | string | null;
  stats?: Partial<ComponentStatsDoc>;
  dependencies?: string[];
  files?: string[];
  variants?: string[];
  sizes?: string[];
  features?: string[];
  tailwindClasses?: string[];
  props?: ComponentPropDoc[];
  examples?: unknown[];
  releases?: ComponentReleaseDoc[];
  install?: Record<string, string>;
  cli?: string;
  source?: string;
  featured?: boolean;
  popular?: boolean;
}

/** Mongoose document → the existing `RegistryComponent` domain shape. */
export function toRegistryComponent(doc: LeanComponentDoc): RegistryComponent {
  const stats = (doc.stats ?? {}) as Partial<ComponentStatsDoc>;
  return {
    slug: doc.slug,
    name: doc.name ?? doc.title ?? doc.slug,
    description: doc.description ?? "",
    longDescription: doc.longDescription ?? "",
    category: doc.category ?? "uncategorized",
    tags: doc.tags ?? [],
    status: doc.status === "beta" || doc.status === "new" || doc.status === "deprecated" ? doc.status : "stable",
    author: doc.author ?? "",
    license: doc.license ?? "MIT",
    version: doc.version ?? "1.0.0",
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
    stats: {
      downloads: stats.downloads ?? 0,
      likes: stats.likes ?? 0,
      bookmarks: stats.bookmarks ?? 0,
      comments: stats.comments ?? 0,
      views: stats.views ?? 0,
    },
    dependencies: doc.dependencies ?? [],
    files: doc.files ?? [],
    variants: doc.variants ?? [],
    sizes: doc.sizes ?? [],
    features: doc.features ?? [],
    tailwindClasses: doc.tailwindClasses ?? [],
    props: doc.props ?? [],
    releases: doc.releases ?? [],
    install: (doc.install ?? {}) as RegistryComponent["install"],
    cli: doc.cli ?? "",
    source: doc.source ?? "",
  };
}

/** Registry domain shape → Component document fields (for seeding + admin CRUD). */
export function toComponentDocInput(component: RegistryComponent): Partial<LeanComponentDoc> {
  return {
    slug: component.slug,
    name: component.name,
    description: component.description,
    longDescription: component.longDescription,
    category: component.category,
    tags: component.tags,
    status: component.status,
    version: component.version,
    author: component.author,
    license: component.license,
    stats: {
      downloads: component.stats.downloads,
      likes: component.stats.likes,
      bookmarks: component.stats.bookmarks,
      comments: component.stats.comments,
      views: component.stats.views,
    },
    dependencies: component.dependencies,
    files: component.files,
    variants: component.variants,
    sizes: component.sizes,
    features: component.features,
    tailwindClasses: component.tailwindClasses,
    props: component.props,
    releases: component.releases,
    install: component.install,
    cli: component.cli,
    source: component.source,
  };
}

/** Public summary of publish metadata used by the admin list. */
export interface AdminComponentRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: "Published" | "Draft" | "Archived" | "Scheduled";
  version: string;
  author: string;
  description: string;
  downloads: number;
  likes: number;
  views: number;
  updatedAt: string;
  featured: boolean;
  popular: boolean;
  visibility: Visibility;
  scheduledAt?: string | null;
}

const publishLabel: Record<PublishStatus, AdminComponentRow["status"]> = {
  published: "Published",
  draft: "Draft",
  archived: "Archived",
  scheduled: "Scheduled",
};

/** Mongoose document → admin table row shape. */
export function toAdminRow(doc: LeanComponentDoc): AdminComponentRow {
  return {
    id: String(doc._id),
    slug: doc.slug,
    name: doc.name ?? doc.slug,
    category: doc.category ?? "uncategorized",
    status: doc.publishStatus ? publishLabel[doc.publishStatus] ?? "Draft" : "Draft",
    version: doc.version ?? "1.0.0",
    author: doc.author ?? "",
    description: doc.description ?? "",
    downloads: doc.stats?.downloads ?? 0,
    likes: doc.stats?.likes ?? 0,
    views: doc.stats?.views ?? 0,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : "",
    featured: doc.featured ?? false,
    popular: doc.popular ?? false,
    visibility: doc.visibility ?? "public",
    scheduledAt: doc.scheduledAt ? new Date(doc.scheduledAt).toISOString() : null,
  };
}

/** Category document → existing RegistryCategory domain shape. */
export function toRegistryCategory(doc: {
  slug: string;
  label: string;
  description?: string;
  icon?: string;
}): RegistryCategory {
  return {
    id: doc.slug,
    label: doc.label,
    description: doc.description ?? "",
    icon: doc.icon ?? "▣",
  };
}
