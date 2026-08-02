import mongoose, { Schema } from "mongoose";
import type { ComponentStatus } from "../types/component";

export const PUBLISH_STATUSES = ["draft", "published", "archived", "scheduled"] as const;
export type PublishStatus = (typeof PUBLISH_STATUSES)[number];

export const VISIBILITY_OPTIONS = ["public", "private"] as const;
export type Visibility = (typeof VISIBILITY_OPTIONS)[number];

export interface ComponentPropDoc {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
  values?: string[];
}

export interface ComponentExampleDoc {
  title: string;
  description?: string;
  code: string;
}

export interface ComponentReleaseDoc {
  version: string;
  kind: "major" | "minor" | "patch";
  date: string;
  notes: string[];
}

export interface ComponentStatsDoc {
  downloads: number;
  likes: number;
  bookmarks: number;
  comments: number;
  views: number;
}

/** The Component document — matches the product spec's Component model. */
export interface ComponentDoc {
  _id: unknown;
  slug: string;
  name: string;
  title?: string;
  description: string;
  longDescription?: string;
  category: string;
  subCategory?: string;
  tags: string[];
  status: ComponentStatus;
  publishStatus: PublishStatus;
  visibility: Visibility;
  thumbnail?: string;
  gallery: string[];
  previewImages: string[];
  code?: string;
  tailwindCode?: string;
  htmlCode?: string;
  reactCode?: string;
  typescriptCode?: string;
  installation?: string;
  usage?: string;
  props: ComponentPropDoc[];
  examples: ComponentExampleDoc[];
  dependencies: string[];
  files: string[];
  variants: string[];
  sizes: string[];
  features: string[];
  tailwindClasses: string[];
  version: string;
  author: string;
  license: string;
  source?: string;
  cli?: string;
  install?: Record<string, string>;
  releases: ComponentReleaseDoc[];
  stats: ComponentStatsDoc;
  featured: boolean;
  popular: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
  scheduledAt?: Date | null;
  deletedAt?: Date | null;
}

const statsSchema = new Schema<ComponentStatsDoc>(
  {
    downloads: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { _id: false }
);

const propSchema = new Schema<ComponentPropDoc>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    default: String,
    required: Boolean,
    description: { type: String, default: "" },
    values: [String],
  },
  { _id: false }
);

const exampleSchema = new Schema<ComponentExampleDoc>(
  {
    title: { type: String, required: true },
    description: String,
    code: { type: String, default: "" },
  },
  { _id: false }
);

const releaseSchema = new Schema<ComponentReleaseDoc>(
  {
    version: { type: String, required: true },
    kind: { type: String, enum: ["major", "minor", "patch"], default: "minor" },
    date: { type: String, default: () => new Date().toISOString() },
    notes: [String],
  },
  { _id: false }
);

const componentSchema = new Schema<ComponentDoc>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    title: String,
    description: { type: String, default: "" },
    longDescription: { type: String, default: "" },
    category: { type: String, index: true, default: "uncategorized" },
    subCategory: String,
    tags: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["stable", "beta", "new", "deprecated"],
      default: "stable",
    },
    publishStatus: {
      type: String,
      enum: PUBLISH_STATUSES,
      default: "draft",
      index: true,
    },
    visibility: { type: String, enum: VISIBILITY_OPTIONS, default: "public" },
    thumbnail: String,
    gallery: { type: [String], default: [] },
    previewImages: { type: [String], default: [] },
    code: String,
    tailwindCode: String,
    htmlCode: String,
    reactCode: String,
    typescriptCode: String,
    installation: String,
    usage: String,
    props: { type: [propSchema], default: [] },
    examples: { type: [exampleSchema], default: [] },
    dependencies: { type: [String], default: ["react"] },
    files: { type: [String], default: [] },
    variants: { type: [String], default: [] },
    sizes: { type: [String], default: [] },
    features: { type: [String], default: [] },
    tailwindClasses: { type: [String], default: [] },
    version: { type: String, default: "1.0.0" },
    author: { type: String, default: "" },
    license: { type: String, default: "MIT" },
    source: String,
    cli: String,
    install: { type: Map, of: String },
    releases: { type: [releaseSchema], default: [] },
    stats: { type: statsSchema, default: () => ({}) },
    featured: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
    publishedAt: Date,
    scheduledAt: Date,
    deletedAt: Date,
  },
  { timestamps: true }
);

