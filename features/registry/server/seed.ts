import type { RegistryComponent } from "../types/component";
import { registryCatalog } from "../data";
import { registryCategories } from "../constants/categories";
import { navigationSections } from "@/constants/navigation";
import { siteConfig } from "@/config/site";
import { ComponentModel, CategoryModel, TagModel, SettingModel, NavItemModel } from "./models";
import { db } from "./handle";
import { toComponentDocInput } from "./map";

export const SEED_VERSION = "1.0.8";

const components = () => db(ComponentModel);
const categories = () => db(CategoryModel);
const tags = () => db(TagModel);
const settings = () => db(SettingModel);
const nav = () => db(NavItemModel);

/** Idempotently inserts seed content. Existing documents are never overwritten. */
export async function seedDatabase(): Promise<void> {
  const seeded = await settings().findOne({ key: "seed.version" }).lean<{ value: unknown }>();
  if (seeded && seeded.value === SEED_VERSION) return;

  const seenTags = new Set<string>();

  for (const component of registryCatalog as RegistryComponent[]) {
    const input = toComponentDocInput(component);
    await components().findOneAndUpdate(
      { slug: component.slug },
      {
        $setOnInsert: {
          ...input,
          publishStatus: "published",
          visibility: "public",
          publishedAt: component.createdAt,
        },
      },
      { upsert: true }
    );
    component.tags.forEach((t) => seenTags.add(t.toLowerCase()));
  }

  for (const [index, category] of registryCategories.entries()) {
    await categories().findOneAndUpdate(
      { slug: category.id },
      {
        $setOnInsert: {
          slug: category.id,
          label: category.label,
          description: category.description,
          icon: category.icon,
          sortOrder: index,
          subCategories: [],
        },
      },
      { upsert: true }
    );
  }

  for (const tag of seenTags) {
    await tags().findOneAndUpdate(
      { slug: tag },
      { $setOnInsert: { name: tag, slug: tag, count: 0 } },
      { upsert: true }
    );
  }

  for (const [index, section] of navigationSections.entries()) {
    await nav().findOneAndUpdate(
      { area: "sidebar", group: section.title },
      {
        $set: {
          area: "sidebar",
          group: section.title,
          label: section.title,
          href: section.links[0]?.href ?? "/",
          icon: section.icon,
          description: section.description,
          sortOrder: index,
          enabled: true,
          children: section.links.map((link) => ({
            label: link.label,
            href: link.href,
            icon: link.icon,
            description: link.desc,
          })),
        },
      },
      { upsert: true }
    );
  }

  for (const [index, link] of siteConfig.navLinks.entries()) {
    await nav().findOneAndUpdate(
      { area: "navbar", href: link.href },
      {
        $setOnInsert: {
          area: "navbar",
          label: link.label,
          href: link.href,
          sortOrder: index,
          enabled: true,
          children: [],
        },
      },
      { upsert: true }
    );
  }

  await settings().findOneAndUpdate(
    { key: "site.name" },
    { $setOnInsert: { key: "site.name", value: siteConfig.name, group: "general" } },
    { upsert: true }
  );
  await settings().findOneAndUpdate(
    { key: "site.tagline" },
    { $setOnInsert: { key: "site.tagline", value: siteConfig.tagline, group: "general" } },
    { upsert: true }
  );

  await settings().findOneAndUpdate(
    { key: "seed.version" },
    { $set: { key: "seed.version", value: SEED_VERSION, group: "system" } },
    { upsert: true }
  );
}
