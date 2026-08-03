import { createComponent } from "@/features/registry/server/service";
import type { BuildState } from "../state/build";
import { slugify } from "../utils/slug";

/**
 * Persists the approved component with publish status "published". Runs only
 * after the human review interrupt resolves to "approved".
 */
export function makePublishNode() {
  return async function publishNode(state: BuildState): Promise<Partial<BuildState>> {
    const { artifact, registryMeta } = state;
    if (!artifact || !registryMeta) {
      return { error: "Cannot publish: missing artifact or metadata." };
    }

    const slug = slugify(registryMeta.name || artifact.name);
    try {
      const created = await createComponent({
        slug,
        name: registryMeta.name || artifact.name,
        description: registryMeta.description || artifact.description,
        category: registryMeta.category || artifact.category,
        tags: registryMeta.tags.length > 0 ? registryMeta.tags : artifact.tags,
        version: "1.0.0",
        dependencies: artifact.dependencies,
        source: artifact.source,
        code: artifact.source,
        usage: state.docs?.usage,
        publishStatus: "published",
      });
      return {
        published: { componentId: created.id, slug, version: "1.0.0" },
        error: undefined,
      };
    } catch (error) {
      return { error: error instanceof Error ? error.message : String(error) };
    }
  };
}
