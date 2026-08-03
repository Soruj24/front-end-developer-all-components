import { Annotation } from "@langchain/langgraph";
import type { AgentId } from "../agents/catalog";

/** Max generate/review attempts before the pipeline hands off to a human. */
export const MAX_GENERATION_ATTEMPTS = 3;

/** Normalized component request that enters the generation pipeline. */
export interface ComponentRequest {
  prompt: string;
  name?: string;
  category?: string;
  tags?: string[];
  constraints?: string;
}

/** Generated component artifact (registry-shaped output). */
export interface ComponentArtifact {
  name: string;
  description: string;
  category: string;
  tags: string[];
  source: string;
  dependencies: string[];
}

/** A single issue raised by an agent during the quality gate. */
export interface GateIssue {
  agent: string;
  severity: "error" | "warn";
  message: string;
}

export type GateVerdict = "pass" | "retry" | "handoff";

export interface GateResult {
  verdict: GateVerdict;
  issues: GateIssue[];
  attempts: number;
}

/** Structured output of a review agent (component reviewer, later fan-out). */
export interface ReviewReport {
  agent: AgentId;
  passed: boolean;
  summary: string;
  issues: GateIssue[];
}

/** Registry-shaped metadata produced by the Registry Agent. */
export interface RegistryMetadata {
  name: string;
  description: string;
  category: string;
  tags: string[];
}

/** Version recommendation produced by the Version Manager Agent. */
export interface VersionPlan {
  bump: "patch" | "minor" | "major";
  version: string;
  changelog: string;
}

/** Result of persisting the generated component as a registry draft. */
export interface DraftSaved {
  componentId: string;
  slug: string;
  version: string;
}

/** Test source produced by the Testing Agent (execution lands in Phase 4). */
export interface TestArtifact {
  source: string;
  summary?: string;
}

/** Docs produced by the Documentation Agent. */
export interface DocumentationArtifact {
  readme: string;
  props?: string;
  usage?: string;
}

/** Metadata produced by the SEO Agent. */
export interface SeoArtifact {
  title: string;
  description: string;
  keywords: string[];
  jsonLd: string;
  sitemapPath: string;
}

/** Keyword/vector entries produced by the Search Agent. */
export interface SearchIndexArtifact {
  keywords: string[];
  summary: string;
}

/** Working state for the component generation workflow (per thread). */
export interface GenerateState {
  request: ComponentRequest;
  threadId: string;
  artifact?: ComponentArtifact;
  gate?: GateResult;
  reviews: ReviewReport[];
  synthesis?: GateResult;
  registryMeta?: RegistryMetadata;
  versionPlan?: VersionPlan;
  saved?: DraftSaved;
  tests?: TestArtifact;
  docs?: DocumentationArtifact;
  seo?: SeoArtifact;
  searchIndex?: SearchIndexArtifact;
  reviewer?: AgentId;
  error?: string;
  attempts: number;
}

/**
 * LangGraph channel definitions. `attempts` is a cumulative counter; `reviews`
 * appends; other optional fields are last-write-wins.
 */
export const GenerateStateAnnotation = Annotation.Root({
  request: Annotation<ComponentRequest>,
  threadId: Annotation<string>,
  artifact: Annotation<ComponentArtifact | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  gate: Annotation<GateResult | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  reviews: Annotation<ReviewReport[]>({
    reducer: (current, update) => [...current, ...(update ?? [])],
  }),
  registryMeta: Annotation<RegistryMetadata | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  versionPlan: Annotation<VersionPlan | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  saved: Annotation<DraftSaved | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  tests: Annotation<TestArtifact | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  docs: Annotation<DocumentationArtifact | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  seo: Annotation<SeoArtifact | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  searchIndex: Annotation<SearchIndexArtifact | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  synthesis: Annotation<GateResult | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  reviewer: Annotation<AgentId | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  error: Annotation<string | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  attempts: Annotation<number>({
    reducer: (current, update) => current + (update ?? 0),
  }),
});

export * from "./build";
