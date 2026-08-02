import { createOpenAiCompatibleAdapter } from "./openaiCompatible";
import { PROVIDER_BASE_URLS, builtinModels } from "./catalog";

export function createGroqAdapter() {
  const models = builtinModels.filter((m) => m.provider === "groq");
  return createOpenAiCompatibleAdapter({
    id: "groq",
    label: "Groq",
    kind: "cloud",
    description: "Groq ultra-fast inference via the OpenAI-compatible API.",
    baseURL: PROVIDER_BASE_URLS.groq,
    apiKeyEnv: "GROQ_API_KEY",
    requiresKey: true,
    modelIds: models.map((m) => m.id),
  });
}
