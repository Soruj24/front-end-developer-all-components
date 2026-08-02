import { createOpenAiCompatibleAdapter } from "./openaiCompatible";
import { PROVIDER_BASE_URLS, builtinModels } from "./catalog";

export function createGrokAdapter() {
  const models = builtinModels.filter((m) => m.provider === "grok");
  return createOpenAiCompatibleAdapter({
    id: "grok",
    label: "xAI Grok",
    kind: "cloud",
    description: "xAI Grok models via the OpenAI-compatible xAI API.",
    baseURL: PROVIDER_BASE_URLS.grok,
    apiKeyEnv: "XAI_API_KEY",
    requiresKey: true,
    modelIds: models.map((m) => m.id),
  });
}
