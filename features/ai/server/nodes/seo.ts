import type { GenerateState, SeoArtifact } from "../state";
import type { GenerateGraphDeps } from "../workflows/deps";
import { parseJsonObject } from "./output";
import { runAgent } from "./runAgent";

interface SeoOutput {
  title?: string;
  description?: string;
  keywords?: string[];
  jsonLd?: string;
  sitemapPath?: string;
}

/** Validates SEO agent output into a SeoArtifact. */
export function parseSeo(text: string): SeoArtifact | null {
  const parsed = parseJsonObject<SeoOutput>(text);
  if (parsed && typeof parsed.title === "string" && typeof parsed.description === "string") {
    return {
      title: parsed.title,
      description: parsed.description,
      keywords: parsed.keywords ?? [],
      jsonLd: parsed.jsonLd ?? "",
      sitemapPath: parsed.sitemapPath ?? "",
    };
  }
  return null;
}

/** Generates meta tags, JSON-LD, and sitemap entries (best-effort). */
export function makeSeoNode(deps: GenerateGraphDeps) {
  return async function seoNode(state: GenerateState): Promise<Partial<GenerateState>> {
    if (!state.artifact) return {};

    const text = await runAgent(deps, "seo", state.artifact.source, {
      context: `Request: ${state.request.prompt}`,
    });

    const seo = parseSeo(text);
    return seo ? { seo } : {};
  };
}