componentSchema.index({ name: "text", description: "text", tags: "text", slug: "text" });
componentSchema.index({ publishStatus: 1, deletedAt: 1, featured: 1 });
componentSchema.index({ publishStatus: 1, deletedAt: 1, "stats.downloads": -1 });
componentSchema.index({ publishStatus: 1, deletedAt: 1, updatedAt: -1 });

export interface ComponentVersionDoc {
  componentId: mongoose.Types.ObjectId;
  version: string;
  kind: "major" | "minor" | "patch";
  snapshot: Record<string, unknown>;
  notes: string[];
  createdAt: Date;
}

const componentVersionSchema = new Schema<ComponentVersionDoc>({
  componentId: { type: Schema.Types.ObjectId, ref: "Component", index: true },
  version: { type: String, required: true },
  kind: { type: String, enum: ["major", "minor", "patch"], default: "minor" },
  snapshot: { type: Schema.Types.Mixed, default: () => ({}) },
  notes: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export interface CategoryDoc {
  _id: unknown;
  slug: string;
  label: string;
  description: string;
  icon: string;
  sortOrder: number;
  subCategories: string[];
}

const categorySchema = new Schema<CategoryDoc>({
  slug: { type: String, required: true, unique: true, index: true },
  label: { type: String, required: true },
  description: { type: String, default: "" },
  icon: { type: String, default: "▣" },
  sortOrder: { type: Number, default: 0 },
  subCategories: { type: [String], default: [] },
});

export interface TagDoc {
  slug: string;
  name: string;
  count: number;
}

const tagSchema = new Schema<TagDoc>({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  count: { type: Number, default: 0 },
});

export interface SettingDoc {
  key: string;
  value: unknown;
  group: string;
}

const settingSchema = new Schema<SettingDoc>({
  key: { type: String, required: true, unique: true, index: true },
  value: { type: Schema.Types.Mixed, default: null },
  group: { type: String, default: "general" },
});

export interface NavChildDoc {
  label: string;
  href: string;
  icon?: string;
  description?: string;
}

export interface NavItemDoc {
  area: "sidebar" | "navbar" | "footer";
  group?: string;
  label: string;
  href: string;
  icon?: string;
  description?: string;
  sortOrder: number;
  enabled: boolean;
  children: NavChildDoc[];
}

const navChildSchema = new Schema<NavChildDoc>(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    icon: String,
    description: String,
  },
  { _id: false }
);

const navItemSchema = new Schema<NavItemDoc>({
  area: {
    type: String,
    enum: ["sidebar", "navbar", "footer"],
    required: true,
    index: true,
  },
  group: String,
  label: { type: String, required: true },
  href: { type: String, required: true },
  icon: String,
  description: String,
  sortOrder: { type: Number, default: 0 },
  enabled: { type: Boolean, default: true },
  children: { type: [navChildSchema], default: [] },
});

export interface SessionDoc {
  tokenHash: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new Schema<SessionDoc>({
  tokenHash: { type: String, required: true, unique: true, index: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

// TTL index so expired sessions are removed by MongoDB instead of accumulating.
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

function typedModel<T>(
  name: string,
  schema: Schema<T>
): mongoose.Model<T> {
  return (mongoose.models[name] ??
    mongoose.model<T>(name, schema)) as mongoose.Model<T>;
}

export const ComponentModel = typedModel<ComponentDoc>("Component", componentSchema);
export const ComponentVersionModel = typedModel<ComponentVersionDoc>(
  "ComponentVersion",
  componentVersionSchema
);
export const CategoryModel = typedModel<CategoryDoc>("Category", categorySchema);
export const TagModel = typedModel<TagDoc>("Tag", tagSchema);
export const SettingModel = typedModel<SettingDoc>("Setting", settingSchema);
export const NavItemModel = typedModel<NavItemDoc>("NavItem", navItemSchema);
export const SessionModel = typedModel<SessionDoc>("Session", sessionSchema);
