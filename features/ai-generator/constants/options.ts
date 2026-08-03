import { listModelsByProvider, modelCatalog } from "@/features/ai";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const PROVIDER_LABELS: Record<string, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  gemini: "Google Gemini",
  groq: "Groq",
  openrouter: "OpenRouter",
  ollama: "Ollama (local)",
  mistral: "Mistral",
  deepseek: "DeepSeek",
  cohere: "Cohere",
  grok: "xAI Grok",
};

/** Unique providers in catalog order, surfaced in the provider selector. */
export function providerOptions(): SelectOption[] {
  const seen = new Set<string>();
  return modelCatalog
    .filter((model) => {
      if (seen.has(model.provider)) return false;
      seen.add(model.provider);
      return true;
    })
    .map((model) => ({
      value: model.provider,
      label: PROVIDER_LABELS[model.provider] ?? model.provider,
    }));
}

/** Models for a given provider, surfaced in the model selector. */
export function modelOptions(provider: string): SelectOption[] {
  return listModelsByProvider(provider).map((model) => ({
    value: model.id,
    label: model.label,
  }));
}

/** Registry categories the generated component can target. */
export const GENERATOR_CATEGORIES: SelectOption[] = [
  { value: "buttons", label: "Buttons" },
  { value: "inputs", label: "Inputs" },
  { value: "data-display", label: "Data Display" },
  { value: "feedback", label: "Feedback" },
  { value: "overlays", label: "Overlays" },
  { value: "navigation", label: "Navigation" },
  { value: "surfaces", label: "Surfaces" },
];
