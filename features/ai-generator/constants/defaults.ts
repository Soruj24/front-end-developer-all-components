import { listModelsByProvider, modelCatalog } from "@/features/ai";
import type { GeneratorSettings } from "../types";

export const HISTORY_STORAGE_KEY = "ai-generator:history";
export const MAX_HISTORY = 50;

export const DEFAULT_CATEGORY = "surfaces";

const OPTION_DEFAULTS = {
  darkMode: true,
  responsive: true,
  accessibility: true,
  includeDocs: false,
  includeComments: false,
} as const;

/** Fresh settings for a new session (provider + model kept in sync). */
export function defaultSettings(): GeneratorSettings {
  const provider = modelCatalog[0]?.provider ?? "openai";
  const models = listModelsByProvider(provider);
  return {
    prompt: "",
    templateId: "custom",
    provider,
    modelId: models[0]?.id ?? "",
    category: DEFAULT_CATEGORY,
    framework: "react",
    options: { ...OPTION_DEFAULTS },
  };
}
