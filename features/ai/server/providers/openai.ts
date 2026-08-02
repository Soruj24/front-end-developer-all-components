import { createOpenAiCompatibleAdapter } from "./openaiCompatible";
import { PROVIDER_BASE_URLS, builtinModels } from "./catalog";

export function createOpenAiAdapter() {
  const models = builtinModels.filter((m) => m.provider === "openai");
  return createOpenAiCompatibleAdapter({
    id: "openai",
    label: "OpenAI",
    kind: "cloud",
    description: "OpenAI GPT models via the official API.",
    baseURL: PROVIDER_BASE_URLS.openai,
    apiKeyEnv: "OPENAI_API_KEY",
    requiresKey: true,
    modelIds: models.map((m) => m.id),
  });
}
