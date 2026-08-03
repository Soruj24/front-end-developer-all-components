export const AGENT_IDS = [
  "planner",
  "research",
  "componentGenerator",
  "componentReviewer",
  "uiUxReviewer",
  "accessibility",
  "responsive",
  "performance",
  "documentation",
  "registry",
  "versionManager",
  "search",
  "refactor",
  "testing",
  "seo",
] as const;

export type AgentId = (typeof AGENT_IDS)[number];

export type ModelTier = "high" | "mid" | "cheap";

/** Configuration-driven model routing per capability tier. */
export const TIER_MODELS: Record<ModelTier, string> = {
  high: "openrouter/anthropic/claude-3.5-sonnet",
  mid: "groq/llama-3.3-70b-versatile",
  cheap: "groq/llama-3.1-8b-instant",
};

/** Fallback chain per tier (first is primary; fallbacks used on provider errors). */
export const TIER_FALLBACKS: Record<ModelTier, string[]> = {
  high: ["openai/gpt-4o", "openrouter/openai/gpt-4o"],
  mid: ["mistral/mistral-large-latest", "openrouter/openai/gpt-4o"],
  cheap: ["openai/gpt-4o-mini", "groq/llama-3.3-70b-versatile"],
};

export interface AgentSpec {
  id: AgentId;
  name: string;
  role: string;
  tier: ModelTier;
  temperature: number;
  /** Tool names registered in the agent's ToolRegistry. */
  tools: string[];
}

export const AGENT_CATALOG: Record<AgentId, AgentSpec> = {
  planner: {
    id: "planner",
    name: "Planner Agent",
    role: "Decompose a user prompt into a concrete build plan.",
    tier: "cheap",
    temperature: 0.3,
    tools: [],
  },
  research: {
    id: "research",
    name: "Research Agent",
    role: "Search the registry for similar components and conventions.",
    tier: "cheap",
    temperature: 0.1,
    tools: ["search_components"],
  },
  componentGenerator: {
    id: "componentGenerator",
    name: "Component Generator",
    role: "Produce component source and registry metadata from a request.",
    tier: "high",
    temperature: 0.2,
    tools: ["search_components"],
  },
  componentReviewer: {
    id: "componentReviewer",
    name: "Component Reviewer",
    role:
      "Comprehensive component reviewer. Analyze code quality, TypeScript correctness, " +
      "Tailwind CSS usage, accessibility (WCAG 2.1), responsive design, performance, " +
      "SEO, reusability, and maintainability. Produce a detailed report with a quality " +
      "score (0-100), categorized warnings, suggestions, and auto-fix recommendations. " +
      "Respond with a single ```json block matching the ComprehensiveReview schema.",
    tier: "mid",
    temperature: 0,
    tools: ["search_components"],
  },
  uiUxReviewer: {
    id: "uiUxReviewer",
    name: "UI/UX Reviewer",
    role: "Assess visual quality and design-token consistency.",
    tier: "mid",
    temperature: 0.1,
    tools: [],
  },
  accessibility: {
    id: "accessibility",
    name: "Accessibility Agent",
    role: "Audit WCAG compliance and ARIA semantics.",
    tier: "mid",
    temperature: 0,
    tools: [],
  },
  performance: {
    id: "performance",
    name: "Performance Agent",
    role: "Analyze bundle and render cost.",
    tier: "mid",
    temperature: 0,
    tools: [],
  },
  responsive: {
    id: "responsive",
    name: "Responsive Agent",
    role: "Validate behavior across breakpoints.",
    tier: "mid",
    temperature: 0,
    tools: [],
  },
  documentation: {
    id: "documentation",
    name: "Documentation Agent",
    role:
      "Generate comprehensive component documentation including overview, " +
      "installation, usage, props table, examples, variants, accessibility notes, " +
      "API reference, changelog, and migration guide.",
    tier: "cheap",
    temperature: 0.2,
    tools: [],
  },
  registry: {
    id: "registry",
    name: "Registry Agent",
    role: "Normalize metadata, categorize, validate, and publish.",
    tier: "mid",
    temperature: 0,
    tools: ["search_components"],
  },
  versionManager: {
    id: "versionManager",
    name: "Version Manager Agent",
    role: "Compute semver bump and maintain the changelog.",
    tier: "cheap",
    temperature: 0,
    tools: [],
  },
  search: {
    id: "search",
    name: "Search Agent",
    role: "Index and retrieve components (keyword + vector).",
    tier: "cheap",
    temperature: 0,
    tools: [],
  },
  refactor: {
    id: "refactor",
    name: "Refactor Agent",
    role: "Fix review issues and apply diffs.",
    tier: "high",
    temperature: 0.2,
    tools: ["search_components"],
  },
  testing: {
    id: "testing",
    name: "Testing Agent",
    role: "Generate and run tests in a sandbox.",
    tier: "mid",
    temperature: 0,
    tools: [],
  },
  seo: {
    id: "seo",
    name: "SEO Agent",
    role: "Generate meta tags, JSON-LD, and sitemap entries.",
    tier: "cheap",
    temperature: 0,
    tools: [],
  },
};

export function getAgentSpec(id: AgentId): AgentSpec {
  return AGENT_CATALOG[id];
}

/** Model + fallback ids for an agent's capability tier. */
export function agentModelIds(id: AgentId): { modelId: string; fallbackIds: string[] } {
  const tier = AGENT_CATALOG[id].tier;
  return { modelId: TIER_MODELS[tier], fallbackIds: TIER_FALLBACKS[tier] };
}
