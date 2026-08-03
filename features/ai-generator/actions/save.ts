"use server";

import { createComponent, isAuthenticated } from "@/features/registry/server";
import type { GeneratedComponent } from "../types";
import { slugify } from "../utils/code";

export type SaveComponentResult =
  | { ok: true; id: string; href: string }
  | { ok: false; error: string };

/**
 * Saves a generated component to the registry as a draft, or publishes it
 * immediately. Requires an authenticated admin session.
 */
export async function saveGeneratedComponent(input: {
  component: GeneratedComponent;
  publish: boolean;
}): Promise<SaveComponentResult> {
  if (!(await isAuthenticated())) {
    return { ok: false, error: "Admin authentication required to save to the registry." };
  }

  const component = input.component;
  const slug = slugify(component.name);

  try {
    const row = await createComponent({
      slug,
      name: component.name,
      description: component.description,
      category: component.category,
      tags: component.tags,
      dependencies: component.dependencies,
      source: component.source,
      version: "1.0.0",
      status: "new",
      license: "MIT",
      publishStatus: input.publish ? "published" : "draft",
      visibility: "public",
    });
    return { ok: true, id: row.id, href: `/components/${slug}` };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Save failed." };
  }
}
