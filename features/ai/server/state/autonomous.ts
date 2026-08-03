import { Annotation } from "@langchain/langgraph";
import type { ComponentRequest, ComponentArtifact, DocumentationArtifact, PublishResult } from "./index";
import type { ReviewReport } from "./index";
import type { RegistryMetadata } from "./index";
import type { LivePreview, UserReview, BuildPlan, ResearchFindings } from "./build";

export interface AutonomousState {
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
  summary?: string;
  steps: string[];
  error?: string;
  attempts: number;
}

export const AutonomousWorkflowStateAnnotation = Annotation.Root({
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
  summary: Annotation<string | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  steps: Annotation<string[]>({
    reducer: (current, update) => [...current, ...(update ?? [])],
  }),
  error: Annotation<string | undefined>({
    reducer: (current, update) => update ?? current,
  }),
  attempts: Annotation<number>({
    reducer: (current, update) => current + (update ?? 0),
  }),
});