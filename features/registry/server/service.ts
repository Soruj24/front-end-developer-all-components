import { revalidatePath, revalidateTag } from "next/cache";
import { Types } from "mongoose";
import type { RegistryCategory, RegistryComponent, ComponentStatus } from "../types";
import type { NavSection } from "@/types/navigation";
import type { ComponentFilter } from "../utils/search";
import type { CategoryDoc, ComponentDoc, NavItemDoc, PublishStatus, Visibility } from "./models";
import {
  ComponentModel,
  ComponentVersionModel,
  CategoryModel,
  TagModel,
  NavItemModel,
} from "./models";
import { connectDb } from "./connect";
import { db } from "./handle";
import {
  toRegistryCategory,
  toRegistryComponent,
  toComponentDocInput,
  toAdminRow,
  type AdminComponentRow,
  type LeanComponentDoc,
} from "./map";

export const REVALIDATE_TAG = "components";

const components = () => db(ComponentModel);
const versions = () => db(ComponentVersionModel);
const categoriesDb = () => db(CategoryModel);
const tagsDb = () => db(TagModel);
const navDb = () => db(NavItemModel);

const publicMatch = { publishStatus: "published", deletedAt: null };

/** Cap on user-supplied search terms (defense against runaway queries). */
export const MAX_QUERY_LENGTH = 64;

