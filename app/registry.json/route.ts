import { NextResponse } from "next/server";
import { getAllComponentSlugs } from "@/features/registry/server";

const CACHE_HEADERS = { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600" };

/** GET /registry.json — index manifest listing every registry item. */
export async function GET() {
  const slugs = await getAllComponentSlugs();
  const items = slugs.map((slug) => ({
    name: slug,
    type: "registry:ui",
    path: `/registry/${slug}.json`,
  }));

  return NextResponse.json(
    {
      $schema: "https://ui.shadcn.com/schema.json",
      name: "component-library",
      type: "registry:ui",
      items,
    },
    { headers: CACHE_HEADERS }
  );
}
