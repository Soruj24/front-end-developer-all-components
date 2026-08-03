import { interrupt } from "@langchain/langgraph";
import type { BuildState, UserReview } from "../state/build";

/** Data handed to the client at the human review interrupt. */
export interface UserReviewPayload {
  threadId: string;
  preview?: BuildState["preview"];
  artifact?: BuildState["artifact"];
  audits: BuildState["reviews"];
  docs?: BuildState["docs"];
  registryMeta?: BuildState["registryMeta"];
}

/**
 * Human-in-the-loop review point. The graph pauses here and hands the preview
 * payload to the client; execution resumes only when a UserReview decision is
 * supplied via `Command({ resume })`.
 */
export function makeUserReviewNode() {
  return async function userReviewNode(state: BuildState): Promise<Partial<BuildState>> {
    const resume = interrupt<UserReviewPayload, UserReview>({
      threadId: state.threadId,
      preview: state.preview,
      artifact: state.artifact,
      audits: state.reviews,
      docs: state.docs,
      registryMeta: state.registryMeta,
    } satisfies UserReviewPayload);

    return { review: resume ?? { decision: "rejected", feedback: "No decision provided." } };
  };
}

/** Conditional-edge router: approved components publish; otherwise the run ends. */
export function routeFromUserReview(state: BuildState): "publish" | "end" {
  return state.review?.decision === "approved" ? "publish" : "end";
}
