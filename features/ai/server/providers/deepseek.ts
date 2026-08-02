import { createOpenAiCompatibleAdapter } from "./openaiCompatible";
import { PROVIDER_BASE_URLS, builtinModels } from "./catalog";

export function createDeepSeekAdapter() {
  const models = builtinModels.filter((m) => m.provider === "deepseek");
  return createOpenAiCompatibleAdapter({
    id: "deepseek",
    label: "DeepSeek",
    kind: "cloud",
    description: "DeepSeek models via the OpenAI-compatible API.",
    baseURL: PROVIDER_BASE_URLS.deepseek,
    apiKeyEnv: "DEEPSEEK_API_KEY",
    requiresKey: true,
    modelIds: models.map((m) => m.id),
  });
}
