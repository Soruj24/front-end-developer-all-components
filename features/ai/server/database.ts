import { connectDb } from "@/features/registry/server/connect";
import {
  ComponentModel,
  CategoryModel,
  TagModel,
  NavItemModel,
  SessionModel,
} from "@/features/registry/server/models";
import { db } from "@/features/registry/server/handle";

export const READ_ONLY_COLLECTIONS = [
  "components",
  "categories",
  "tags",
  "navitems",
  "sessions",
] as const;

export type ReadOnlyCollection = (typeof READ_ONLY_COLLECTIONS)[number];

const MODELS: Record<ReadOnlyCollection, unknown> = {
  components: ComponentModel,
  categories: CategoryModel,
  tags: TagModel,
  navitems: NavItemModel,
  sessions: SessionModel,
};

export interface ReadOnlyQuery {
  collection: ReadOnlyCollection;
  pipeline: Record<string, unknown>[];
  limit: number;
}

/** Runs a read-only aggregation pipeline against a single collection. */
export async function runReadOnlyQuery(
  collection: ReadOnlyCollection,
  pipeline: Record<string, unknown>[],
  limit = 10
): Promise<unknown[]> {
  await connectDb();
  const model = MODELS[collection];
  const capped = pipeline.slice(0, 20);
  const docs = await db(model).aggregate<unknown>([...capped, { $limit: limit }]);
  return docs;
}
