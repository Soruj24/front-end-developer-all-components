import { NextResponse } from "next/server";
import { getComponentBySlug } from "@/features/registry/server";

const CACHE_HEADERS = { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600" };

/** GET /registry/[file].json — shadcn-compatible item manifest for CLIs. */
export async function GET(_request: Request, context: { params: Promise<{ file: string }> }) {
  const { file } = await context.params;
  const slug = file.replace(/\.json$/, "");
  const component = await getComponentBySlug(slug);

  if (!component) {
    return NextResponse.json(
      { error: "Component not found", slug },
      { status: 404, headers: CACHE_HEADERS }
    );
  }

  const manifest = {
    $schema: "https://ui.shadcn.com/schema.json",
    name: component.slug,
    type: "registry:ui",
    title: component.name,
    description: component.description,
    dependencies: component.dependencies,
    registryDependencies: [],
    files: component.files.map((filePath, index) => ({
      path: filePath,
      type: "registry:ui",
      content: index === 0 ? component.source : undefined,
    })),
  };

  return NextResponse.json(manifest, { headers: CACHE_HEADERS });
}
