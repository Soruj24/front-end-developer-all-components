import { createOpenAiCompatibleAdapter } from "./openaiCompatible";
import { PROVIDER_BASE_URLS, builtinModels } from "./catalog";

export function createOpenRouterAdapter() {
  const models = builtinModels.filter((m) => m.provider === "openrouter");
  return createOpenAiCompatibleAdapter({
    id: "openrouter",
    label: "OpenRouter",
    kind: "cloud",
    description: "OpenRouter gateway to 100+ models via one API.",
    baseURL: PROVIDER_BASE_URLS.openrouter,
    apiKeyEnv: "OPENROUTER_API_KEY",
    requiresKey: true,
    modelIds: models.map((m) => m.id),
  });
}
