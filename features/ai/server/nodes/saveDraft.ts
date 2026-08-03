import { createComponent } from "@/features/registry/server/service";
import type { GenerateState } from "../state";
import { slugify } from "../utils/slug";

/**
 * Persists the generated component as a registry draft (no approval needed).
 * Publishing (status "published") is gated by human approval.
 */
export function makeSaveDraftNode() {
  return async function saveDraftNode(
    state: GenerateState
  ): Promise<Partial<GenerateState>> {
    const { artifact, registryMeta, versionPlan } = state;
    if (!artifact || !registryMeta || !versionPlan) {
      return { error: "Cannot save draft: missing artifact, metadata, or version." };
    }

    const slug = slugify(registryMeta.name || artifact.name);
    try {
      const created = await createComponent({
        slug,
        name: registryMeta.name || artifact.name,
        description: registryMeta.description || artifact.description,
        category: registryMeta.category || artifact.category,
        tags: registryMeta.tags.length > 0 ? registryMeta.tags : artifact.tags,
        version: versionPlan.version,
        dependencies: artifact.dependencies,
        source: artifact.source,
        code: artifact.source,
        publishStatus: "draft",
      });
      return {
        saved: { componentId: created.id, slug, version: versionPlan.version },
        error: undefined,
      };
    } catch (error) {
      return { error: error instanceof Error ? error.message : String(error) };
    }
  };
}
