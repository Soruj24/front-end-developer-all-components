import { z } from "zod";

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required.").max(512),
});

export const componentStatusSchema = z.enum(["stable", "beta", "new", "deprecated"]);
export const publishStatusSchema = z.enum(["draft", "published", "archived", "scheduled"]);
export const visibilitySchema = z.enum(["public", "private"]);

const propSchema = z.object({
  name: z.string().max(120),
  type: z.string().max(120),
  default: z.string().max(500).optional(),
  required: z.boolean().optional(),
  description: z.string().max(2000).default(""),
  values: z.array(z.string().max(120)).max(100).optional(),
});

const exampleSchema = z.object({
  title: z.string().max(200),
  description: z.string().max(2000).optional(),
  code: z.string().max(200_000).default(""),
});

const statsSchema = z.object({
  downloads: z.number().int().nonnegative(),
  likes: z.number().int().nonnegative(),
  bookmarks: z.number().int().nonnegative(),
  comments: z.number().int().nonnegative(),
  views: z.number().int().nonnegative(),
});

/**
 * Validates every admin component mutation. `.strict()` rejects unknown fields,
 * closing the mass-assignment vector where arbitrary keys would otherwise flow
 * straight into a Mongoose `$set`.
 */
export const componentInputSchema = z
  .object({
    slug: z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format."),
    name: z.string().min(1).max(200),
    description: z.string().max(4000).optional(),
    category: z.string().max(120).optional(),
    subCategory: z.string().max(120).optional(),
    tags: z.array(z.string().max(80)).max(100).optional(),
    status: componentStatusSchema.optional(),
    version: z.string().max(40).optional(),
    author: z.string().max(200).optional(),
    license: z.string().max(80).optional(),
    publishStatus: publishStatusSchema.optional(),
    visibility: visibilitySchema.optional(),
    featured: z.boolean().optional(),
    popular: z.boolean().optional(),
    thumbnail: z.string().max(2000).optional(),
    previewImages: z.array(z.string().max(2000)).max(100).optional(),
    gallery: z.array(z.string().max(2000)).max(100).optional(),
    dependencies: z.array(z.string().max(120)).max(200).optional(),
    props: z.array(propSchema).max(200).optional(),
    examples: z.array(exampleSchema).max(100).optional(),
    source: z.string().max(1_000_000).optional(),
    code: z.string().max(1_000_000).optional(),
    tailwindCode: z.string().max(1_000_000).optional(),
    htmlCode: z.string().max(1_000_000).optional(),
    reactCode: z.string().max(1_000_000).optional(),
    typescriptCode: z.string().max(1_000_000).optional(),
    installation: z.string().max(1_000_000).optional(),
    usage: z.string().max(1_000_000).optional(),
    stats: statsSchema.optional(),
    scheduledAt: z.union([z.string().datetime(), z.null()]).optional(),
  })
  .strict();

export const setStatusActionSchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("published") }),
  z.object({ status: z.literal("draft") }),
  z.object({ status: z.literal("archived") }),
  z.object({ status: z.literal("scheduled"), scheduledAt: z.string().datetime() }),
]);

export type ComponentInput = z.infer<typeof componentInputSchema>;

export function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input.";
}
