import { Annotation } from "@langchain/langgraph";
import type {
  ComponentArtifact,
  ComponentRequest,
  DocumentationArtifact,
  RegistryMetadata,
  ReviewReport,
} from "./index";

/** Build plan produced by the Planner Agent. */
export interface BuildPlan {
  componentName: string;
  category: string;
  requirements: string[];
  designNotes?: string;
  targetDependencies?: string[];
}

/** Findings produced by the Research Agent from the component registry. */
export interface ResearchFindings {
  similarComponents: Array<{ slug: string; name: string }>;
  conventions: string[];
  recommendations?: string;
}

/** Live preview payload assembled before the human review interrupt. */
export interface LivePreview {
  previewId: string;
  slug: string;
  url: string;
}

export type UserReviewDecision = "approved" | "rejected" | "edited";

/** Decision supplied when the human review interrupt is resumed. */
export interface UserReview {
  decision: UserReviewDecision;
  feedback?: string;
}

/** Result of publishing the component after approval. */
export interface PublishResult {
  componentId: string;
  slug: string;
  version: string;
}

/** Working state for the build workflow (per thread). */
export interface BuildState {
  request: ComponentRequest;
  threadId: string;
  plan?: BuildPlan;
  research?: ResearchFindings;
  artifact?: ComponentArtifact;
  reviews: ReviewReport[];
  docs?: DocumentationArtifact;
  registryMeta?: RegistryMetadata;
  preview?: LivePreview;
  review?: UserReview;
  published?: PublishResult;
  error?: string;
  attempts: number;
}

/**
 * LangGraph channel definitions. `reviews` appends; optional fields are
 * last-write-wins. `review` holds the human decision on interrupt resume.
 */
export const BuildWorkflowStateAnnotation = Annotation.Root({
  request: Annotation<ComponentRequest>,
  threadId: Annotation<string>,
  plan: Annotation<BuildPlan | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  research: Annotation<ResearchFindings | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  artifact: Annotation<ComponentArtifact | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  reviews: Annotation<ReviewReport[]>({
    reducer: (current, update) => [...current, ...(update ?? [])],
  }),
  docs: Annotation<DocumentationArtifact | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  registryMeta: Annotation<RegistryMetadata | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  preview: Annotation<LivePreview | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  review: Annotation<UserReview | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  published: Annotation<PublishResult | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  error: Annotation<string | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  attempts: Annotation<number>({
    reducer: (current, update) => current + (update ?? 0),
  }),
});
