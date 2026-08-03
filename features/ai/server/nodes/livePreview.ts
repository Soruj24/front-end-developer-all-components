import { uid } from "@/features/ai";
import type { BuildState, LivePreview } from "../state/build";
import type { GenerateGraphDeps } from "../workflows/deps";
import { slugify } from "../utils/slug";

/**
 * Assembles the live-preview payload and emits a `preview_ready` event. The
 * artifact source rides in the interrupt payload so the client can render it
 * before the human reviews it.
 */
export function makeLivePreviewNode(deps: GenerateGraphDeps) {
  return async function livePreviewNode(state: BuildState): Promise<Partial<BuildState>> {
    const name = state.registryMeta?.name ?? state.artifact?.name ?? "component";
    const slug = slugify(name);
    const preview: LivePreview = {
      previewId: uid("preview"),
      slug,
      url: `/components/${slug}`,
    };
    deps.eventBus?.emit({ type: "preview_ready", threadId: state.threadId, slug });
    return { preview };
  };
}
