export type GenFramework = "react" | "nextjs";

export interface GeneratorOptions {
  darkMode: boolean;
  responsive: boolean;
  accessibility: boolean;
  includeDocs: boolean;
  includeComments: boolean;
}

export interface GeneratorSettings {
  prompt: string;
  templateId: string;
  provider: string;
  modelId: string;
  category: string;
  framework: GenFramework;
  options: GeneratorOptions;
}

/** The structured component the model is asked to return (JSON). */
export interface GeneratedComponent {
  name: string;
  description: string;
  category: string;
  tags: string[];
  dependencies: string[];
  source: string;
  docs?: string;
}

export type GenStatus = "idle" | "streaming" | "done" | "error";

/** A persisted, renderable generation stored in history. */
export interface GeneratorResult {
  id: string;
  prompt: string;
  modelId: string;
  createdAt: number;
  favorite: boolean;
  component: GeneratedComponent | null;
  raw: string;
}