/** Escapes a user-supplied term so it cannot inject regex operators (ReDoS). */
function escapeRegex(term: string): string {
  return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Builds a safe substring match across the text fields of a component. */
function textSearch(terms: string): Record<string, unknown> {
  const safe = escapeRegex(terms.trim().slice(0, MAX_QUERY_LENGTH));
  return {
    $or: [
      { name: { $regex: safe, $options: "i" } },
      { slug: { $regex: safe, $options: "i" } },
      { description: { $regex: safe, $options: "i" } },
      { tags: { $regex: safe, $options: "i" } },
    ],
  };
}

export interface ComponentQuery {
  category?: string;
  tag?: string;
  query?: string;
  featured?: boolean;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export async function getComponentBySlug(
  slug: string,
  opts?: { includeUnpublished?: boolean }
): Promise<RegistryComponent | null> {
  const conn = await connectDb();
  if (!conn) return null;
  const match: Record<string, unknown> = { slug, deletedAt: null };
  if (!opts?.includeUnpublished) Object.assign(match, publicMatch);
  const doc = await components().findOne(match).lean<LeanComponentDoc>();
  return doc ? toRegistryComponent(doc) : null;
}

export async function getComponentDocBySlug(
  slug: string
): Promise<LeanComponentDoc | null> {
  const conn = await connectDb();
  if (!conn) return null;
  return components().findOne({ slug, deletedAt: null }).lean<LeanComponentDoc>();
}

export async function getAllComponentSlugs(): Promise<string[]> {
  const conn = await connectDb();
  if (!conn) return [];
  const docs = await components().find({ ...publicMatch }).lean<{ slug: string }>();
  return docs.map((d) => d.slug);
}

export async function getComponents(query: ComponentQuery = {}): Promise<RegistryComponent[]> {
  const conn = await connectDb();
  if (!conn) return [];
  const match: Record<string, unknown> = { ...publicMatch };
  if (query.category) match.category = query.category;
  if (query.tag) match.tags = query.tag;
  if (query.featured) match.featured = true;
  if (query.query && query.query.trim()) {
    Object.assign(match, textSearch(query.query));
  }
  const sort = sortBy(query.sort);
  const page = Math.max(1, query.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, query.pageSize ?? 100));
  let chain = components().find(match);
  if (Object.keys(sort).length) chain = chain.sort(sort);
  const docs = await chain
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean<LeanComponentDoc>();
  return docs.map(toRegistryComponent);
}

export async function countComponents(query: ComponentQuery = {}): Promise<number> {
  const conn = await connectDb();
  if (!conn) return 0;
  const match: Record<string, unknown> = { ...publicMatch };
  if (query.category) match.category = query.category;
  if (query.tag) match.tags = query.tag;
  return components().countDocuments(match);
}

function sortBy(sort?: string): Record<string, 1 | -1> {
  switch (sort) {
    case "downloads":
      return { "stats.downloads": -1 };
    case "views":
      return { "stats.views": -1 };
    case "likes":
      return { "stats.likes": -1 };
    case "name":
      return { name: 1 };
    case "oldest":
      return { createdAt: 1 };
    default:
      return { updatedAt: -1 };
  }
}

export async function getLatestComponents(limit = 8): Promise<RegistryComponent[]> {
  return getComponents({ sort: "latest", pageSize: limit });
}

export async function getTrendingComponents(limit = 6): Promise<RegistryComponent[]> {
  return getComponents({ sort: "views", pageSize: limit });
}

export async function getPopularComponents(limit = 8): Promise<RegistryComponent[]> {
  return getComponents({ sort: "downloads", pageSize: limit });
}

export async function getFeaturedComponents(limit = 6): Promise<RegistryComponent[]> {
  return getComponents({ featured: true, sort: "downloads", pageSize: limit });
}

export async function getRecentlyUpdatedComponents(limit = 6): Promise<RegistryComponent[]> {
  return getComponents({ sort: "latest", pageSize: limit });
}

export async function getCategories(): Promise<(RegistryCategory & { count: number })[]> {
  const conn = await connectDb();
  if (!conn) return [];
  const cats = await categoriesDb().find().sort({ sortOrder: 1 }).lean<CategoryDoc>();
  const counts = await components().aggregate<{ _id: string; count: number }>([
    { $match: publicMatch },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);
  const countMap = new Map(counts.map((c) => [c._id, c.count]));
  return cats.map((c) => ({ ...toRegistryCategory(c), count: countMap.get(c.slug) ?? 0 }));
}

export async function getCategoryBySlug(slug: string): Promise<RegistryCategory | null> {
  const conn = await connectDb();
  if (!conn) return null;
  const doc = await categoriesDb().findOne({ slug }).lean<CategoryDoc>();
  return doc ? toRegistryCategory(doc) : null;
}

export async function getTags(): Promise<{ name: string; slug: string; count: number }[]> {
  const conn = await connectDb();
  if (!conn) return [];
  return tagsDb().find().sort({ count: -1 }).lean<{ name: string; slug: string; count: number }>();
}

export async function getTotalDownloads(): Promise<number> {
  const conn = await connectDb();
  if (!conn) return 0;
  const agg = await components().aggregate<{ total: number }>([
    { $match: publicMatch },
    { $group: { _id: null, total: { $sum: "$stats.downloads" } } },
  ]);
  return agg[0]?.total ?? 0;
}

export async function getNavItems(area: "sidebar" | "navbar" | "footer") {
  const conn = await connectDb();
  if (!conn) return [];
  return navDb().find({ area, enabled: true }).sort({ sortOrder: 1 }).lean();
}

/** Sidebar navigation sections built from the NavItem collection. */
export async function getNavigationSections(): Promise<NavSection[]> {
  const conn = await connectDb();
  if (!conn) return [];
  const docs = await navDb()
    .find({ area: "sidebar", enabled: true })
    .sort({ sortOrder: 1 })
    .lean<NavItemDoc>();
  return docs.map((doc) => ({
    title: doc.group ?? doc.label,
    icon: doc.icon,
    description: doc.description,
    links: doc.children.map((child) => ({
      label: child.label,
      href: child.href,
      icon: child.icon,
      desc: child.description,
    })),
  }));
}

/** Primary navbar links built from the NavItem collection. */
export async function getNavbarLinks(): Promise<{ label: string; href: string }[]> {
  const conn = await connectDb();
  if (!conn) return [];
  const docs = await navDb()
    .find({ area: "navbar", enabled: true })
    .sort({ sortOrder: 1 })
    .lean<NavItemDoc>();
  return docs.map((doc) => ({ label: doc.label, href: doc.href }));
}

/* ------------------------------------------------------------------ */
/*  Admin (mutation) services                                          */
/* ------------------------------------------------------------------ */

export type { AdminComponentRow };

export async function getAdminComponentRows(
  query: Partial<ComponentFilter> = {}
): Promise<AdminComponentRow[]> {
  const conn = await connectDb();
  if (!conn) return [];
  const match: Record<string, unknown> = { deletedAt: null };
  if (query.category && query.category !== "all") match.category = query.category;
  if (query.query && query.query.trim()) {
    const safe = escapeRegex(query.query.trim().slice(0, MAX_QUERY_LENGTH));
    match.$or = [
      { name: { $regex: safe, $options: "i" } },
      { slug: { $regex: safe, $options: "i" } },
      { author: { $regex: safe, $options: "i" } },
    ];
  }
  const docs = await components()
    .find(match)
    .sort({ updatedAt: -1 })
    .lean<LeanComponentDoc>();
  return docs.map(toAdminRow);
}

export interface AdminComponentInput {
  slug: string;
  name: string;
  description?: string;
  category?: string;
  subCategory?: string;
  tags?: string[];
  status?: ComponentStatus;
  version?: string;
  author?: string;
  license?: string;
  publishStatus?: PublishStatus;
  visibility?: Visibility;
  featured?: boolean;
  popular?: boolean;
  thumbnail?: string;
  previewImages?: string[];
  gallery?: string[];
  dependencies?: string[];
  props?: ComponentDoc["props"];
  examples?: ComponentDoc["examples"];
  source?: string;
  code?: string;
  tailwindCode?: string;
  htmlCode?: string;
  reactCode?: string;
  typescriptCode?: string;
  installation?: string;
  usage?: string;
  stats?: ComponentDoc["stats"];
  scheduledAt?: Date | string | null;
}

export async function createComponent(
  input: AdminComponentInput
): Promise<AdminComponentRow> {
  const conn = await connectDb();
  if (!conn) return null as unknown as AdminComponentRow;
  const existing = await components().findOne({ slug: input.slug }).lean();
  if (existing) throw fieldError("SLUG_CONFLICT", "A component with this slug already exists.");
  const created = (await components().create({
    ...input,
    tags: input.tags ?? [],
    props: input.props ?? [],
    examples: input.examples ?? [],
    dependencies: input.dependencies ?? ["react"],
    stats: input.stats ?? {},
    publishStatus: input.publishStatus ?? "draft",
    scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : null,
  })) as unknown as LeanComponentDoc;
  await snapshotVersion(created, input.version ?? "1.0.0", ["Initial version."]);
  await refreshTags(input.tags ?? []);
  revalidateAll();
  return toAdminRow(created);
}

export async function updateComponent(
  id: string,
  patch: AdminComponentInput
): Promise<AdminComponentRow> {
  const conn = await connectDb();
  if (!conn) return null as unknown as AdminComponentRow;
  const update: Record<string, unknown> = { ...patch };
  if (patch.scheduledAt) update.scheduledAt = new Date(patch.scheduledAt);
  const doc = (await components().findByIdAndUpdate(
    id,
    { $set: update },
    { new: true }
  )) as unknown as LeanComponentDoc | null;
  if (!doc) throw fieldError("NOT_FOUND", "Component not found.");
  if (patch.tags) await refreshTags(patch.tags);
  revalidateAll();
  return toAdminRow(doc);
}

export async function deleteComponent(id: string): Promise<void> {
  const conn = await connectDb();
  if (!conn) return;
  const doc = (await components().findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  )) as unknown as LeanComponentDoc | null;
  if (!doc) throw fieldError("NOT_FOUND", "Component not found.");
  revalidateAll();
}

export async function duplicateComponent(
  slug: string,
  opts?: { suffix?: string }
): Promise<AdminComponentRow> {
  const conn = await connectDb();
  if (!conn) return null as unknown as AdminComponentRow;
  const source = await components().findOne({ slug, deletedAt: null }).lean<LeanComponentDoc>();
  if (!source) throw fieldError("NOT_FOUND", "Source component not found.");
  const newSlug = `${slug}-${opts?.suffix ?? "copy"}`;
  const created = (await components().create({
    ...source,
    slug: newSlug,
    name: `${source.name ?? source.slug} Copy`,
    publishStatus: "draft",
    featured: false,
    popular: false,
    stats: { downloads: 0, likes: 0, bookmarks: 0, comments: 0, views: 0 },
    publishedAt: null,
    scheduledAt: null,
    deletedAt: null,
  })) as unknown as LeanComponentDoc;
  revalidateAll();
  return toAdminRow(created);
}

export type SetStatusAction =
  | { status: "published" }
  | { status: "draft" }
  | { status: "archived" }
  | { status: "scheduled"; scheduledAt: string };

export async function setPublishStatus(id: string, action: SetStatusAction): Promise<void> {
  const conn = await connectDb();
  if (!conn) return;
  const update: Record<string, unknown> = { publishStatus: action.status };
  if (action.status === "published") {
    update.publishedAt = new Date();
    update.scheduledAt = null;
  } else if (action.status === "scheduled" && "scheduledAt" in action) {
    update.scheduledAt = new Date(action.scheduledAt);
  } else if (action.status === "draft" || action.status === "archived") {
    update.scheduledAt = null;
  }
  const doc = (await components().findByIdAndUpdate(
    id,
    { $set: update },
    { new: true }
  )) as unknown as LeanComponentDoc | null;
  if (!doc) throw fieldError("NOT_FOUND", "Component not found.");
  revalidateAll();
}

export async function snapshotVersion(
  componentDoc: LeanComponentDoc,
  version: string,
  notes: string[] = []
): Promise<void> {
  const componentId = new Types.ObjectId(String(componentDoc._id));
  await versions().create({
    componentId,
    version,
    snapshot: toRegistryComponent(componentDoc),
    notes,
  });
}

export async function getVersions(id: string): Promise<
  { id: string; version: string; kind: string; notes: string[]; createdAt: string }[]
> {
  const conn = await connectDb();
  if (!conn) return [];
  const docs = await versions()
    .find({ componentId: id })
    .sort({ createdAt: -1 })
    .lean<{ _id: unknown; version: string; kind: string; notes?: string[]; createdAt: Date }>();
  return docs.map((d) => ({
    id: String(d._id),
    version: d.version,
    kind: d.kind,
    notes: d.notes ?? [],
    createdAt: new Date(d.createdAt).toISOString(),
  }));
}

export async function rollbackToVersion(id: string, versionId: string): Promise<void> {
  const conn = await connectDb();
  if (!conn) return;
  const snap = await versions()
    .findById(versionId)
    .lean<{ componentId?: unknown; snapshot: RegistryComponent }>();
  if (!snap) throw fieldError("NOT_FOUND", "Version not found.");
  const componentId = String(snap.componentId ?? id);
  await components().findByIdAndUpdate(componentId, {
    $set: { ...toComponentDocInput(snap.snapshot), updatedAt: new Date() },
  });
  revalidateAll();
}

export async function refreshTags(tags: string[]): Promise<void> {
  const conn = await connectDb();
  if (!conn) return;
  const normalized = tags.map((t) => t.toLowerCase().trim()).filter(Boolean);
  for (const tag of normalized) {
    await tagsDb().findOneAndUpdate(
      { slug: tag },
      { $set: { name: tag, slug: tag }, $inc: { count: 1 } },
      { upsert: true }
    );
  }
}

/** Revalidates every surface that renders components so new content appears instantly. */
export function revalidateAll(): void {
  revalidatePath("/", "layout");
  revalidatePath("/components", "page");
  revalidateTag(REVALIDATE_TAG, "max");
}

function fieldError(code: string, message: string): Error & { code: string } {
  const err = new Error(message) as Error & { code: string };
  err.code = code;
  return err;
}
