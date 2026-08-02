import { PromptTemplate, type PromptVariables } from "./template";
import { DEFAULT_SYSTEM_PROMPT } from "../../constants";

export const DEFAULT_TEMPLATES: Record<string, string> = {
  "system.default": DEFAULT_SYSTEM_PROMPT,
  "system.rag":
    "You are a knowledge-base assistant. Use the retrieved context to answer accurately. " +
    "If the context does not answer the question, say so.\n\n{{context}}",
  "user.rag":
    "Question:\n{{question}}\n\nAnswer using the context above only.",
};

export class PromptRegistry {
  private templates = new Map<string, PromptTemplate>();

  register(name: string, template: string): this {
    this.templates.set(name, new PromptTemplate(template));
    return this;
  }

  has(name: string): boolean {
    return this.templates.has(name);
  }

  render(name: string, variables: PromptVariables): string {
    const template = this.templates.get(name);
    if (!template) throw new Error(`Unknown prompt template: ${name}`);
    return template.render(variables);
  }
}

export function createDefaultPromptRegistry(): PromptRegistry {
  const registry = new PromptRegistry();
  for (const [name, template] of Object.entries(DEFAULT_TEMPLATES)) {
    registry.register(name, template);
  }
  return registry;
}
